<script lang="ts">
	import type { Item } from '$lib/types/app';

	export let item: Item;
	const { tagline, topic, thumbnail, source } = item;
</script>

<a
	href={source}
	target="_blank"
	rel="noreferrer"
	class="animation select-none cursor-pointer relative p-5 lg:w-10/12 w-full mx-auto shadow rounded bg-shark"
>
	<div class="flex gap-x-4">
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
</a>
