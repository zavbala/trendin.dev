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

<div class="bg-white rounded p-2">
	<Icon src={ArrowTrendingUp} theme="outline" class="text-black w-5 {iconSize}" />
</div>
