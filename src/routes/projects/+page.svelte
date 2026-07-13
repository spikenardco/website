<script lang="ts">
	import { resolve } from '$app/paths';
	import { projects, group_by_category } from '$lib/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	const grouped = group_by_category(projects.filter((p) => p.show !== false));
</script>

<svelte:head>
	<title>Projects — Spikenard</title>
	<meta
		name="description"
		content="Open-source tools, platforms, and products — everything we're building at Spikenard. Some open, some paid. All crafted with care."
	/>
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Projects</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				What we're building
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				Open-source tools, platforms, and products — everything we're building at Spikenard. Some open, some paid. All crafted with care.
			</p>
		</div>
	</div>
</section>

{#each grouped as [category, items], i (category)}
	<section class={['px-6 py-12 sm:py-16', i === grouped.length - 1 && 'pb-24']}>
		<div class="max-w-300 mx-auto">
			<h2 class="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-6">
				{category}
			</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each items as project (project.title)}
					<ProjectCard {project} linked={!!project.link} show_oss />
				{/each}
			</div>
		</div>
	</section>
{/each}
