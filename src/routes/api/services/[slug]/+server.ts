import { env } from '$env/dynamic/private';
import Services from '$lib/data/Services.json';
import type { Service } from '$lib/types/app';
import { normalizeHTML, normalizeJSON } from '$lib/utils';
import { error, type RequestEvent } from '@sveltejs/kit';
import { parse } from 'node-html-parser';

export const GET = async ({ params, setHeaders }: RequestEvent) => {
	const { slug } = params;
	const service = Services[slug as keyof typeof Services] as Service;

	if (!service) throw error(404, 'Not Found');
	const { schema, base, ...props } = service;

	let items = [];
	const byRESTService = !('selector' in props);

	const { origin, hostname } = new URL(base);
	const blacklist = ['www.indiehackers.com', 'github.com'].includes(hostname);

	const resp = await fetch(base, {
		method: 'GET',
		headers: new Headers({
			'User-Agent': 'REST/1.0.0',
			...(byRESTService &&
				(() => {
					const [prefix, token] = props.token;
					return { Authorization: prefix + ' ' + env[token] };
				})())
		})
	});

	if (byRESTService) {
		const data = await resp.json();
		items = (data[props.entry as string] as Record<string, unknown>[]).map((data) =>
			normalizeJSON(schema, data)
		);
	} else {
		const root = parse(await resp.text());
		items = root
			.querySelectorAll(props.selector as string)
			.map((node) => normalizeHTML(schema, node, blacklist ? origin : null));
	}

	setHeaders({ 'Content-Type': 'application/json' });

	const json = JSON.stringify(items);
	return new Response(json);
};
