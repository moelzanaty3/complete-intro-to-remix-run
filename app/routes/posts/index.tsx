import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type Post = {
  slug: string;
  title: string;
};

type LoaderData = {
  posts: Post[];
};

// Loaders are the backend "API" for their component
// it's already wired up for you through useLoaderData.
export const loader = async () => {
  return json<LoaderData>({
    posts: [
      {
        slug: "my-first-post",
        title: "My First Post",
      },
      {
        slug: "90s-mixtape",
        title: "A Mixtape I Made Just For You",
      },
    ],
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;
  console.log(posts);
  return (
    <main>
      <h1>Posts</h1>
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
