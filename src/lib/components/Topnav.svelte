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

<nav class="z-20 w-full border-b border-shark bg-woodsmoke md:h-[7vh]">
	<div class="flex-center mx-auto h-full max-w-7xl justify-between p-3">
		<h1 class="hidden lg:block">t.dev</h1>

		<button
			aria-label="Toggle Sidebar"
			class="block p-3 lg:hidden"
			on:click={() => event('showSidebar')}
		>
			<Icon src={$preview.showSidebar ? XMark : Bars2} theme="outline" class="w-7 sm:block" />
		</button>

		<div class="flex gap-x-3">
			<button
				type="button"
				title="Toggle Direction"
				aria-label="Toggle Direction"
				class="action hidden lg:flex"
				on:click={() => toggle('direction', actions.direction)}
			>
				<Icon src={ArrowsRightLeft} theme="outline" class="w-6" />
			</button>
		</div>
	</div>
</nav>
