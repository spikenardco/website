<script lang="ts">
	import { resolve } from '$app/paths';
	import { color_classes, projects, group_by_category } from '$lib/projects';

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
	<div class="max-w-[75rem] mx-auto">
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
		<div class="max-w-[75rem] mx-auto">
			<h2 class="text-sm font-medium text-neutral-400 uppercase tracking-wide mb-6">
				{category}
			</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each items as project (project.title)}
					{@const colors = color_classes[project.color]}
					{#if project.link}
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-parchment border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group block"
						>
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-center gap-2">
									<div class="w-8 h-8 rounded-md {colors.bg} flex items-center justify-center">
										<span class="{project.icon} size-4 {colors.text}"></span>
									</div>
									<span class="text-xs font-medium text-neutral-400 uppercase tracking-wide"
										>{project.type}</span
									>
									{#if project.opensource}
										<span class="text-xs px-1.5 py-0.5 rounded bg-sage/15 text-sage font-medium">OSS</span>
									{/if}
								</div>
								<span
									class="icon-[lucide--arrow-up-right] size-4 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-150"
								></span>
							</div>
							<h3
								class="text-neutral-700 font-semibold text-lg group-hover:text-umber transition-colors duration-150"
							>
								{project.title}
							</h3>
							<p class="text-neutral-500 mt-2 text-sm leading-relaxed">{project.description}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each project.tags as tag (tag)}
									<span class="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-500"
										>{tag}</span
									>
								{/each}
							</div>
						</a>
					{:else}
						<div
							class="bg-parchment border border-neutral-200 rounded-lg p-6 shadow-sm block"
						>
							<div class="flex items-center justify-between mb-4">
								<div class="flex items-center gap-2">
									<div class="w-8 h-8 rounded-md {colors.bg} flex items-center justify-center">
										<span class="{project.icon} size-4 {colors.text}"></span>
									</div>
									<span class="text-xs font-medium text-neutral-400 uppercase tracking-wide"
										>{project.type}</span
									>
									{#if project.opensource}
										<span class="text-xs px-1.5 py-0.5 rounded bg-sage/15 text-sage font-medium">OSS</span>
									{/if}
								</div>
							</div>
							<h3 class="text-neutral-700 font-semibold text-lg">{project.title}</h3>
							<p class="text-neutral-500 mt-2 text-sm leading-relaxed">{project.description}</p>
							<div class="mt-4 flex flex-wrap gap-2">
								{#each project.tags as tag (tag)}
									<span class="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-500"
										>{tag}</span
									>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>
{/each}
