import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost, deletePost } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "id is required");

  const post = await getPost(params.id);
  invariant(post, `Post not found: ${params.id}`);

  return json<LoaderData>({ post });
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(`The _method ${form.get("_method")} is not supported`, {
      status: 400,
    });
  }

  const postId = params.id;

  invariant(typeof postId === "string", "Id must be a string");

  await deletePost(postId);
  return redirect("/posts/admin");
};

export default function AdminPostIndex() {
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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center">
      <h1>
        Oh no! Error from <em>/posts/admin/$postId</em>
      </h1>
      <p className="bold bg-red-600 text-slate-100">{error.message}</p>
      <img
        src="https://media.giphy.com/media/3o7btLQQQXyQQQQQQ/giphy.gif"
        alt="error"
      />
    </div>
  );
}
