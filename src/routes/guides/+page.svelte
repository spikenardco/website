<svelte:head>
	<title>Guides — Spikenard</title>
	<meta
		name="description"
		content="Brand and design system guides used across Doxa projects, with small project-level adjustments."
	/>
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-[75rem] mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Guides</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Shared standards, shipped consistently
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				This section documents the baseline standards we use across Doxa projects. Teams can make minor project-level tweaks, but the foundation stays consistent.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 pb-24">
	<div class="max-w-[75rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
		<a
			href="/guides/brand"
			class="bg-parchment border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group block"
		>
			<div class="flex items-center justify-between mb-4">
				<div class="w-9 h-9 rounded-md bg-clay/10 flex items-center justify-center">
					<span class="icon-[lucide--gem] size-5 text-clay"></span>
				</div>
				<span class="icon-[lucide--arrow-up-right] size-4 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-150"></span>
			</div>
			<h2 class="text-xl font-semibold text-umber group-hover:text-clay transition-colors duration-150">
				Brand Guide
			</h2>
			<p class="mt-3 text-neutral-500 leading-relaxed text-sm">
				Name usage, tone of voice, color system, typography, and visual principles based on `doxa-brand-guide.md`.
			</p>
		</a>

		<a
			href="/guides/design-system"
			class="bg-parchment border border-neutral-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group block"
		>
			<div class="flex items-center justify-between mb-4">
				<div class="w-9 h-9 rounded-md bg-sage/15 flex items-center justify-center">
					<span class="icon-[lucide--layout-template] size-5 text-sage"></span>
				</div>
				<span class="icon-[lucide--arrow-up-right] size-4 text-neutral-300 group-hover:text-neutral-500 transition-colors duration-150"></span>
			</div>
			<h2 class="text-xl font-semibold text-umber group-hover:text-clay transition-colors duration-150">
				Design System
			</h2>
			<p class="mt-3 text-neutral-500 leading-relaxed text-sm">
				Implementation rules and do/don&apos;t conventions for fonts, icons, Tailwind v4, components, spacing, and accessibility.
			</p>
		</a>

	</div>
</section>
