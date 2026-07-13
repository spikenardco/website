<script lang="ts">
	let {
		icon,
		heading,
		message,
		back_icon,
		back_label,
		back_href
	}: {
		icon: string;
		heading: string;
		message: string;
		back_icon: string;
		back_label: string;
		back_href: string;
	} = $props();
</script>

<section class="px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
	<div class="max-w-300 mx-auto">
		<div class="max-w-xl mx-auto text-center">
			<div class="w-16 h-16 rounded-2xl bg-clay/10 flex items-center justify-center mx-auto mb-8">
				<span class="{icon} size-7 text-clay"></span>
			</div>

			<h1 class="text-4xl sm:text-5xl font-bold text-umber leading-tight tracking-tight">
				{heading}
			</h1>
			<p class="mt-4 text-lg text-neutral-500 leading-relaxed">
				{message}
			</p>

			<div class="mt-10">
				<a
					href={back_href}
					class="inline-flex items-center gap-2 bg-clay text-parchment px-5 py-2.5 rounded-md font-medium hover:bg-clay/85 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
				>
					<span class="{back_icon} size-4"></span>
					{back_label}
				</a>
			</div>
		</div>
	</div>
</section>
