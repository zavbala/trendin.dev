<script lang="ts">
	import { page } from '$app/stores';
	import { preview } from '$lib/stores/preview';
	import { ArrowDown, ArrowUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	import type { Props } from '$lib/types/app';

	export let sub: string;
	export let title: string;
	export let children: Record<string, Partial<Props>>;

	let isOpen = true;
	$: pathname = $page.url.pathname;

	const disabledClasses = 'text-white/40 pointer-events-none';
	const Style = 'font-mono text-sm rounded uppercase hover:bg-shark p-2 flex items-center gap-x-3';

	const toggleView = () => (isOpen = !isOpen);
</script>

<button class="uppercase my-5 flex items-center justify-between w-full" on:click={toggleView}>
	<span class={$preview.direction === 'LTR' ? 'order-1' : 'order-2'}>{title}</span>

	<Icon
		src={isOpen ? ArrowUp : ArrowDown}
		class="w-3 {$preview.direction === 'LTR' ? 'order-2' : 'order-1'}"
	/>
</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if isOpen}
	<ul class="flex flex-col gap-y-3 ml-3">
		{#each Object.entries(children) as [key, values]}
			<a
				href={`/${sub}/${key}`}
				class="{Style}
				{values.disabled && disabledClasses}
            	{pathname.includes(key) && 'border-white/60 border'}
				{$preview.direction === 'LTR' ? 'justify-start' : 'justify-end'}"
			>
				<i
					class="fa-brands {values?.icon} {$preview.direction === 'LTR' ? 'order-1' : 'order-2'}"
				/>

				<span class={$preview.direction === 'LTR' ? 'order-2' : 'order-1'}>
					{key.split('-').join(' ').toLowerCase()}
				</span>
			</a>
		{/each}
	</ul>
{/if}
