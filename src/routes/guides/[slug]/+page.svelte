<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.meta.title} — Spikenard</title>
	<meta name="description" content={data.meta.description} />
</svelte:head>

<article class="px-6 pt-24 pb-24 sm:pt-32">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<a href={resolve('/guides')} class="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-umber transition-colors duration-150 mb-8">
				<span class="icon-[lucide--chevron-left] size-4"></span>
				All guides
			</a>

			<div class="prose prose-neutral max-w-none
				prose-headings:text-umber prose-headings:font-semibold prose-headings:tracking-tight
				prose-h1:text-3xl prose-h1:mt-0 prose-h1:mb-6
				prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
				prose-p:text-neutral-600 prose-p:leading-relaxed
				prose-a:text-clay prose-a:underline prose-a:decoration-clay/30 hover:prose-a:decoration-clay
				prose-strong:text-umber prose-strong:font-semibold
				prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
				prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
				prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:rounded-lg prose-pre:text-sm
				prose-li:text-neutral-600
				prose-ul:my-4 prose-li:my-1
				prose-table:text-sm prose-th:text-umber prose-th:font-semibold prose-td:text-neutral-600
				prose-hr:border-neutral-200">
				{#if data.content}
					{@const Content = data.content}
					<Content />
				{/if}
			</div>
		</div>
	</div>
</article>
