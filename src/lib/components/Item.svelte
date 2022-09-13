<script lang="ts">
	import type { Item } from '$lib/types/app';
	import { HandThumbUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let item: Item;
	const { source, tagline, topic, thumbnail, votes } = item;

	const openTab = (link: string) => window.open(link, '_blank');
	const animation = 'transform hover:-translate-y-1 duration-100';
</script>

<article
	on:click={() => openTab(source)}
	class="p-5 w-[85%] mx-auto shadow rounded bg-shark {animation} flex justify-between cursor-pointer"
>
	<div class="{votes ? 'w-[70%]' : 'w-full'} flex flex-col gap-y-2">
		{#if thumbnail}
			<img alt="Thumbnail" src={thumbnail} class="w-14 rounded-lg" on:dragstart|preventDefault />
		{/if}

		<div>
			<h1 class="sm:text-2xl text-xl font-body italic font-bold">{topic}</h1>
			{#if tagline}
				<small class="font-mono font-normal">{tagline}</small>
			{/if}
		</div>
	</div>

	{#if votes}
		<div class="bg-green-700/60 text-green-400 rounded p-3 w-14 h-18 flex flex-col items-center">
			<Icon src={HandThumbUp} class="w-5" />
			<span class="font-bold font-body">{votes}</span>
		</div>
	{/if}
</article>
