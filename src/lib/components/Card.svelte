<script lang="ts">
	export let name: string;
	export let icon: string;
	export let cover: string;
	export let tagline: string;
	export let headline: string;
	export let source: string;
</script>

<article class="bg-shark rounded-lg shadow">
	<img src={cover} alt="Cover" class="rounded-t-lg" on:dragstart|preventDefault />

	<!-- {#if headline}
		<h1 class="absolute font-bold uppercase text-3xl text-white">{headline}</h1>
	{/if} -->

	<div class="flex items-center justify-between p-4">
		<div class="flex items-center gap-x-3">
			<img src={icon} alt="Icon" class="w-10 h-10 rounded-md" on:dragstart|preventDefault />

			<div class="flex flex-col">
				<small> {name} </small>
				<small> {tagline.slice(0, 27)} ... </small>
			</div>
		</div>

		<a href={source} target="_blank" rel="noreferrer" class="uppercase pill"> VIEW </a>
	</div>
</article>
