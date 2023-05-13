<script lang="ts">
	import { page } from '$app/stores';
	import type { Props } from '$lib/types/app';
	import { ArrowDown, ArrowUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let sub: string;
	export let title: string;
	export let children: Record<string, Partial<Props>>;

	let isOpen = true;
	$: pathname = $page.url.pathname;

	const toggleView = () => (isOpen = !isOpen);
	const disabledClasses = 'text-white/40 pointer-events-none';
</script>

<button class="uppercase my-5 flex items-center justify-between w-full" on:click={toggleView}>
	<span>{title}</span>
	<Icon src={isOpen ? ArrowUp : ArrowDown} class="w-3" />
</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if isOpen}
	<ul class="flex flex-col gap-y-1 ml-3">
		{#each Object.entries(children) as [key, values]}
			<a
				href={`/${sub}/${key}`}
				class="font-mono text-sm rounded uppercase hover:bg-shark p-2
				{values.disabled && disabledClasses}
            {pathname.includes(key) && 'border-white/60 border'}"
			>
				<i class="fa-brands {values?.icon}" />
				{key.split('-').join(' ').toLowerCase()}
			</a>
		{/each}
	</ul>
{/if}
