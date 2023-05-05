<script lang="ts">
	import type { Item } from '$lib/types/app';

	export let item: Item;
	export let className: string = '';

	const { tagline, topic, thumbnail, source, votes } = item;
</script>

<a href="source" target="_blank" rel="noreferrer" class="card {className}">
	<div class="flex items-center gap-x-4">
		{#if thumbnail}
			<img
				alt="Thumbnail"
				src={thumbnail}
				class="w-14 h-14 rounded-lg"
				on:dragstart|preventDefault
			/>
		{/if}

		<div class="flex flex-col gap-y-2">
			<h1 class="sm:text-2xl text-xl font-body italic font-bold break-words">{topic}</h1>

			{#if tagline}
				<small class="font-mono font-normal break-words">{tagline}</small>
			{/if}
		</div>
	</div>

	<span class="border border-white/10 my-4" />

	<div class="flex justify-between">
		<div />

		{#if votes}
			<div class="pill flex items-center">
				<span> ↑ </span>
				<span class="text-xs"> {votes} </span>
			</div>
		{/if}
	</div>
</a>
