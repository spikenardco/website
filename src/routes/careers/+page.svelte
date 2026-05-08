<script lang="ts">
	import { jobs } from '$lib/jobs';
</script>

<svelte:head>
	<title>Careers — Spikenard</title>
	<meta
		name="description"
		content="Join Spikenard. We're looking for people who care about craft, simplicity, and building tools that last."
	/>
</svelte:head>

<section class="px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl">
			<p class="text-clay font-medium text-sm tracking-wide uppercase mb-4">Careers</p>
			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				Build with us
			</h1>
			<p class="mt-6 text-lg text-neutral-600 max-w-prose leading-relaxed">
				We're a small team that values craft over speed and clarity over cleverness. If that sounds
				like your kind of work, take a look at what's open.
			</p>
		</div>
	</div>
</section>

<section class="px-6 py-12 pb-24">
	<div class="max-w-300 mx-auto">
		<div class="max-w-2xl space-y-6">
			{#each jobs as job (job.slug)}
				<a
					href="/careers/{job.slug}"
					class="group block border border-neutral-200 rounded-lg p-6 hover:border-clay/40 transition-colors duration-150"
				>
					<div class="flex items-start justify-between gap-4">
						<div>
							<h2
								class="text-lg font-semibold text-umber group-hover:text-clay transition-colors duration-150"
							>
								{job.title}
							</h2>
							<p class="mt-2 text-neutral-500 text-sm leading-relaxed">
								{job.excerpt}
							</p>
							<div class="flex flex-wrap gap-2 mt-4">
								{#each job.tags as tag}
									<span
										class="text-xs font-medium bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-md"
									>
										{tag}
									</span>
								{/each}
							</div>
						</div>
						<span
							class="icon-[lucide--chevron-right] size-5 text-neutral-300 group-hover:text-clay shrink-0 mt-1 transition-colors duration-150"
						></span>
					</div>
				</a>
			{:else}
				<p class="text-neutral-400 text-sm">No open positions at the moment.</p>
			{/each}
		</div>

		<div class="max-w-2xl mt-16 pt-8 border-t border-neutral-200">
			<h2 class="text-xl font-semibold text-umber tracking-tight">Don't see a fit?</h2>
			<p class="mt-3 text-neutral-500 leading-relaxed">
				We're always interested in hearing from people who care about building good software. Drop
				us a line at
				<a
					href="mailto:hello@spikenard.dev"
					class="text-clay underline decoration-clay/30 hover:decoration-clay"
				>
					hello@spikenard.dev
				</a>
				with what you're working on and why Spikenard interests you.
			</p>
		</div>
	</div>
</section>
