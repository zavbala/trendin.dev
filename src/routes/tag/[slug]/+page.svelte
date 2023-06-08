<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Card from '$lib/components/Item.svelte';
	import Selector from '$lib/components/Selector.svelte';
	import { REST_SERVICE } from '$lib/constant';
	import { SquaresPlus, ViewColumns } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import _ from 'lodash';

	import type { Item } from '$lib/types/app';

	let view: 'grid' | 'list' = 'list';
	let current: string | undefined = '';

	afterNavigate(() => (current = data?.tabs?.[0]));

	export let data: { items: Item[]; tag: string; tabs?: string[] };

	const newSorting = async (event: any) => {
		const res = await fetch(`${REST_SERVICE}/services/${data.tag}?sortBy=${event.detail}`);
		data.items = (await res.json()).items;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const changeView = () => (view = view === 'grid' ? 'list' : 'grid');
</script>

<svelte:head>
	<title>{_.capitalize(data.tag.split('-').join(' '))} - Trending</title>
	<meta name="description" content="" />
</svelte:head>

<div class="flex items-center justify-between w-full sticky top-0 z-20 bg-woodsmoke h-[10vh]">
	<h1 class="lg:text-lg text-sm">Showing {data.items.length} results</h1>

	<div class="flex items-center gap-x-3">
		{#if data.tabs?.length}
			<Selector name="sortBy" children={data.tabs} on:change={newSorting} bind:value={current} />
		{/if}

		<button class="action md:block hidden" on:click={changeView}>
			<Icon src={view === 'grid' ? ViewColumns : SquaresPlus} theme="outline" class="w-6" />
		</button>
	</div>
</div>

<div class="{view === 'grid' ? 'grid grid-cols-2' : 'flex flex-col'} gap-3 w-full">
	{#key data.items}
		{#each data.items as item}
			<Card
				{item}
				className={view === 'grid' ? 'col-span-1' : 'w-full'}
				prefix={data.tag === 'vscode' ? 'https://marketplace.visualstudio.com/' : null}
			/>
		{/each}
	{/key}
</div>
