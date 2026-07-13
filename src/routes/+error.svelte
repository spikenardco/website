<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ErrorPage from '$lib/components/ErrorPage.svelte';

	const is_404 = $derived(page.status === 404);
	const icon = $derived(is_404 ? 'icon-[lucide--search-x]' : 'icon-[lucide--triangle-alert]');
	const heading = $derived(is_404 ? 'Page not found.' : 'Something went wrong.');
	const message = $derived(
		is_404
			? "The page you're looking for doesn't exist or has been moved."
			: page.error?.message || 'An unexpected error occurred. Please try again.'
	);
</script>

<svelte:head>
	<title>{page.status} | Spikenard</title>
</svelte:head>

<ErrorPage
	{icon}
	{heading}
	{message}
	back_icon="icon-[lucide--house]"
	back_label="Go home"
	back_href={resolve('/')}
/>
