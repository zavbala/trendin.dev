<script lang="ts">
	import App from '$lib/components/Logo.svelte';
	import { preview, toggle } from '$lib/stores/preview';
	import { Bars2, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	$: actions = {
		showSidebar: $preview.showSidebar ? false : true,
		theme: $preview.theme === 'dark' ? 'light' : 'dark',
		direction: $preview.direction === 'LTR' ? 'RLT' : 'LTR'
	};

	const event = (key: keyof typeof actions) => toggle(key, actions[key]);
</script>

<nav class="h-[10vh] w-full sticky top-0 z-20 bg-woodsmoke">
	<div class="max-w-7xl h-full mx-auto flex-center justify-between p-3">
		<div class="hidden lg:block" />

		<button class="p-3 lg:hidden block" on:click={() => event('showSidebar')}>
			<Icon src={$preview.showSidebar ? XMark : Bars2} theme="outline" class="w-7 sm:block" />
		</button>

		<App />

		<div />
	</div>
</nav>
