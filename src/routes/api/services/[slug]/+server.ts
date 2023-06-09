import { env } from '$env/dynamic/private';
import { Clients, type ClientType } from '$lib/gql';
import { computeProps, getAttrByPath, normalizeHTML, normalizeJSON, readSchema } from '$lib/utils';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import { parse } from 'node-html-parser';

import type { GQL, Social as iSocial, Item } from '$lib/types/app';

import Social from '$lib/data/Social.json';

const DOMAINS = ['www.indiehackers.com', 'github.com', 'marketplace.visualstudio.com'];

export const GET = async ({ params, url }: RequestEvent) => {
	const { slug } = params;
	const service = Social[slug as keyof typeof Social] as iSocial;

	if (!service) throw error(404, 'Not Found');
	const { schema, base, ...props } = service;

	if ('gql' in props) {
		const { client, query: fileName, vars } = service?.gql as GQL;

		const query = await readSchema(fileName);
		const response = await Clients[client as ClientType].query(query, vars);

		// TODO: Verify why on client side PH is throwing ADS
		const items = getAttrByPath(response.data, props.entry as string)
			.filter((item: Item) => item['__typename'] === 'Post')
			.map((item: Item) => computeProps(schema, item));

		return json({ items, tabs: [] });
	}

	const { searchParams } = new URL(url);
	const sortBy = searchParams.get('sortBy');
	const withArgs = 'args' in props;

	let fetchURL = base;
	if (withArgs) fetchURL += `?${new URLSearchParams(props.args).toString()}`;

	if (sortBy && service.options?.includes(sortBy)) {
		if (service.sort === 'byQueryParams') {
			fetchURL += `?sortBy=${sortBy}`;
		}

		if (service.sort === 'byPathParams') {
			fetchURL += `/${sortBy}`;
		}

		// TODO: Adapt each social service to this format, currently only working with vscode
		if (service.sort === 'byIndex') {
			const [st, , rd] = (props.entry as string).split('.');
			const index = props.options?.indexOf(sortBy) ?? 2;

			props.entry = `${st}.${index}.${rd}`;
		}
	}

	let items = [];
	const byRESTService = !('selector' in props);

	const { origin, hostname } = new URL(base);
	const blacklist = DOMAINS.includes(hostname);

	const resp = await fetch(fetchURL, {
		method: 'GET',
		headers: new Headers({
			'User-Agent': 'trendin.dev/1.0',
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
