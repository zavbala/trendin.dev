<script lang="ts">
	import { browser } from '$app/environment';
	import { preview, toggle } from '$lib/stores/preview';
	import { ArrowsRightLeft, Bars2, XMark } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	$: actions = {
		showSidebar: $preview.showSidebar ? false : true,
		theme: $preview.theme === 'dark' ? 'light' : 'dark',
		direction: $preview.direction === 'LTR' ? 'RLT' : 'LTR'
	};

	const event = (key: keyof typeof actions) => toggle(key, actions[key]);

	$: if ($preview.theme) {
		if (browser) {
			document.documentElement.setAttribute('data-theme', $preview.theme);
		}
	}
</script>

<nav class="md:h-[7vh] w-full z-20 bg-woodsmoke border-b border-shark">
	<div class="max-w-7xl h-full mx-auto flex-center justify-between p-3">
		<div class="lg:block hidden" />

		<button class="p-3 lg:hidden block" on:click={() => event('showSidebar')}>
			<Icon src={$preview.showSidebar ? XMark : Bars2} theme="outline" class="w-7 sm:block" />
		</button>

		<div class="flex gap-x-3">
			<button
				type="button"
				class="action lg:flex hidden"
				on:click={() => toggle('direction', actions.direction)}
			>
				<Icon src={ArrowsRightLeft} theme="outline" class="w-6" />
			</button>
		</div>
	</div>
</nav>
