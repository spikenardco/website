import { text } from '@sveltejs/kit';
import { posts } from '$lib/posts';
import { jobs } from '$lib/jobs';
import { guides } from '$lib/guides';

export const prerender = true;

const site_url = 'https://spikenard.dev';
const today = new Date().toISOString().split('T')[0];
const static_pages = ['', '/projects', '/blog', '/open-source', '/careers', '/guides'];

const pages = [
	...static_pages.map((path) => ({ loc: `${site_url}${path}`, lastmod: today })),
	...posts.map((post) => ({ loc: `${site_url}/blog/${post.slug}`, lastmod: post.date })),
	...jobs.map((job) => ({ loc: `${site_url}/careers/${job.slug}`, lastmod: today })),
	...guides.map((guide) => ({ loc: `${site_url}/guides/${guide.slug}`, lastmod: today }))
];

export function GET() {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

	return text(xml, { headers: { 'Content-Type': 'application/xml' } });
}
