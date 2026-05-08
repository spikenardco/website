<div class="absolute inset-0 overflow-hidden pointer-events-none">
	<svg
		class="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] hidden lg:block"
		viewBox="0 0 500 400"
		fill="none"
		style="mask-image: radial-gradient(ellipse 80% 80% at 60% 50%, black 10%, transparent 70%);"
		aria-hidden="true"
	>
		<!-- Concentric organic contour lines -->
		<g class="spin-60" style="transform-origin: 280px 200px;">
			<ellipse cx="280" cy="200" rx="60" ry="45" stroke="var(--color-clay)" stroke-width="0.9" opacity="0.25" />
		</g>
		<g class="spin-75" style="transform-origin: 280px 200px;">
			<ellipse cx="280" cy="200" rx="95" ry="72" stroke="var(--color-clay)" stroke-width="0.9" opacity="0.20" />
		</g>
		<g class="spin-90" style="transform-origin: 280px 200px;">
			<ellipse cx="280" cy="200" rx="130" ry="100" stroke="var(--color-clay)" stroke-width="0.8" opacity="0.17" />
		</g>
		<g class="spin-100" style="transform-origin: 280px 200px;">
			<ellipse cx="280" cy="200" rx="170" ry="130" stroke="var(--color-sand)" stroke-width="0.8" opacity="0.14" />
		</g>
		<g class="spin-120" style="transform-origin: 280px 200px;">
			<ellipse cx="280" cy="200" rx="210" ry="162" stroke="var(--color-clay)" stroke-width="0.7" opacity="0.10" />
		</g>
		<g class="spin-140" style="transform-origin: 280px 200px;">
			<ellipse cx="280" cy="200" rx="250" ry="195" stroke="var(--color-sand)" stroke-width="0.6" opacity="0.08" />
		</g>

		<!-- Offset cluster -->
		<g class="spin-80" style="transform-origin: 350px 140px;">
			<ellipse cx="350" cy="140" rx="40" ry="30" stroke="var(--color-sand)" stroke-width="0.8" opacity="0.16" />
		</g>
		<g class="spin-100" style="transform-origin: 350px 140px;">
			<ellipse cx="350" cy="140" rx="70" ry="52" stroke="var(--color-clay)" stroke-width="0.6" opacity="0.12" />
		</g>
	</svg>
</div>

<style>
	@keyframes spin-clockwise {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
	@keyframes spin-counter {
		from { transform: rotate(0deg); }
		to { transform: rotate(-360deg); }
	}

	.spin-60 { animation: spin-clockwise 40s linear infinite; }
	.spin-75 { animation: spin-clockwise 50s linear infinite; }
	.spin-90 { animation: spin-clockwise 60s linear infinite; }
	.spin-100 { animation: spin-clockwise 70s linear infinite; }
	.spin-120 { animation: spin-counter 80s linear infinite; }
	.spin-140 { animation: spin-clockwise 90s linear infinite; }
</style>
