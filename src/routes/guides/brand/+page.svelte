<script lang="ts">
	import Content, { metadata } from './brand.md';

	const title = metadata?.title ?? 'Guide';
	const excerpt = metadata?.excerpt ?? '';
</script>

<svelte:head>
	<title>{title} — Spikenard</title>
	<meta name="description" content={excerpt} />
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-3xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Guides / Brand</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				{title}
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">{excerpt}</p>
		</div>
	</div>
</section>

	<section class="px-6 pb-24">
		<div class="max-w-[75rem] mx-auto">
			<div class="flex flex-wrap items-center gap-4">
				<a
					href="/guides"
					class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-clay transition-colors duration-150 hover:text-umber"
				>
					<span class="icon-[lucide--arrow-left] size-3.5"></span>
					All guides
				</a>
				<a
					href="/doxa-brand-guide.md"
					download="doxa-brand-guide.md"
					class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-clay transition-colors duration-150 hover:text-umber"
				>
					<span class="icon-[lucide--download] size-3.5"></span>
					Download canonical brand guide
				</a>
			</div>

			<div class="mt-8 max-w-3xl">
			<div
				class="prose prose-neutral max-w-none prose-headings:text-umber prose-headings:tracking-tight prose-p:text-neutral-600 prose-li:text-neutral-600 prose-strong:text-umber prose-a:text-clay hover:prose-a:text-clay-dark prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg prose-pre:px-4 prose-pre:py-3 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none "
			>
				<Content />
			</div>
		</div>
	</div>
</section>
