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
	heading="Role not found."
	message="This job posting doesn't exist or may have been filled."
	back_icon="icon-[lucide--briefcase]"
	back_label="All roles"
	back_href={resolve('/careers')}
/>
