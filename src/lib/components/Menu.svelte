<script lang="ts">
import { page } from '$app/stores';
import { preview } from '$lib/stores/preview';
import { ArrowDown, ArrowUp } from '@steeze-ui/heroicons';
import { Icon } from '@steeze-ui/svelte-icon';
import { slide } from 'svelte/transition';

export let sub: string;
export let title: string;
export let isOpen: boolean = false;
export let children: Record<string, any>;

$: pathname = $page.url.pathname;

const disabledClasses = 'text-white/40 pointer-events-none';
const Style = 'font-mono text-sm rounded uppercase lg:hover:bg-shark p-2 flex items-center gap-x-3';

const toggleView = () => (isOpen = !isOpen);
</script>

<button
	on:click={toggleView}
	class="my-2 flex w-full items-center justify-between p-2 uppercase lg:hover:bg-shark"
>
	<span class={$preview.direction === 'LTR' ? 'order-1' : 'order-2'}>{title}</span>

	<Icon
		src={isOpen ? ArrowUp : ArrowDown}
		class="w-3 {$preview.direction === 'LTR' ? 'order-2' : 'order-1'}"
	/>
</button>

{#if isOpen}
	<ul transition:slide class="ml-5 flex flex-col gap-y-3">
		{#each Object.entries(children) as [key, values]}
			<li>
				<a
					href={`/${sub}/${key}`}
					class="{Style}
				{values.disabled && disabledClasses}
            	{pathname.includes(key) && 'bg-shark'}
				{$preview.direction === 'LTR' ? 'justify-start' : 'justify-end'}"
				>
					{@html values?.icon}

					<span class={$preview.direction === 'LTR' ? 'order-2' : 'order-1'}>
						{key.split('-').join(' ').toLowerCase()}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}
