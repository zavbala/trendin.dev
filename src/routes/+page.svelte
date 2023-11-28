<script lang="ts">
import Card from '$lib/components/Card.svelte';
import type { App } from '$lib/types/app';

export let data: { apple: { apps: App[] } };
</script>

<svelte:head>
	<title>trendin.dev</title>

	<meta
		name="description"
		content="Discover daily developer trends from GitHub, Product Hunt, Indie Hackers, Hacker News, and more! Your reliable source for staying updated on the latest in tech and innovation. Elevate your knowledge and stay ahead in the dynamic world of development. 🚀"
	/>
</svelte:head>

<div class="w-full">
	<h1 class="mb-4 md:mb-7">Daily Apps / Apple</h1>

	<div class="grid gap-3 md:grid-cols-2">
		{#each data.apple.apps as item}
			<Card {...item} />
		{/each}
	</div>
</div>
