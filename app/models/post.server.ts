const POSTS: Post[] = [
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

export type Post = {
  slug: string;
  title: string;
  body: string;
};

// the getPosts function async because even though
// it's not currently doing anything async it will soon! 😀
export async function getPosts(): Promise<Array<Post>> {
  return POSTS;
}

export async function getPost(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export async function createPost(post: Pick<Post, "title" | "slug" | "body">) {
  console.log("Creating post", post);
}

export async function deletePost(slug: string) {
  console.log("Deleting post", slug);
}
