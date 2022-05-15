import { Outlet } from "@remix-run/react";

export default function PostAdmin() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
}
