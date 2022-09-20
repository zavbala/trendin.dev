<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Card from '$lib/components/Item.svelte';
	import type { Item } from '$lib/types/app';

	afterNavigate(() => (size = 10));

	let size = 0;
	export let data: { items: Item[] };

	const nextPage = () => (size += 5);
</script>

{#key data}
	{#each data?.items.slice(0, size) as item}
		<Card {item} />
	{/each}
{/key}

{#if size <= data?.items.length}
	<button on:click={nextPage} class="bg-indigo-600 rounded p-3 w-[60%] my-5 font-body font-bold">
		More
	</button>
{/if}
