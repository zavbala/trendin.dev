<script lang="ts">
import { SUBSCRIBE_URL } from '$lib/mailchimp';
import { PaperAirplane } from '@steeze-ui/heroicons';
import { Icon } from '@steeze-ui/svelte-icon';
</script>

<h3 class="my-3">Subscribe to our newsletter</h3>

<form id="newsletter" class="my-3 flex gap-x-2" action={SUBSCRIBE_URL} method="POST">
	<input
		disabled
		required
		id="MERGE0"
		type="email"
		name="MERGE0"
		placeholder="foo@bar.com"
		class="font-regular h-10 grow rounded bg-shark px-4 py-2 font-mono"
	/>

	<button
		disabled
		type="submit"
		aria-label="Subscribe"
		class="flex-center h-10 w-10 rounded bg-white px-2 py-2"
	>
		<Icon class="h-4 w-4 text-black" src={PaperAirplane} />
	</button>
</form>
