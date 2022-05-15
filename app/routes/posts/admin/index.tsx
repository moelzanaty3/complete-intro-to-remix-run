import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <div>
      <Link
        to="new"
        className="m-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-pink-600 py-2 px-4 text-gray-100 hover:from-orange-500 hover:to-pink-500"
      >
        Create a New Post
      </Link>
    </div>
  );
}
