<script lang="ts">
	import { resolve } from '$app/paths';
	import { projects } from '$lib/projects';
	const oss_projects = projects.filter((p) => p.opensource && p.featured);
</script>

<svelte:head>
	<title>Open Source — Spikenard</title>
	<meta
		name="description"
		content="Our open-source philosophy, how we build in public, and how you can contribute."
	/>
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Open Source</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Open by default
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				We build in public. Our code, our process, our mistakes — all out in the open. Here's why,
				and how you can be part of it.
			</p>
		</div>
	</div>
</section>

<!-- Philosophy -->
<section class="px-6 py-12 sm:py-16">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl space-y-6 text-neutral-600 leading-relaxed">
			<h2 class="text-2xl font-semibold text-umber tracking-tight">Our philosophy</h2>
			<p>
				Open source isn't a business strategy for us. It's a belief about how good software gets
				made. When code is public, it gets better — more eyes find more bugs, more perspectives lead
				to better APIs, and more people benefit from the work.
			</p>
			<p>
				Every tool we build starts as an open repo. We don't build in private and release later. The
				first commit is public. The messy early code is public. The discussions about what to name
				things are public. We think transparency about the process is as valuable as the final
				product.
			</p>
			<p>
				We're inspired by the artisans of Exodus 31 — craftsmen given wisdom and skill to build
				something worthy. A workshop isn't a closed room. It's a place where people learn by
				watching, asking, and eventually building alongside you.
			</p>
		</div>
	</div>
</section>

<!-- Our Repos -->
<section class="px-6 py-12 sm:py-16 bg-neutral-50">
	<div class="max-w-300 mx-auto">
		<div class="flex items-end justify-between mb-8">
			<div>
				<h2 class="text-2xl font-semibold text-umber tracking-tight">Our repos</h2>
				<p class="mt-2 text-neutral-500 text-sm">A few things we've open-sourced.</p>
			</div>
			<a
				href={resolve('/projects')}
				class="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-umber transition-colors duration-150"
			>
				View all
				<span class="icon-[lucide--chevron-right] size-4"></span>
			</a>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each oss_projects as project (project.title)}
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					class="border border-neutral-200 rounded-lg px-5 py-4 hover:border-neutral-300 transition-colors duration-150 group block"
				>
					<div class="flex items-center justify-between">
						<h3
							class="text-umber font-semibold group-hover:text-clay transition-colors duration-150"
						>
							{project.title}
						</h3>
						<span
							class="icon-[lucide--arrow-up-right] size-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-150"
						></span>
					</div>
					<p class="text-neutral-500 text-sm mt-1 leading-relaxed line-clamp-2">
						{project.description}
					</p>
					<div class="mt-3 flex flex-wrap gap-1.5">
						{#each project.tags as tag (tag)}
							<span class="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-400"
								>{tag}</span
							>
						{/each}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- How to contribute -->
<section class="px-6 py-12 sm:py-16">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<h2 class="text-2xl font-semibold text-umber tracking-tight mb-8">How to contribute</h2>
			<div class="space-y-8">
				<div class="flex gap-4">
					<div
						class="w-8 h-8 rounded-md bg-clay/10 flex items-center justify-center shrink-0 mt-0.5"
					>
						<span class="text-clay font-semibold text-sm">1</span>
					</div>
					<div>
						<h3 class="text-umber font-semibold">Pick a project</h3>
						<p class="text-neutral-500 mt-1 text-sm leading-relaxed">
							Browse our <a
								href={resolve('/projects')}
								class="text-clay underline decoration-clay/30 hover:decoration-clay"
								>projects page</a
							>
							or our
							<a
								href="https://github.com/spikenardco"
								target="_blank"
								rel="noopener noreferrer"
								class="text-clay underline decoration-clay/30 hover:decoration-clay">GitHub org</a
							>. Each repo has a README explaining what it does and how to set it up.
						</p>
					</div>
				</div>

				<div class="flex gap-4">
					<div
						class="w-8 h-8 rounded-md bg-clay/10 flex items-center justify-center shrink-0 mt-0.5"
					>
						<span class="text-clay font-semibold text-sm">2</span>
					</div>
					<div>
						<h3 class="text-umber font-semibold">Start small</h3>
						<p class="text-neutral-500 mt-1 text-sm leading-relaxed">
							Fix a typo. Improve an error message. Add a test case. Small contributions are real
							contributions. They help you learn the codebase and they help us ship better software.
						</p>
					</div>
				</div>

				<div class="flex gap-4">
					<div
						class="w-8 h-8 rounded-md bg-clay/10 flex items-center justify-center shrink-0 mt-0.5"
					>
						<span class="text-clay font-semibold text-sm">3</span>
					</div>
					<div>
						<h3 class="text-umber font-semibold">Open an issue first</h3>
						<p class="text-neutral-500 mt-1 text-sm leading-relaxed">
							For larger changes, open an issue before writing code. Describe what you want to
							change and why. This saves everyone time — we might already be working on it, or we
							might have context that changes the approach.
						</p>
					</div>
				</div>

				<div class="flex gap-4">
					<div
						class="w-8 h-8 rounded-md bg-clay/10 flex items-center justify-center shrink-0 mt-0.5"
					>
						<span class="text-clay font-semibold text-sm">4</span>
					</div>
					<div>
						<h3 class="text-umber font-semibold">Submit a PR</h3>
						<p class="text-neutral-500 mt-1 text-sm leading-relaxed">
							Keep PRs focused. One change per PR. Write a clear description of what you changed and
							why. We review everything and try to respond within a few days.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Principles -->
<section class="px-6 py-12 sm:py-16">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<h2 class="text-2xl font-semibold text-umber tracking-tight mb-8">Our standards</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<div class="border border-neutral-200 rounded-lg p-5">
					<h3 class="text-umber font-semibold text-sm">Clarity over cleverness</h3>
					<p class="text-neutral-500 mt-2 text-sm leading-relaxed">
						Code that's easy to read is more valuable than code that's impressive. If a reviewer has
						to puzzle over what your code does, simplify it.
					</p>
				</div>
				<div class="border border-neutral-200 rounded-lg p-5">
					<h3 class="text-umber font-semibold text-sm">Tests are not optional</h3>
					<p class="text-neutral-500 mt-2 text-sm leading-relaxed">
						If you add a feature, add a test. If you fix a bug, add a test that would have caught
						it. Tests are how we stay confident in the code.
					</p>
				</div>
				<div class="border border-neutral-200 rounded-lg p-5">
					<h3 class="text-umber font-semibold text-sm">Small PRs ship faster</h3>
					<p class="text-neutral-500 mt-2 text-sm leading-relaxed">
						A 50-line PR gets reviewed in a day. A 500-line PR sits for a week. Break large changes
						into smaller, shippable pieces.
					</p>
				</div>
				<div class="border border-neutral-200 rounded-lg p-5">
					<h3 class="text-umber font-semibold text-sm">Be kind</h3>
					<p class="text-neutral-500 mt-2 text-sm leading-relaxed">
						Code review is a conversation, not a judgment. We critique code, not people. Everyone
						here is trying to build something good.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="px-6 py-16 sm:py-20 pb-24">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<h2 class="text-2xl font-semibold text-umber tracking-tight">Ready to contribute?</h2>
			<p class="mt-4 text-neutral-500 leading-relaxed">
				Browse our repos, find something interesting, and jump in. No formal application, no
				onboarding process. Just good code and good intentions.
			</p>
			<a
				href="https://github.com/spikenardco"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 mt-6 bg-clay text-parchment px-5 py-2.5 rounded-md font-medium hover:bg-clay/85 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
			>
				<span class="icon-[lucide--github] size-4"></span>
				Browse repos on GitHub
			</a>
		</div>
	</div>
</section>
