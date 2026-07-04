export interface JobMeta {
	slug: string;
	title: string;
	tags: string[];
	excerpt: string;
	draft?: boolean;
}

function get_jobs_meta(): JobMeta[] {
	const modules = import.meta.glob<{ metadata: Omit<JobMeta, 'slug'> }>(
		'/src/jobs/*.md',
		{ eager: true }
	);

	return Object.entries(modules)
		.map(([path, module]) => {
			const slug = path.split('/').pop()!.replace('.md', '');
			return { slug, ...module.metadata };
		})
		.filter((job) => !job.draft);
}

export const jobs = get_jobs_meta();
