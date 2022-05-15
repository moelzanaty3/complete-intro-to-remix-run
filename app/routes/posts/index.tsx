import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

// Loaders are the backend "API" for their component
// it's already wired up for you through useLoaderData.
export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1>Posts</h1>
      {/* The to prop is just "admin" and it linked to /posts/admin */}
      {/*   With Remix, you get relative links. */}
      <Link
        to="admin"
        className="m-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-pink-600 py-2 px-4 text-gray-100 hover:from-orange-500 hover:to-pink-500"
      >
        Admin
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-slate-300 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
