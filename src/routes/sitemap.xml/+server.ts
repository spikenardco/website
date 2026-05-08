import { posts } from '$lib/posts';
import { jobs } from '$lib/jobs';

export const prerender = true;

const site_url = 'https://spikenard.dev';

const static_pages = ['', '/projects', '/blog', '/open-source', '/careers'];

export function GET() {
	const pages = [
		...static_pages.map((path) => ({
			loc: `${site_url}${path}`,
			lastmod: new Date().toISOString().split('T')[0]
		})),
		...posts.map((post) => ({
			loc: `${site_url}/blog/${post.slug}`,
			lastmod: post.date
		})),
		...jobs.map((job) => ({
			loc: `${site_url}/careers/${job.slug}`,
			lastmod: new Date().toISOString().split('T')[0]
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
