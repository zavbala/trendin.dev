<script lang="ts">
export let name: string;
export let icon: string;
export let cover: string;
export let source: string;
export let tagline: string;
</script>

<article class="rounded-lg bg-shark shadow">
	{#if cover}
		<img loading="lazy" src={cover} alt="Cover" class="rounded-t-lg" on:dragstart|preventDefault />
	{/if}

	<div class="flex items-center justify-between p-4">
		<div class="flex items-center gap-x-3">
			<img src={icon} alt="Icon" class="h-10 w-10 rounded-md" on:dragstart|preventDefault />

			<div class="flex flex-col">
				<small> {name} </small>
				<small> {tagline.slice(0, 27)} ... </small>
			</div>
		</div>

		<a href={source} target="_blank" rel="noreferrer noopener" class="pill uppercase"> VIEW </a>
	</div>
</article>
