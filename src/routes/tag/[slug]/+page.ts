import type { Item } from '$lib/types/app';
import { error, type LoadEvent } from '@sveltejs/kit';

export async function load({ params, fetch, url }: LoadEvent) {
	const { slug } = params;
	const { searchParams } = new URL(url);
	const sortBy = searchParams.get('sortBy');

	const API = `/api/services/${slug}?sortBy=${sortBy}`;

	try {
		const resp = await fetch(API);
		return { tag: slug, ...((await resp.json()) as Item[]) };
	} catch (exc) {
		throw error(404, 'Not found');
	}
}
