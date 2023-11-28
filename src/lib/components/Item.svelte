<script lang="ts">
import type { Item } from '$lib/types/app';

export let item: Item;
export let className = '';
export let prefix: string | null = null;
export let showImageLoader: boolean = false;

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
				class="h-14 w-14 rounded-lg"
			/>
		{:else if !thumbnail && showImageLoader}
			<div class="h-14 w-14 animate-pulse rounded-lg bg-shark" />
		{/if}

		<div class="flex flex-col gap-y-2">
			<h1 class="break-words font-body text-xl font-bold italic sm:text-2xl">{topic}</h1>

			{#if tagline}
				<small class="break-words font-mono font-normal">{tagline}</small>
			{/if}
		</div>
	</div>

	<div
		class="flex justify-between opacity-100 transition-all duration-150 ease-out lg:opacity-0 lg:group-hover:opacity-100"
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
