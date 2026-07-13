export interface JobMeta {
	slug: string;
	title: string;
	tags: string[];
	excerpt: string;
	draft?: boolean;
}

const modules = import.meta.glob<{ metadata: Omit<JobMeta, 'slug'> }>(
	'/src/jobs/*.md',
	{ eager: true }
);

export const jobs: JobMeta[] = Object.entries(modules)
	.map(([path, module]) => ({
		slug: path.split('/').pop()!.replace('.md', ''),
		...module.metadata
	}))
	.filter((job) => !job.draft);
