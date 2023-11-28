<script lang="ts">
import Menu from '$lib/components/Menu.svelte';
import Packages from '$lib/data/Packages.json';
import Social from '$lib/data/Social.json';
import { preview } from '$lib/stores/preview';
import { fade } from 'svelte/transition';

const Sticky = 'lg:sticky lg:top-0 lg:h-screen';
const Responsive = 'lg:static lg:col-span-2 lg:mt-0 lg:z-0';
const Style = 'top-0 fixed mt-[7vh] z-50 w-full h-[93vh] border-shark p-4 bg-woodsmoke';
</script>

<aside
	transition:fade
	class="{Responsive} {Style} {Sticky} 
	{$preview.direction === 'LTR' ? 'order-1 border-r' : 'order-3 border-l'}"
>
	<a href="/" class="{"p-2"} {$preview.direction === 'LTR' ? 'text-left' : 'text-right'}"> HOME </a>

	<Menu isOpen sub="tag" title="social" children={Social} />
	<Menu sub="pkg" title="packages" children={Packages} />
</aside>
