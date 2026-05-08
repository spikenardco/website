<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Spikenard</title>
</svelte:head>

<section class="px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-xl mx-auto text-center">
			<div class="w-16 h-16 rounded-2xl bg-clay/10 flex items-center justify-center mx-auto mb-8">
				<span class="icon-[lucide--file-x] size-7 text-clay"></span>
			</div>

			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-3">{page.status}</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Post not found.
			</h1>
			<p class="mt-4 text-lg text-neutral-500 leading-relaxed">
				This blog post doesn't exist or may have been removed.
			</p>

			<div class="mt-10">
				<a
					href="/blog"
					class="inline-flex items-center gap-2 bg-clay text-parchment px-5 py-2.5 rounded-md font-medium hover:bg-clay/85 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
				>
					<span class="icon-[lucide--pen-line] size-4"></span>
					All posts
				</a>
			</div>
		</div>
	</div>
</section>
