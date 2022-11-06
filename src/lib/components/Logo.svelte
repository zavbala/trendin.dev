<script lang="ts">
	import { ArrowTrendingUp } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let size: 'sm' | 'md' | 'lg' = 'sm';

	const iconSize = {
		sm: 'w-10',
		md: '',
		lg: ''
	}[size];

	const titleSize = {
		sm: 'text-2xl',
		md: '',
		lg: ''
	}[size];
</script>

<div class="flex items-center gap-x-1">
	<h2 class="uppercase font-body font-bold {titleSize}"> {import.meta.env.VITE_APP_NAME} </h2>
	<Icon src={ArrowTrendingUp} theme="outline" class="text-white {iconSize}" />
</div>
