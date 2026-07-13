<script lang="ts">
	import { resolve } from '$app/paths';
	import { guides } from '$lib/guides';
</script>

<svelte:head>
	<title>Guides — Spikenard</title>
	<meta name="description" content="Coding conventions, style guides, and tech stack reference for Spikenard projects." />
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Guides</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Coding conventions & reference
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				Our standards for writing code across every language we use. These guides govern all
				Spikenard projects — from naming conventions to testing patterns.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 pb-24">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl space-y-4">
			{#each guides as guide (guide.slug)}
				<a
					href={resolve('/guides/[slug]', { slug: guide.slug })}
					class="group block border border-neutral-200 rounded-lg p-5 hover:border-clay/40 transition-colors duration-150"
				>
					<h3 class="text-lg font-semibold text-umber group-hover:text-clay transition-colors duration-150">
						{guide.title}
					</h3>
					<p class="mt-1 text-neutral-500 text-sm leading-relaxed">
						{guide.description}
					</p>
				</a>
			{/each}
		</div>
	</div>
</section>
