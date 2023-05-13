<script lang="ts">
	import Selector from '$lib/components/Selector.svelte';
	import type { Package } from '$lib/types/app';

	export let data: { pkg: string; items: Package[] };
</script>

<div class="flex justify-between my-5 sticky top-0">
	<span />
	<Selector name="filter" value="" on:change children={['Init']} />
</div>

<table class="w-full text-sm">
	<tr>
		<th />
		<th />
		<th />
	</tr>

	{#each data?.items as item, index}
		<tr class="border border-white/40 hover:bg-white/10">
			<td class="px-5">{index + 1}</td>
			<td class="p-2">{item.name}</td>
			<td> {item.downloads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </td>
		</tr>
	{/each}
</table>
