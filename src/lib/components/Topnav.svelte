<script lang="ts">
	import App from '$lib/components/Logo.svelte';
	import { preview, toggle } from '$lib/stores/preview';
	import { Bars3 } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	$: actions = {
		showSidebar: $preview.showSidebar ? false : true,
		theme: $preview.theme === 'dark' ? 'light' : 'dark',
		direction: $preview.direction === 'LTR' ? 'RLT' : 'LTR'
	};

	const event = (key: keyof typeof actions) => toggle(key, actions[key]);
</script>

<nav class="h-[10vh] w-full border border-charade sticky top-0 z-20 bg-bunker">
	<div class="max-w-7xl h-full mx-auto flex items-center justify-between p-3">
		<div class="flex gap-x-3">
			<button class="p-3 hover:bg-gray-900" on:click={() => event('showSidebar')}>
				<Icon src={Bars3} theme="outline" class="w-7 sm:block" />
			</button>
		</div>
		<App />
		<div />
	</div>
</nav>
