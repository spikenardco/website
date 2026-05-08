<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';

	const site_url = 'https://spikenard.dev';

	let { children } = $props();
	let menu_open = $state(false);
</script>

<svelte:head>
	<link rel="canonical" href="{site_url}{page.url.pathname}" />
	<meta property="og:url" content="{site_url}{page.url.pathname}" />
	<title>Spikenard</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-parchment text-umber">
	<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-clay focus:text-parchment focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium">Skip to content</a>

	<!-- Navigation -->
	<nav class="bg-parchment/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
		<div class="max-w-[75rem] mx-auto px-6 h-16 flex items-center justify-between">
			<a href="/" class="flex items-center gap-2 text-umber font-semibold text-lg tracking-tight">
				<img src="/logo-mark.png" alt="" class="size-8" />
				δόξα labs
			</a>
			<div class="flex items-center gap-8">
				<div class="hidden sm:flex gap-8 text-sm font-medium">
					<a href="/projects" aria-current={page.url.pathname.startsWith('/projects') ? 'page' : undefined} class="{page.url.pathname.startsWith('/projects') ? 'text-clay' : 'text-neutral-600 hover:text-umber'} transition-colors duration-150">Projects</a>
					<a href="/blog" aria-current={page.url.pathname.startsWith('/blog') ? 'page' : undefined} class="{page.url.pathname.startsWith('/blog') ? 'text-clay' : 'text-neutral-600 hover:text-umber'} transition-colors duration-150">Blog</a>
					<a href="/guides" aria-current={page.url.pathname.startsWith('/guides') ? 'page' : undefined} class="{page.url.pathname.startsWith('/guides') ? 'text-clay' : 'text-neutral-600 hover:text-umber'} transition-colors duration-150">Guides</a>
					<a href="/open-source" aria-current={page.url.pathname.startsWith('/open-source') ? 'page' : undefined} class="{page.url.pathname.startsWith('/open-source') ? 'text-clay' : 'text-neutral-600 hover:text-umber'} transition-colors duration-150">Open Source</a>
				</div>
				<a
					href="https://github.com/spikenardco"
					target="_blank"
					rel="noopener noreferrer"
					class="text-neutral-500 hover:text-umber transition-colors duration-150"
					aria-label="GitHub"
				>
				<span class="icon-[mdi--github] size-5"></span>
				</a>
			</div>
		</div>
	</nav>

	<!-- Mobile floating nav button -->
	<div class="fixed bottom-6 right-6 z-50 sm:hidden flex flex-col items-end gap-3">
		<!-- Slide-up links -->
		{#if menu_open}
			<button
				class="fixed inset-0 z-[-1]"
				aria-label="Close menu"
				onclick={() => (menu_open = false)}
			></button>
			<nav class="flex flex-col gap-1 items-end" aria-label="Mobile navigation">
				<a
					href="/projects"
					onclick={() => (menu_open = false)}
					aria-current={page.url.pathname.startsWith('/projects') ? 'page' : undefined}
					class="flex items-center gap-2 rounded-full px-4 py-2 bg-parchment border border-neutral-200 shadow-md text-sm font-medium transition-colors duration-150 {page.url.pathname.startsWith('/projects') ? 'text-clay' : 'text-neutral-600 hover:text-umber'}"
					in:fly={{ y: 16, duration: 250, delay: 100 }}
					out:fly={{ y: 16, duration: 150 }}
				>
					<span class="icon-[lucide--folder] size-4"></span>
					Projects
				</a>
				<a
					href="/blog"
					onclick={() => (menu_open = false)}
					aria-current={page.url.pathname.startsWith('/blog') ? 'page' : undefined}
					class="flex items-center gap-2 rounded-full px-4 py-2 bg-parchment border border-neutral-200 shadow-md text-sm font-medium transition-colors duration-150 {page.url.pathname.startsWith('/blog') ? 'text-clay' : 'text-neutral-600 hover:text-umber'}"
					in:fly={{ y: 16, duration: 250, delay: 50 }}
					out:fly={{ y: 16, duration: 150 }}
				>
					<span class="icon-[lucide--pen-line] size-4"></span>
					Blog
				</a>
				<a
					href="/open-source"
					onclick={() => (menu_open = false)}
					aria-current={page.url.pathname.startsWith('/open-source') ? 'page' : undefined}
					class="flex items-center gap-2 rounded-full px-4 py-2 bg-parchment border border-neutral-200 shadow-md text-sm font-medium transition-colors duration-150 {page.url.pathname.startsWith('/open-source') ? 'text-clay' : 'text-neutral-600 hover:text-umber'}"
					in:fly={{ y: 16, duration: 250 }}
					out:fly={{ y: 16, duration: 150 }}
				>
					<span class="icon-[lucide--code] size-4"></span>
					OSS
				</a>
				<a
					href="/guides"
					onclick={() => (menu_open = false)}
					aria-current={page.url.pathname.startsWith('/guides') ? 'page' : undefined}
					class="flex items-center gap-2 rounded-full px-4 py-2 bg-parchment border border-neutral-200 shadow-md text-sm font-medium transition-colors duration-150 {page.url.pathname.startsWith('/guides') ? 'text-clay' : 'text-neutral-600 hover:text-umber'}"
					in:fly={{ y: 16, duration: 250, delay: 150 }}
					out:fly={{ y: 16, duration: 150 }}
				>
					<span class="icon-[lucide--book-open] size-4"></span>
					Guides
				</a>
			</nav>
		{/if}

		<!-- FAB toggle -->
		<button
			class="size-12 rounded-full bg-clay-dark border border-neutral-200 shadow-lg flex items-center justify-center text-parchment hover:text-sand transition-all duration-200 {menu_open ? 'rotate-45' : 'rotate-0'}"
			aria-label="Toggle navigation"
			onclick={() => (menu_open = !menu_open)}
		>
			<span class="icon-[lucide--plus] size-5"></span>
		</button>
	</div>

	<!-- Main content -->
	<main id="main" class="flex-1">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="border-t border-neutral-200 bg-neutral-50">
		<div class="max-w-[75rem] mx-auto px-6 py-12">
			<div class="flex flex-col sm:flex-row justify-between items-start gap-8">
				<div>
					<p class="flex items-center gap-2 text-umber font-semibold tracking-tight">
						<img src="/logo-mark.png" alt="" class="size-6" />
						δόξα labs
					</p>
					<p class="text-neutral-500 text-sm mt-1">Built with intention.</p>
				</div>
				<div class="flex flex-wrap gap-x-8 gap-y-2 text-sm text-neutral-500">
					<a href="/projects" class="hover:text-umber transition-colors duration-150">Projects</a>
					<a href="/blog" class="hover:text-umber transition-colors duration-150">Blog</a>
					<a href="/guides" class="hover:text-umber transition-colors duration-150">Guides</a>
					<a href="/open-source" class="hover:text-umber transition-colors duration-150">Open Source</a>
					<a href="/careers" class="hover:text-umber transition-colors duration-150">Careers</a>
					<a href="https://github.com/spikenardco" target="_blank" rel="noopener noreferrer" class="hover:text-umber transition-colors duration-150">GitHub</a>
				</div>
			</div>
			<div class="mt-8 pt-8 border-t border-neutral-200 text-sm text-neutral-400">
				<p>&copy; {new Date().getFullYear()} Spikenard. Crafted, not assembled.</p>
			</div>
		</div>
	</footer>
</div>
