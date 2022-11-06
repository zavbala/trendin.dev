/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Item } from '$lib/types/app';

export const normalizeHTML = (schema: Item, node: unknown, relative?: string | null) => {
	const data: Partial<Item> = {};

	for (const [key, value] of Object.entries(schema)) {
		let computed = null;
		const tag = (node as HTMLElement).querySelector(value);

		switch (key) {
			case 'source': {
				const href = tag.attributes['href'];
				computed = relative ? relative + href : href;
				break;
			}

			case 'thumbnail':
				computed = tag.attributes['src'];
				break;

			default:
				computed = tag?.innerText.trim();
				break;
		}
		data[key as keyof Item] = computed ?? '';
	}

	return data;
};

export const normalizeJSON = (schema: Item, item: Record<string, unknown>) => {
	const data: Partial<Item> = {};

	for (const [key, value] of Object.entries(schema)) {
		let computed = null;

		if (value.split('.').length >= 2) {
			computed = getAttrByPath(item, value);
		} else {
			computed = item[value];
		}

		data[key as keyof Item] = (computed as any) ?? '';
	}

	return data;
};

export const getAttrByPath = (obj: Record<string, any>, path: string) =>
	path.split('.').reduce((prev, current) => prev[current], obj);
