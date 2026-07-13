import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const guide = await import(`../../../guides/${params.slug}.md`);
		return {
			content: guide.default,
			meta: guide.metadata
		};
	} catch {
		error(404, 'Guide not found');
	}
};
