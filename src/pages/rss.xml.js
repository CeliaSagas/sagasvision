import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt({ html: true, linkify: true });

export async function GET(context) {
  const posts = await getCollection("posts");
  const site = context.site ?? "https://sagasvision.com";
  const origin = site.toString().replace(/\/$/, "");
  return rss({
    title: "sagasvision",
    description:
      "Notes by Celia Sagastume on adaptive optics, AR, and the science of seeing.",
    site,
    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.pubDate).getTime() -
          new Date(a.data.pubDate).getTime()
      )
      .map((post) => {
        const html = parser
          .render(post.body ?? "")
          .replace(/href="\//g, `href="${origin}/`)
          .replace(/src="\//g, `src="${origin}/`);
        return {
          title: post.data.title,
          pubDate: post.data.pubDate,
          description: post.data.description,
          link: `/posts/${post.id}/`,
          content: sanitizeHtml(html, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            allowedAttributes: {
              ...sanitizeHtml.defaults.allowedAttributes,
              img: ["src", "alt", "title", "width", "height"],
            },
          }),
        };
      }),
    customData: `<language>en-us</language>`,
  });
}
