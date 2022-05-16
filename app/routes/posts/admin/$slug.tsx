import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost, deletePost } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "slug is required");

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(`The _method ${form.get("_method")} is not supported`, {
      status: 400,
    });
  }

  const slug = params.slug;

  invariant(typeof slug === "string", "slug must be a string");

  await deletePost(slug);
  return redirect("/posts/admin");
};

export default function AdminPostSlug() {
  const { post } = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl text-left">
      <h1 className="my-6 text-3xl">Some Post: {post.title}</h1>
      <p className="mb-2">{post.body}</p>

      <Form method="post">
        <input type="hidden" name="_method" value="delete" />
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-blue-500 to-pink-600 py-2 px-4 text-gray-100 hover:from-orange-500 hover:to-pink-500"
        >
          Delete Post
        </button>
      </Form>
    </main>
  );
}
