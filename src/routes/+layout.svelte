<script lang="ts">
	import Sidenav from '$lib/components/Sidenav.svelte';
	import Topnav from '$lib/components/Topnav.svelte';
	import { preview } from '$lib/stores/preview';
	import '../app.css';
</script>

<svelte:head>
	<title>.dev</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&family=IBM+Plex+Sans:ital,wght@0,700;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Topnav />

<main class="max-w-7xl mx-auto grid sm:grid-cols-12 col-span-1 mt-5">
	{#if $preview.showSidebar}
		<Sidenav />
	{/if}

	<div
		class="col-span-12 flex flex-col justify-center gap-y-3 items-center mb-5 
		{$preview.showSidebar ? 'sm:col-span-7' : 'sm:col-span-9'}
		"
	>
		<slot />
	</div>

	<div class="sm:col-span-3 col-span-12 p-3">
		<div class="bg-shark w-full h-[250px] rounded mx-auto" />
		<footer class="border-charade border-t mt-7">
			<a href="https://github.com/zavbala/.dev" target="_blank" class="mt-2 text-xs text-center">
				Open Source
			</a>
		</footer>
	</div>
</main>
