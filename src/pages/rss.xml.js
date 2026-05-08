import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "sagasvision",
    description:
      "Notes by Celia Sagastume on adaptive optics, AR, and the science of seeing.",
    site: context.site ?? "https://sagasvision.com",
    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.pubDate).getTime() -
          new Date(a.data.pubDate).getTime()
      )
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/posts/${post.id}/`,
      })),
    customData: `<language>en-us</language>`,
  });
}
