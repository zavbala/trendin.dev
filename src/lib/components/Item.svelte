<script lang="ts">
	import type { Item } from '$lib/types/app';

	export let item: Item;
	export let className = '';
	export let prefix: string | null = null;

	const { tagline, topic, thumbnail, source, votes } = item;
</script>

<a
	target="_blank"
	class="card group {className}"
	rel="noreferrer noopener"
	href={prefix ? prefix + source : source}
>
	<div class="flex items-center gap-x-4">
		{#if thumbnail}
			<img
				alt="Thumbnail"
				src={thumbnail}
				on:dragstart|preventDefault
				class="w-14 h-14 rounded-lg"
			/>
		{/if}

		<div class="flex flex-col gap-y-2">
			<h1 class="sm:text-2xl text-xl font-body italic font-bold break-words">{topic}</h1>

			{#if tagline}
				<small class="font-mono font-normal break-words">{tagline}</small>
			{/if}
		</div>
	</div>

	<div
		class="flex justify-between opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-150 ease-out"
	>
		<div />

		{#if votes}
			<div class="pill flex items-center">
				<span> ↑ </span>
				<span class="text-xs"> {votes} </span>
			</div>
		{/if}
	</div>
</a>
