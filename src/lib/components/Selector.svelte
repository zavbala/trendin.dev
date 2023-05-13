<script lang="ts">
	import { ChevronDoubleDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let name: string;
	export let children: string[];
	export let value: string | undefined;

	function handleChange(event: any) {
		value = event.target.value;
		dispatch('change', value);
	}
</script>

<div class="bg-shark rounded cursor-pointer relative">
	<select {name} bind:value class="capitalize w-[170px] p-2" on:change={handleChange}>
		{#each children as child}
			<option value={child}>{child}</option>
		{/each}
	</select>

	<Icon
		theme="outline"
		src={ChevronDoubleDown}
		class="w-5 pointer-events-none absolute top-0 right-2"
	/>
</div>
