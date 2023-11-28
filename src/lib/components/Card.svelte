<script lang="ts">
export let name: string;
export let icon: string;
export let cover: string;
export let source: string;
export let tagline: string;
</script>

<article class="flex flex-col justify-between rounded-lg bg-shark shadow">
	{#if cover}
		<img src={cover} alt="Cover" loading="lazy" class="rounded-t-lg" on:dragstart|preventDefault />
	{:else}
		<div class="w-full grow rounded-t-lg bg-shark" />
	{/if}

	<div class="flex items-center justify-between p-4">
		<div class="flex items-center gap-x-3">
			<img
				src={icon}
				alt="Icon"
				loading="lazy"
				class="h-10 w-10 rounded-md"
				on:dragstart|preventDefault
			/>

			<div class="flex flex-col">
				<small> {name} </small>

				{#if tagline}
					<small> {tagline.slice(0, 27)} ... </small>
				{/if}
			</div>
		</div>

		<a href={source} target="_blank" rel="noreferrer noopener" class="pill uppercase"> VIEW </a>
	</div>
</article>
