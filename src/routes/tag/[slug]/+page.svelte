<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Card from '$lib/components/Item.svelte';
	import type { Item } from '$lib/types/app';

	afterNavigate(() => (size = 10));

	let size = 0;
	export let data: { items: Item[]; tag: string };

	const nextPage = () => (size += 5);
</script>

<svelte:head>
	<title>{data.tag} / Trends</title>
	<meta name="description" content="" />
</svelte:head>

{#key data.items}
	{#each data.items.slice(0, size) as item}
		<Card {item} />
	{/each}
{/key}

{#if data.items.length}
	{#if size <= data.items.length}
		<button
			on:click={nextPage}
			class="bg-cornflower rounded p-3 lg:w-10/12 w-full my-5 font-body font-bold"
		>
			More
		</button>
	{/if}
{/if}
