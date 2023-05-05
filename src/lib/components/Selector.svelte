<script lang="ts">
	import { ChevronDoubleDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let children: string[];
	export let onChange: () => void = () => {};
</script>

<div class="bg-shark rounded p-2 flex gap-x-3 items-center cursor-pointer">
	<select class="capitalize w-11/12" on:change={onChange}>
		{#each children as child}
			<option value={child}>{child}</option>
		{/each}
	</select>

	<Icon src={ChevronDoubleDown} theme="outline" class="w-5 pointer-events-none" />
</div>
