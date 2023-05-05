<script lang="ts">
	import { SUBSCRIBE_URL } from '$lib/mailchimp';
	import { PaperAirplane } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<h3 class="my-3">Subscribe to our newsletter</h3>

<form id="newsletter" class="flex gap-x-2 my-3" action={SUBSCRIBE_URL} method="POST">
	<input
		required
		id="MERGE0"
		type="email"
		name="MERGE0"
		placeholder="foo@bar.com"
		class="bg-shark px-4 py-2 rounded grow font-mono font-regular h-10"
	/>
	<button type="submit" class="bg-white w-10 h-10 flex-center px-2 py-2 rounded">
		<Icon class="w-4 h-4 text-black" src={PaperAirplane} />
	</button>
</form>
