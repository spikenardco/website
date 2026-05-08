<script lang="ts">
	import { posts, format_date } from '$lib/posts';
	import { resolve } from '$app/paths';

	let active_tag = $state<string | null>(null);
	let search = $state('');

	const all_tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

	const filtered = $derived.by(() => {
		let result = active_tag ? posts.filter((p) => p.tags.includes(active_tag!)) : posts;
		if (search.trim()) {
			const q = search.trim().toLowerCase();
			result = result.filter(
				(p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
			);
		}
		return result;
	});
</script>

<svelte:head>
	<title>Blog — Spikenard</title>
	<meta name="description" content="Build logs, technical deep-dives, and lessons learned from the Spikenard team." />
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Blog</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Build logs & lessons
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				What we're building, why we made the choices we did, and what we learned along the way.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 pb-24">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<input
				type="text"
				bind:value={search}
				placeholder="Search posts..."
				class="w-full px-4 py-2.5 mb-6 rounded-lg border border-neutral-200 bg-parchment text-umber placeholder:text-neutral-400 text-sm focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-colors duration-150"
			/>
			<div class="flex flex-wrap gap-2 mb-12">
				<button
					onclick={() => (active_tag = null)}
					class="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150 {active_tag === null ? 'bg-clay text-parchment' : 'bg-neutral-100 text-neutral-500 hover:text-umber'}"
				>
					All
				</button>
				{#each all_tags as tag (tag)}
					<button
						onclick={() => (active_tag = active_tag === tag ? null : tag)}
						class="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150 {active_tag === tag ? 'bg-clay text-parchment' : 'bg-neutral-100 text-neutral-500 hover:text-umber'}"
					>
						{tag}
					</button>
				{/each}
			</div>
		</div>
		<div class="max-w-2xl space-y-12">
			{#each filtered as post (post.slug)}
				<article>
					<div class="flex items-center gap-3 text-sm text-neutral-400 mb-3">
						<time datetime={post.date}>{format_date(post.date)}</time>
						<span class="w-1 h-1 rounded-full bg-neutral-300"></span>
						<span>{post.reading_time}</span>
					</div>
					<a href={resolve('/blog/[slug]', { slug: post.slug })} class="group block">
						<h2 class="text-xl sm:text-2xl font-semibold text-umber group-hover:text-clay transition-colors duration-150 leading-snug">
							{post.title}
						</h2>
						<p class="mt-3 text-neutral-500 leading-relaxed">
							{post.excerpt}
						</p>
						<span class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-clay">
							Read more
							<span class="icon-[lucide--chevron-right] size-4"></span>
						</span>
					</a>
				</article>
			{:else}
				<p class="text-neutral-400 text-sm">No posts found.</p>
			{/each}
		</div>
	</div>
</section>
