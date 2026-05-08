import { posts } from '$lib/posts';

export const prerender = true;

const site_url = 'https://spikenard.dev';

export function GET() {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Spikenard</title>
    <description>Build logs, technical deep-dives, and lessons learned from the Spikenard team.</description>
    <link>${site_url}/blog</link>
    <atom:link href="${site_url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
${posts.map((post) => `    <item>
      <title>${post.title}</title>
      <link>${site_url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site_url}/blog/${post.slug}</guid>
      <description>${post.excerpt}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
}
