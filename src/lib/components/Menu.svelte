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
const Style = 'font-mono text-sm rounded uppercase hover:bg-shark p-2 flex items-center gap-x-3';

const toggleView = () => (isOpen = !isOpen);
</script>

<button class="my-5 flex w-full items-center justify-between uppercase" on:click={toggleView}>
	<span class={$preview.direction === 'LTR' ? 'order-1' : 'order-2'}>{title}</span>

	<Icon
		src={isOpen ? ArrowUp : ArrowDown}
		class="w-3 {$preview.direction === 'LTR' ? 'order-2' : 'order-1'}"
	/>
</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if isOpen}
	<ul transition:slide class="ml-3 flex flex-col gap-y-3">
		{#each Object.entries(children) as [key, values]}
			<li>
				<a
					href={`/${sub}/${key}`}
					class="{Style}
				{values.disabled && disabledClasses}
            	{pathname.includes(key) && 'border border-white/60'}
				{$preview.direction === 'LTR' ? 'justify-start' : 'justify-end'}"
				>
					<!-- <i
					class="fa-brands {values?.icon} {$preview.direction === 'LTR' ? 'order-1' : 'order-2'}"
				/> -->

					{@html values?.icon}

					<span class={$preview.direction === 'LTR' ? 'order-2' : 'order-1'}>
						{key.split('-').join(' ').toLowerCase()}
					</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}
