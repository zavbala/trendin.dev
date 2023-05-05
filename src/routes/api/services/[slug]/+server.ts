import { env } from '$env/dynamic/private';
import Social from '$lib/data/Social.json';
import { getAttrByPath, normalizeHTML, normalizeJSON } from '$lib/utils';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import { parse } from 'node-html-parser';

import type { Social as iSocial } from '$lib/types/app';

const DOMAINS = ['www.indiehackers.com', 'github.com', 'marketplace.visualstudio.com'];

export const GET = async ({ params, url }: RequestEvent) => {
	const { slug } = params;
	const service = Social[slug as keyof typeof Social] as iSocial;

	if (!service) throw error(404, 'Not Found');
	const { schema, base, ...props } = service;

	const { searchParams } = new URL(url);
	const sortBy = searchParams.get('sortBy');
	const withArgs = 'args' in props;

	let fetchURL = base;
	if (withArgs) fetchURL += `?${new URLSearchParams(props.args).toString()}`;

	if (sortBy && service.options?.includes(sortBy)) {
		if (service.sort === 'byQueryParams') {
			fetchURL += `?sortBy=${sortBy}`;
		} else if (service.sort === 'byPathParams') {
			fetchURL += `/${sortBy}`;
		}
	}

	let items = [];
	const byRESTService = !('selector' in props);

	const { origin, hostname } = new URL(base);
	const blacklist = DOMAINS.includes(hostname);

	const resp = await fetch(fetchURL, {
		method: 'GET',
		headers: new Headers({
			'User-Agent': 'REST/1.0.0',
			...(byRESTService &&
				props.token?.length &&
				(() => {
					const [prefix, token] = props.token as string[];
					return { Authorization: prefix + ' ' + env[token] };
				})())
		})
	});

	if (byRESTService) {
		const data = await resp.json();
		items = getAttrByPath(data, props.entry as string).map((data: Record<string, unknown>) =>
			normalizeJSON(schema, data)
		);
	} else {
		const root = parse(await resp.text());
		items = root
			.querySelectorAll(props.selector as string)
			.map((node) => normalizeHTML(schema, node, blacklist ? origin : null));
	}

	return json({ items, tabs: service.options });
};
