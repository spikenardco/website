export interface Guide {
	slug: string;
	title: string;
	description: string;
}

const modules = import.meta.glob<{ metadata: { title: string; description: string } }>(
	'/src/guides/*.md',
	{ eager: true }
);

export const guides: Guide[] = Object.entries(modules)
	.map(([path, mod]) => ({
		slug: path.split('/').pop()!.replace('.md', ''),
		title: mod.metadata.title,
		description: mod.metadata.description
	}))
	.sort((a, b) => a.title.localeCompare(b.title));
