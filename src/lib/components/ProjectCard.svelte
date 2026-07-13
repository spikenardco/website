<script lang="ts">
	import type { Project } from '$lib/projects';
	import { color_classes } from '$lib/projects';

	let { project, linked = false, show_oss = false }: { project: Project; linked?: boolean; show_oss?: boolean } = $props();

	const colors = $derived(color_classes[project.color]);
</script>

{#snippet card_content()}
	<div class="flex items-center justify-between mb-4">
		<div class="flex items-center gap-2">
			<div class="w-8 h-8 rounded-md {colors.bg} flex items-center justify-center">
				<span class="{project.icon} size-4 {colors.text}"></span>
			</div>
			<span class="text-xs font-medium text-neutral-400 uppercase tracking-wide">{project.type}</span>
			{#if show_oss && project.opensource}
				<span class="text-xs px-1.5 py-0.5 rounded bg-sage/15 text-sage font-medium">OSS</span>
			{/if}
		</div>
		{#if linked}
			<span class="icon-[lucide--arrow-up-right] size-4 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-150"></span>
		{/if}
	</div>
	<h3 class="text-neutral-700 font-semibold text-lg {linked ? 'group-hover:text-umber transition-colors duration-150' : ''}">
		{project.title}
	</h3>
	<p class="text-neutral-500 mt-2 text-sm leading-relaxed">{project.description}</p>
	<div class="mt-4 flex flex-wrap gap-2">
		{#each project.tags as tag (tag)}
			<span class="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-500">{tag}</span>
		{/each}
	</div>
{/snippet}

{#if linked}
	<a
		href={project.link}
		target="_blank"
		rel="noopener noreferrer"
		class="bg-parchment border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group block"
	>
		{@render card_content()}
	</a>
{:else}
	<div class="bg-parchment border border-neutral-200 rounded-lg p-6 shadow-sm block">
		{@render card_content()}
	</div>
{/if}
