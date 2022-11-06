import type { Item } from '$lib/types/app';
import { error, type LoadEvent } from '@sveltejs/kit';

export async function load({ params, fetch }: LoadEvent) {
	let items: Item[] = [];

	try {
		const resp = await fetch(`/api/services/${params?.slug}`);
		items = (await resp.json()) as Item[];
	} catch (exc) {
		throw error(404, 'Not found');
	}

	return { items, tag: params?.slug };
}
