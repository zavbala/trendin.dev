<script lang="ts">
import Selector from '$lib/components/Selector.svelte';
import { PACKAGE_MANAGER } from '$lib/constant';
import type { Package } from '$lib/types/app';
import _ from 'lodash';

export let data: { pkg: keyof typeof PACKAGE_MANAGER; items: Package[] };
</script>

<svelte:head>
	<title>{_.capitalize(data.pkg.split('-').join(' '))} - Analytics</title>

	<meta
		name="description"
		content={`Get analytics of ${data.pkg.split('-').join(' ')} package manager. Find out what's hot and what's not in the ${data.pkg.split('-').join(' ')} ${PACKAGE_MANAGER[data.pkg ]}, all the data fresh at your fingertips. ${new Date().getFullYear()}`}
	/>
</svelte:head>

<div class="sticky top-0 my-5 flex justify-between">
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
