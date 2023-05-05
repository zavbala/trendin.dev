<script lang="ts">
	import { afterNavigate, invalidate } from '$app/navigation';
	import Card from '$lib/components/Item.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import { SquaresPlus, ViewColumns } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import _ from 'lodash';

	import type { Item } from '$lib/types/app';

	afterNavigate(() => (size = 10));

	let size = 0;
	let current = 0;
	let view: 'grid' | 'list' = 'list';

	export let data: { items: Item[]; tag: string; tabs?: string[] };

	const nextPage = () => (size += 5);

	const newSorting = (param: string, key: number) => {
		current = key;
		invalidate(`/api/services/${data.tag}?sortBy=${param}`);
	};

	const changeView = () => (view = view === 'grid' ? 'list' : 'grid');
</script>

<svelte:head>
	<title>{_.capitalize(data.tag.split('-').join(' '))} - Trending</title>
	<meta name="description" content="" />
</svelte:head>

<div class="flex items-center justify-between w-full my-5">
	<h1 class="lg:text-lg text-sm">Showing {data.items.length} results</h1>

	<div class="flex items-center gap-x-3">
		{#if data.tabs}
			<Selector children={data.tabs} onChange={() => {}} />
		{/if}

		<button class="action md:block hidden" on:click={changeView}>
			<Icon src={view === 'grid' ? ViewColumns : SquaresPlus} theme="outline" class="w-6" />
		</button>
	</div>
</div>

<div class="{view === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'} gap-3 w-full">
	{#key data.items}
		{#each data.items.slice(0, size) as item}
			<Card {item} className={view === 'grid' ? 'col-span-1' : 'w-full'} />
		{/each}
	{/key}
</div>

{#if data.items.length}
	{#if size <= data.items.length}
		<button on:click={nextPage} class="my-5 p-2 rounded font-body text-black w-full bg-white">
			More
		</button>
	{/if}
{/if}
