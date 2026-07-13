<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ErrorPage from '$lib/components/ErrorPage.svelte';
</script>

<svelte:head>
	<title>{page.status} | Spikenard</title>
</svelte:head>

<ErrorPage
	icon="icon-[lucide--file-x]"
	heading="Post not found."
	message="This blog post doesn't exist or may have been removed."
	back_icon="icon-[lucide--pen-line]"
	back_label="All posts"
	back_href={resolve('/blog')}
/>
