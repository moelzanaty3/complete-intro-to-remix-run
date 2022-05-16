import { db } from "~/db.server";

export type Post = {
  id?: string;
  title: string;
  slug: string;
  body: string;
  updatedAt?: Date;
  createdAt?: Date;
};

export async function getPosts(): Promise<
  Pick<Post, "id" | "slug" | "title">[]
> {
  return await db.post.findMany({
    take: 20,
    select: { id: true, title: true, slug: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getPost(id: string): Promise<Post | null> {
  return await db.post.findUnique({ where: { id } });
}

export async function createPost(post: Pick<Post, "title" | "slug" | "body">) {
  console.log("Creating post", post);
  return await db.post.create({ data: post });
}

export async function deletePost(id: string): Promise<Pick<Post, "id">> {
  console.log("Deleting post", id);
  return await db.post.delete({ where: { id } });
}
