<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { App } from '$lib/types/app';

	export let data: { apple: App[] };
</script>

<svelte:head>
	<title>Welcome</title>
	<meta name="description" content="" />
</svelte:head>

<div class="w-full">
	<h3 class="md:mb-7 mb-4">Daily Apps / Apple</h3>

	<div class="grid md:grid-cols-2 gap-3">
		{#each Object.values(data.apple) as item}
			<Card {...item} />
		{/each}
	</div>
</div>
