<script lang="ts">
	import Card from '$lib/components/Item.svelte';
	import type { Item } from '$lib/types/app';

	export let data: { items: Item[] };
	let size = 10;

	const nextPage = () => (size += 5);
</script>

{#each data?.items.slice(0, size) as item}
	<Card {item} />
{/each}

{#if size <= data?.items.length}
	<button on:click={nextPage} class="bg-indigo-600 rounded p-3 w-[60%] my-5 font-body font-bold">
		More
	</button>
{/if}
