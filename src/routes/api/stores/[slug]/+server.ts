import { env } from '$env/dynamic/private';
import Stores from '$lib/data/Stores.json';
import { getAttrByPath, normalizeJSON } from '$lib/utils';
import { error, json, type RequestEvent } from '@sveltejs/kit';

import type { App } from '$lib/types/app';

export const GET = async ({ params }: RequestEvent) => {
	const { slug } = params;
	const store = Stores[slug as keyof typeof Stores];

	if (!store) throw error(404, 'Not Found');
	const args = new URLSearchParams(store.args);

	const resp = await fetch(store.base + '?' + args.toString(), {
		method: 'GET',
		headers: new Headers({
			'User-Agent': 'REST/1.0.0',
			...(store.token && { Authorization: `Bearer ${env[store.token]}` }),
			...store.headers
		})
	});

	const data = await resp.json();

	const apps = getAttrByPath(data, store.entry)
		.filter((item: never) => item['attributes']['kind'] === 'App')
		.map((item: never) => normalizeJSON(store.schema, item))
		.map((item: App) => ({
			...item,
			icon: item.icon.replace('{w}x{h}{c}.{f}', '800x800.jpg') ?? '',
			cover: item.cover.replace('{w}x{h}{c}.{f}', '1600x980.jpg') ?? ''
		}));

	return json({ apple: { apps } });
};
