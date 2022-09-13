import { env } from '$env/dynamic/private';
import Services from '$lib/data/Services.json';
import type { Service } from '$lib/types/app';
import { normalizeHTML, normalizeJSON } from '$lib/utils';
import { error, type RequestEvent } from '@sveltejs/kit';
import { parse } from 'node-html-parser';

export const GET = async ({ params, setHeaders }: RequestEvent) => {
	const { slug } = params;
	const { schema, base, ...props } = Services[slug as keyof typeof Services] as Service;

	let items = [];
	const hasREST = !('selector' in props);
	if (!props) throw error(404, 'Not Found');

	const { origin, hostname } = new URL(base);
	const blacklist = ['www.indiehackers.com', 'github.com'].includes(hostname);

	const resp = await fetch(base, {
		method: 'GET',
		headers: new Headers({
			'User-Agent': 'REST/1.0.0',
			...(hasREST &&
				(() => {
					const [prefix, token] = props.token;
					return { Authorization: prefix + ' ' + env[token] };
				})())
		})
	});

	if (hasREST) {
		const data = await resp.json();
		items = (data[props.entry as string] as Record<string, unknown>[]).map((data) =>
			normalizeJSON(schema, data)
		);
	} else {
		const root = parse(await resp.text());
		items = root
			.querySelectorAll(props.selector as string)
			.map((node) => normalizeHTML(schema, node, blacklist ? origin : ''));
	}

	setHeaders({
		'Content-Type': 'application/json'
	});

	const json = JSON.stringify(items);
	return new Response(json);
};
