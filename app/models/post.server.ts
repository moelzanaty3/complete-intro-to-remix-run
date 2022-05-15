type Post = {
  slug: string;
  title: string;
};

// the getPosts function async because even though
// it's not currently doing anything async it will soon! 😀
export async function getPosts(): Promise<Array<Post>> {
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mixtape",
      title: "A Mixtape I Made Just For You",
    },
  ];
}
