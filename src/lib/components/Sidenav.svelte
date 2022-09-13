<script lang="ts">
	import { page } from '$app/stores';
	import Services from '$lib/data/Services.json';

	$: pathname = $page.url.pathname;
	$: classes = `p-2 mb-1 font-mono ${pathname === '/' && 'bg-indigo-600'}`;
</script>

<aside class="sm:col-span-2 col-span-12 flex-col p-3">
	<header>
		<a href="/" class={classes}> HOME </a>
		{#each Object.entries(Services) as [key]}
			<a
				href={`/tag/${key}`}
				class="p-2 mb-1 font-mono {pathname.includes(key) && 'bg-indigo-600'}"
			>
				{key}
			</a>
		{/each}
	</header>
</aside>
