import Packages from '$lib/data/Packages.json';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import { normalizeJSON } from '$lib/utils';
import type { Package } from '$lib/types/app';

export const GET = async ({ params }: RequestEvent) => {
	const { slug } = params;
	const pkg = Packages[slug as keyof typeof Packages] as Package;
	if (!pkg) throw error(404, 'Not Found');

	const resp = await fetch(pkg.source);
	const data = await resp.json();

	const items = data[pkg.entry as string]
		.slice(0, 10)
		.map((item: Record<string, unknown>) => normalizeJSON(pkg.schema, item));

	return json(items);
};
