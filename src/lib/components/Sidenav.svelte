<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import { toggle } from '$lib/stores/preview';

	import Packages from '$lib/data/Packages.json';
	import Social from '$lib/data/Social.json';

	const Responsive = 'lg:static lg:col-span-2 lg:mt-0 lg:z-0';
	const Style = 'top-0 fixed mt-[10vh] z-50 w-full h-[90vh] border-r border-shark p-4 bg-woodsmoke';

	const event = () => {
		if (window.innerWidth <= 820) {
			toggle('showSidebar', false);
		}
	};
</script>

<aside class="{Responsive} {Style}">
	<a href="/"> HOME </a>
	<Menu sub="tag" title="social" children={Social} />
	<Menu sub="pkg" title="packages" children={Packages} />
</aside>
