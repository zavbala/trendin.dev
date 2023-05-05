import type { LoadEvent } from '@sveltejs/kit';

export async function load({ fetch }: LoadEvent) {
	const resp = await fetch(`/api/stores/apple`);
	return await resp.json();
}
