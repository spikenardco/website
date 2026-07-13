<script lang="ts">
	import { resolve } from '$app/paths';
	import { projects } from '$lib/projects';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TopographicLines from './TopographicLines.svelte';

	const featured = projects.filter((p) => p.featured && p.show !== false);
</script>

<svelte:head>
	<title>Spikenard | Built with intention</title>
	<meta name="description" content="Spikenard is a builder collective. We make tools, share code, and learn in public." />
</svelte:head>

<!-- Hero -->
<section class="px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 relative">
	<TopographicLines />

	<div class="max-w-300 mx-auto relative">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Builder Collective</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Built with intention.
			</h1>
			<p class="mt-3 text-neutral-400 text-sm tracking-wide">
				spikenard (νάρδος) — <span class="italic">costly oil poured out in worship</span>
			</p>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				Spikenard is a collective of builders who believe software should be crafted with care and shared generously. We craft tools, platforms, and open-source projects.
			</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href="https://github.com/spikenardco"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 bg-clay text-parchment px-5 py-2.5 rounded-md font-medium hover:bg-clay/85 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
				>
					<span class="icon-[lucide--github] size-5"></span>
					View on GitHub
				</a>
				<a
					href="#work"
					class="inline-flex items-center border border-neutral-300 text-neutral-700 px-5 py-2.5 rounded-md font-medium hover:bg-neutral-100 transition-colors duration-150"
				>
					See our work
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Featured Work -->
<section id="work" class="px-6 py-20 sm:py-24 bg-neutral-50">
	<div class="max-w-300 mx-auto">
		<div class="flex items-end justify-between mb-12">
			<div>
				<p class="text-clay font-medium text-sm tracking-wide uppercase mb-2">Featured Work</p>
				<h2 class="text-3xl font-semibold text-umber tracking-tight">What we're building</h2>
			</div>
			<a href={resolve('/projects')} class="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-umber transition-colors duration-150">
				View all
				<span class="icon-[lucide--chevron-right] size-4"></span>
			</a>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each featured as project (project.title)}
				<ProjectCard {project} linked={!!project.link} />
			{/each}
		</div>
		<div class="mt-8 sm:hidden">
			<a href={resolve('/projects')} class="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-umber transition-colors duration-150">
				View all projects
				<span class="icon-[lucide--chevron-right] size-4"></span>
			</a>
		</div>
	</div>
</section>

<!-- What We Do -->
<section id="about" class="px-6 py-20 sm:py-24">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-2">About</p>
			<h2 class="text-3xl font-semibold text-umber tracking-tight">Crafted, not assembled.</h2>
			<div class="mt-6 space-y-4 text-neutral-600 leading-relaxed">
				<p>
					The name comes from the costly oil poured out by Mary in the Gospels — an act of devotion marked by intention, beauty, and sacrifice. Its fragrance filled the room.
				</p>
				<p>
					We carry that same philosophy into our work: build carefully, refine relentlessly, and create things worthy of being shared. Everything we ship is made with intention.
				</p>
				<p>
					Inspired by the artisans of Exodus 31, who were filled with wisdom, understanding, and skill to build something worthy, we believe the best software comes from treating code as craft.
				</p>
			</div>
			<div class="mt-8 pt-8 border-t border-neutral-200">
				<p class="text-neutral-600 text-sm leading-relaxed">
					We believe good software is carefully designed, patiently refined, and generously shared. Not everything needs to move fast. Not everything should be optimized for attention. Some things are worth building well. That is the spirit behind spikenard.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section id="values" class="px-6 py-20 sm:py-24 bg-neutral-50">
	<div class="max-w-300 mx-auto">
		<div class="mb-12">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-2">Our Values</p>
			<h2 class="text-3xl font-semibold text-umber tracking-tight">What we believe</h2>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
			<div>
				<div class="w-10 h-10 rounded-lg bg-clay/10 flex items-center justify-center mb-4">
					<span class="icon-[lucide--paintbrush] size-5 text-clay"></span>
				</div>
				<h3 class="text-umber font-semibold text-lg">Crafted with care</h3>
				<p class="text-neutral-500 mt-2 leading-relaxed text-sm">
					Every decision is deliberate. We sweat the details because the details are where quality lives. No shortcuts, no half-measures.
				</p>
			</div>

			<div>
				<div class="w-10 h-10 rounded-lg bg-sage/15 flex items-center justify-center mb-4">
					<span class="icon-[lucide--lock-open] size-5 text-sage"></span>
				</div>
				<h3 class="text-umber font-semibold text-lg">Open by default</h3>
				<p class="text-neutral-500 mt-2 leading-relaxed text-sm">
					We share our code, our process, and our lessons. Open source isn't a strategy — it's how we believe good software should be made.
				</p>
			</div>

			<div>
				<div class="w-10 h-10 rounded-lg bg-stone-blue/15 flex items-center justify-center mb-4">
					<span class="icon-[lucide--clock] size-5 text-stone-blue"></span>
				</div>
				<h3 class="text-umber font-semibold text-lg">Built to last</h3>
				<p class="text-neutral-500 mt-2 leading-relaxed text-sm">
					We choose boring technology over hype. We write tests. We document. We build things that work today and still work a year from now.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="px-6 py-20 sm:py-24">
	<div class="max-w-300 mx-auto text-center">
		<h2 class="text-2xl sm:text-3xl font-semibold text-umber tracking-tight">The work speaks.</h2>
		<p class="mt-4 text-neutral-500 max-w-md mx-auto">
			Follow our journey on GitHub. Star a repo, open an issue, or just say hello.
		</p>
		<a
			href="https://github.com/spikenardco"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 mt-8 bg-umber text-linen px-6 py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-umber"
		>
			<span class="icon-[lucide--github] size-5"></span>
			Follow Spikenard
		</a>
	</div>
</section>
