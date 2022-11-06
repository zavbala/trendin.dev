<script lang="ts">
	import { page } from '$app/stores';
	import Services from '$lib/data/Services.json';
	import { toggle } from '$lib/stores/preview';
	import type { Services as iServices } from '$lib/types/app';

	$: pathname = $page.url.pathname;
	const responsive = 'lg:static lg:col-span-2 lg:mt-0 lg:z-0';

	const items: iServices = {
		HOME: { path: '/' },
		...Services
	};

	const event = () => {
		if (window.innerWidth <= 820) {
			toggle('showSidebar', false);
		}
	};
</script>

<aside class="{responsive} p-3 top-0 fixed mt-[10vh] z-50 w-full bg-woodsmoke h-[90vh]">
	<ul class="flex flex-col gap-y-3 lg:p-0 p-3">
		{#each Object.entries(items) as [key, values]}
			<a
				on:click={event}
				href={key === 'HOME' ? '/' : `/tag/${key}`}
				class="p-2 mb-1 font-mono rounded {(pathname.includes(key) || pathname === values?.path) &&
					'bg-cornflower font-body'}"
			>
				{key}
			</a>
		{/each}
	</ul>
</aside>
