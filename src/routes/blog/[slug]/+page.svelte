<script lang="ts">
	import { resolve } from '$app/paths';
	import { format_date } from '$lib/posts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let scroll_progress = $state(0);
</script>

<svelte:window onscroll={() => {
	const el = document.documentElement;
	scroll_progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
}} />

<svelte:head>
	<title>{data.meta.title} — Spikenard</title>
	<meta name="description" content={data.meta.excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.excerpt} />
	<meta property="article:published_time" content={data.meta.date} />
</svelte:head>

<div class="fixed top-16 left-0 h-0.5 bg-clay/30 w-full z-50">
	<div class="h-full bg-clay transition-[width] duration-75" style="width: {scroll_progress * 100}%"></div>
</div>

<article class="px-6 pt-24 pb-24 sm:pt-32">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<!-- Back link -->
			<a href={resolve('/blog')} class="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-umber transition-colors duration-150 mb-8">
				<span class="icon-[lucide--chevron-left] size-4"></span>
				All posts
			</a>

			<!-- Header -->
			<div class="flex items-center gap-3 text-sm text-neutral-400 mb-4">
				<time datetime={data.meta.date}>{format_date(data.meta.date)}</time>
				<span class="w-1 h-1 rounded-full bg-neutral-300"></span>
				<span>{data.meta.reading_time}</span>
			</div>

			<h1 class="text-3xl sm:text-4xl font-bold text-umber leading-tight tracking-tight">
				{data.meta.title}
			</h1>

			<p class="mt-4 text-lg text-neutral-500 leading-relaxed">
				{data.meta.excerpt}
			</p>

			<!-- Content -->
			<div class="mt-12 prose prose-neutral max-w-none
				prose-headings:text-umber prose-headings:font-semibold prose-headings:tracking-tight
				prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
				prose-p:text-neutral-600 prose-p:leading-relaxed
				prose-a:text-clay prose-a:underline prose-a:decoration-clay/30 hover:prose-a:decoration-clay
				prose-strong:text-umber prose-strong:font-semibold
				prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
				prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:rounded-lg prose-pre:text-sm
				prose-li:text-neutral-600
				prose-ul:my-4 prose-li:my-1">
				{#if data.content}
					{@const Content = data.content}
					<Content />
				{/if}
			</div>

			<!-- Footer -->
			<div class="mt-16 pt-8 border-t border-neutral-200 flex items-start justify-between gap-6">
				{#if data.prev}
					<a href={resolve('/blog/[slug]', { slug: data.prev.slug })} class="group flex flex-col gap-1 min-w-0">
						<span class="inline-flex items-center gap-1 text-xs text-neutral-400">
							<span class="icon-[lucide--chevron-left] size-3"></span>
							Previous
						</span>
						<span class="text-sm font-medium text-neutral-600 group-hover:text-clay transition-colors duration-150 line-clamp-2">{data.prev.title}</span>
					</a>
				{:else}
					<div></div>
				{/if}
				{#if data.next}
					<a href={resolve('/blog/[slug]', { slug: data.next.slug })} class="group flex flex-col items-end gap-1 min-w-0 text-right">
						<span class="inline-flex items-center gap-1 text-xs text-neutral-400">
							Next
							<span class="icon-[lucide--chevron-right] size-3"></span>
						</span>
						<span class="text-sm font-medium text-neutral-600 group-hover:text-clay transition-colors duration-150 line-clamp-2">{data.next.title}</span>
					</a>
				{:else}
					<div></div>
				{/if}
			</div>
		</div>
	</div>
</article>
