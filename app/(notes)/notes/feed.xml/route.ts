import { getAllNotes, noteModifiedAt } from "@/app/(notes)/_lib/notes";

export const dynamic = "force-static";

const SITE = "https://shnjd.com";
const FEED_URL = `${SITE}/notes/feed.xml`;

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const notes = await getAllNotes();
  const lastBuild = notes
    .map(({ frontmatter }) => noteModifiedAt(frontmatter))
    .reduce((max, date) => (date > max ? date : max), new Date(0));

  const items = notes
    .map(({ slug, frontmatter }) => {
      const url = `${SITE}/on/${slug}`;
      return `    <item>
      <title>${escape(frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(frontmatter.date).toUTCString()}</pubDate>
      <description>${escape(frontmatter.description ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>Shinjith's Notes</title>
    <link>${SITE}/notes</link>
    <description>Notes by Shinjith P R on software engineering, mostly tech related.</description>
    <language>en</language>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <sy:updatePeriod>monthly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
