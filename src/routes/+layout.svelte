<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { page } from '$app/stores';
	import Newsletter from '$lib/components/Newsletter.svelte';
	import Sidenav from '$lib/components/Sidenav.svelte';
	import Topnav from '$lib/components/Topnav.svelte';
	import { preview, toggle } from '$lib/stores/preview';
	import { inject } from '@vercel/analytics';

	import { afterNavigate } from '$app/navigation';
	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });

	afterNavigate(() => {
		if (window.innerWidth <= 820) {
			toggle('showSidebar', false);
		}
	});

	$: pathname = $page.url.pathname;
	$: link = import.meta.env.VITE_DOMAIN + pathname;

	const title = 'Trendin - Developer Trends';
	const tagline = 'Your new start page.';

	$: {
		if (browser && window.innerWidth <= 820) {
			document.body.style.overflow = $preview.showSidebar ? 'hidden' : '';
		}
	}
</script>

<svelte:head>
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={link} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={tagline} />
	<meta property="og:image" content={import.meta.env.VITE_DOMAIN + '/banner.png'} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={link} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={tagline} />
	<meta property="twitter:image" content={import.meta.env.VITE_DOMAIN + '/banner.png'} />
</svelte:head>

<Topnav />

<main class="max-w-7xl mx-auto grid grid-cols-12 mt-5">
	{#if $preview.showSidebar}
		<Sidenav />
	{/if}

	<div class="lg:col-span-7 col-span-12 flex flex-col gap-y-3 mb-5 px-5 order-2">
		<slot />
	</div>

	<div
		class="large-sticky lg:col-span-3 col-span-12 p-5
		{$preview.direction === 'LTR' ? 'order-3' : 'order-1'}"
	>
		<div class="bg-shark w-full h-[250px] rounded-lg mx-auto shadow" />

		<Newsletter />

		<footer class="mt-7">
			<a
				target="_blank"
				rel="noreferrer noopener"
				class="mt-2 text-xs text-center"
				href="https://github.com/zavbala/trendin.dev"
			>
				Open Source
			</a>
		</footer>
	</div>
</main>
