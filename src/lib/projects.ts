export const color_classes: Record<Project['color'], { bg: string; text: string }> = {
	clay: { bg: 'bg-clay/10', text: 'text-clay' },
	sage: { bg: 'bg-sage/15', text: 'text-sage' },
	rust: { bg: 'bg-rust/10', text: 'text-rust' },
	'stone-blue': { bg: 'bg-stone-blue/15', text: 'text-stone-blue' },
	neutral: { bg: 'bg-neutral-500/10', text: 'text-neutral-400' },
	ember: { bg: 'bg-ember/10', text: 'text-ember' }
};

export interface Project {
	title: string;
	description: string;
	tags: string[];
	category:
		| 'Tools & Libraries'
		| 'Products'
		| 'Rewrites & Reimplementations'
		| 'Older Work';
	type: 'Library' | 'SDK' | 'Tool' | 'Rewrite' | 'Platform' | 'App';
	link?: string;
	icon: string;
	color: 'clay' | 'sage' | 'rust' | 'stone-blue' | 'neutral' | 'ember';
	show?: boolean;
	featured?: boolean;
	opensource?: boolean;
}

export const projects: Project[] = [
	{
		title: 'Buzzline',
		description:
			'An SMS gateway and messaging API built for Sierra Leone. Carrier routing, delivery tracking, prepaid billing, and developer-friendly REST API. Built with Go and PostgreSQL.',
		tags: ['Go', 'SMS', 'API'],
		category: 'Products',
		type: 'Platform',
		icon: 'icon-[lucide--message-square]',
		color: 'ember',
		featured: false,
		opensource: false
	},
	{
		title: 'Scrybe',
		description:
			'A multi-tenant school management platform for Sierra Leone. Grades, attendance, payments, announcements, and parent communication all in one place. Built with SvelteKit, Drizzle ORM, and PostgreSQL.',
		tags: ['SvelteKit', 'Drizzle', 'PostgreSQL', 'SaaS'],
		category: 'Products',
		type: 'Platform',
		icon: 'icon-[lucide--book-open]',
		color: 'sage',
		featured: true,
		opensource: false
	},
	{
		title: 'InnKeeper',
		description:
			'A lodging and booking platform for Sierra Leone\'s tourism market. Guests discover and book rooms, hotel operators manage properties, staff, and analytics. Built with SvelteKit and Drizzle.',
		tags: ['SvelteKit', 'Hospitality', 'SaaS'],
		category: 'Products',
		type: 'Platform',
		icon: 'icon-[lucide--building]',
		color: 'stone-blue',
		featured: false,
		opensource: false
	},
	{
		title: 'Orbis',
		description:
			"A unified patient records system for Sierra Leone's healthcare sector. Multi-facility record sharing, appointment scheduling, SOAP notes, and audit trails. Available as a web app, desktop client, and mobile app. Built with Go, SvelteKit, and PostgreSQL.",
		tags: ['Go', 'Chi', 'PostgreSQL', 'SvelteKit', 'Healthcare'],
		category: 'Products',
		type: 'Platform',
		icon: 'icon-[lucide--heart-pulse]',
		color: 'rust',
		featured: false,
		opensource: false
	},
	{
		title: 'flags.zig',
		description:
			"A type-safe command-line argument parser for Zig. Inspired by Rust's clap and TigerBeetle's flags — zero runtime overhead, comptime parsing, subcommands via union(enum), and zero dependencies.",
		tags: ['Zig', 'CLI', 'Parser'],
		category: 'Tools & Libraries',
		type: 'Library',
		link: 'https://github.com/spikenardco/flags.zig',
		icon: 'icon-[lucide--flag]',
		color: 'clay',
		featured: true,
		opensource: true
	},
	{
		title: 'monimejs',
		description:
			'Lightweight TypeScript SDK for the Monime payments API. Full type safety, retry logic with exponential backoff, idempotency keys, and 12 resource modules. Published on npm.',
		tags: ['TypeScript', 'npm', 'Payments'],
		category: 'Tools & Libraries',
		type: 'SDK',
		link: 'https://github.com/spikenardco/monimejs',
		icon: 'icon-[lucide--box]',
		color: 'sage',
		featured: true,
		opensource: true
	},
	{
		title: 'tip',
		description:
			'A self-hosted password manager and task manager built with Zig. Offline-first, with architecture docs and a clear development roadmap.',
		tags: ['Zig', 'Security', 'Self-hosted'],
		category: 'Tools & Libraries',
		type: 'Tool',
		link: 'https://github.com/spikenardco/tip',
		icon: 'icon-[lucide--lock]',
    color: 'rust',
    featured: true,
		opensource: true
	},
	{
		title: 'microblog',
		description:
			'The Flask Mega-Tutorial by Miguel Grinberg, reimplemented with a modern stack — SvelteKit frontend, Go API with chi router, and SQLite with sqlx.',
		tags: ['Go', 'SvelteKit', 'SQLite'],
		category: 'Rewrites & Reimplementations',
		type: 'Rewrite',
		link: 'https://github.com/spikenardco/microblog',
		icon: 'icon-[lucide--book-open]',
		color: 'stone-blue',
		featured: false,
		opensource: true
	},
	{
		title: 'campus-gist',
		description:
			'A social platform for students to share ideas, find solutions, attend events, and connect across institutions. Built with SvelteKit and MongoDB.',
		tags: ['Svelte', 'Node.js', 'MongoDB'],
		category: 'Older Work',
		type: 'Platform',
		link: 'https://github.com/spikenardco/campus-gist',
		icon: 'icon-[lucide--message-circle]',
		color: 'neutral',
		featured: false,
		opensource: true
	},
];

export function group_by_category(items: Project[]): [string, Project[]][] {
	return Object.entries(Object.groupBy(items, (p) => p.category)) as [string, Project[]][];
}
