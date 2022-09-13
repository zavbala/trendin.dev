<script lang="ts">
	export let color: 'green' | 'orange' | 'yellow' = 'green';
	export let value: number | string = '';

	const palette = {
		green: ['bg-green-700/60', 'text-green-400'],
		orange: ['bg-orange-700/60', 'text-orange-400'],
		yellow: ['bg-yellow-700/60', 'text-yellow-400']
	}[color];
</script>

<div class="{palette.join(' ')} flex items-center justify-around rounded-full w-24">
	<span class="text-center font-mono"> {value} </span>
</div>
