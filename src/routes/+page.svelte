<script lang="ts">
import Card from '$lib/components/Card.svelte';

import type { App } from '$lib/types/app';

export let data: { apple: { apps: App[] } };
</script>

<svelte:head>
	<title>Welcome</title>
	<meta name="description" content="" />
</svelte:head>

<div class="w-full">
	<h3 class="mb-4 md:mb-7">Daily Apps / Apple</h3>

	<div class="grid gap-3 md:grid-cols-2">
		{#each data.apple.apps as item}
			<Card {...item} />
		{/each}
	</div>
</div>
