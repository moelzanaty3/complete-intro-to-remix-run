import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "Post Id is required");

  const post = await getPost(params.id);
  invariant(post, `Post not found: ${params.id}`);

  return json<LoaderData>({ post });
};

export default function PostIndex() {
  const { post } = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Post: {post.title}
      </h1>
      <p className="text-center">{post.body}</p>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center">
      <h1>
        Oh no! Error from <em>/posts/$postId</em>
      </h1>
      <p className="bold bg-red-600 text-slate-100">{error.message}</p>
      <img
        src="https://media.giphy.com/media/3o7btLQQQXyQQQQQQ/giphy.gif"
        alt="error"
      />
    </div>
  );
}
