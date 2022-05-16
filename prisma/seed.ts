import { PrismaClient } from "@prisma/client";
import type { Post } from "~/models/post.server";

const db = new PrismaClient();

function getPosts(): Post[] {
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
      body: "This is my first post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
      body: "This is a mixtape I made just for you",
    },
  ];
}

async function seed() {
  const posts = getPosts();
  for (const post of posts) {
    await db.post.create({ data: post });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
