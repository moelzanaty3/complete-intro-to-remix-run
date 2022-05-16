import type { ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createPost } from "~/models/post.server";

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      body: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  // TODO: remove me
  await new Promise((res) => setTimeout(res, 4000));

  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const body = formData.get("body");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    body: body ? null : "Body is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof body === "string", "body must be a string");

  await createPost({ title, slug, body });
  return redirect(`/posts`);
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 mt-1 text-lg text-gray-700`;

export default function NewPost() {
  const errors = useActionData();

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return (
    <Form method="post" className="flex flex-col justify-start text-left">
      <label className="mb-3">
        Post Title:{" "}
        {errors?.title ? (
          <em className="text-red-600">{errors.title}</em>
        ) : null}
        <input
          type="text"
          name="title"
          className={inputClassName}
          placeholder="Blog Post Title..."
        />
      </label>
      <label className="mb-3">
        Post Slug:{" "}
        {errors?.slug ? <em className="text-red-600">{errors.slug}</em> : null}
        <input
          type="text"
          name="slug"
          placeholder="Blog Post Slug..."
          className={inputClassName}
        />
      </label>
      <label className="mb-3">
        Post Body:{" "}
        {errors?.body ? <em className="text-red-600">{errors.body}</em> : null}
        <textarea
          name="body"
          placeholder="Blog Post Body..."
          className={inputClassName}
        />
      </label>

      <button
        type="submit"
        className="inline-block w-1/5 rounded-full bg-gradient-to-r from-blue-500 to-pink-600 py-2 px-4 text-gray-100 hover:from-orange-500 hover:to-pink-500"
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create Post"}
      </button>
    </Form>
  );
}
