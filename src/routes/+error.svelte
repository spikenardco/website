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
				{#if page.status === 404}
					<span class="icon-[lucide--search-x] size-7 text-clay"></span>
				{:else}
					<span class="icon-[lucide--triangle-alert] size-7 text-clay"></span>
				{/if}
			</div>

			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-3">{page.status}</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				{#if page.status === 404}
					Page not found.
				{:else}
					Something went wrong.
				{/if}
			</h1>
			<p class="mt-4 text-lg text-neutral-500 leading-relaxed">
				{#if page.status === 404}
					The page you're looking for doesn't exist or has been moved.
				{:else if page.error?.message}
					{page.error.message}
				{:else}
					An unexpected error occurred. Please try again.
				{/if}
			</p>

			<div class="mt-10">
				<a
					href="/"
					class="inline-flex items-center gap-2 bg-clay text-parchment px-5 py-2.5 rounded-md font-medium hover:bg-clay/85 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
				>
					<span class="icon-[lucide--house] size-4"></span>
					Go home
				</a>
			</div>
		</div>
	</div>
</section>
