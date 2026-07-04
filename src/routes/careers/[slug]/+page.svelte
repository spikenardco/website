<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.meta.title} — Spikenard</title>
	<meta name="description" content={data.meta.excerpt} />
</svelte:head>

<article class="px-6 pt-24 pb-24 sm:pt-32">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<a
				href={resolve('/careers')}
				class="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-umber transition-colors duration-150 mb-8"
			>
				<span class="icon-[lucide--chevron-left] size-4"></span>
				All positions
			</a>

			<div class="flex flex-wrap gap-2 mb-4">
				{#each data.meta.tags as tag (tag)}
					<span class="text-xs font-medium bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md"
						>{tag}</span
					>
				{/each}
			</div>

			<h1 class="text-3xl sm:text-4xl font-bold text-umber leading-tight tracking-tight">
				{data.meta.title}
			</h1>

			<div
				class="mt-10 prose prose-neutral max-w-none
				prose-headings:text-umber prose-headings:font-semibold prose-headings:tracking-tight
				prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-3
				prose-p:text-neutral-600 prose-p:leading-relaxed
				prose-a:text-clay prose-a:underline prose-a:decoration-clay/30 hover:prose-a:decoration-clay
				prose-li:text-neutral-600
				prose-ul:space-y-2 prose-li:my-0"
			>
				{#if data.content}
					{@const Content = data.content}
					<Content />
				{/if}
			</div>

			<div class="mt-12">
				<a
					href="mailto:hello@spikenard.dev?subject={encodeURIComponent(data.meta.title)}"
					class="inline-flex items-center gap-2 bg-clay text-parchment px-5 py-2.5 rounded-md font-medium hover:bg-clay/85 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
				>
					Apply for this role
				</a>
			</div>
		</div>
	</div>
</article>
