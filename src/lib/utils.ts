/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Item } from '$lib/types/app';
import { gql } from '@urql/core';
import { readFileSync } from 'fs';
import type { HTMLElement } from 'node-html-parser';

export const normalizeHTML = (
	schema: Record<string, string>,
	node: HTMLElement,
	relative?: string | null
) => {
	const data: { [key: string]: any } = {};

	for (const [key, value] of Object.entries(schema)) {
		let computed = null;
		const tag = node.querySelector(value);

		switch (key) {
			case 'source': {
				const href = tag?.attributes['href'];
				computed = relative ? relative + href : href;
				break;
			}

			case 'thumbnail':
				computed = tag?.attributes['src'];
				break;

			default:
				computed = tag?.innerText.trim();
				break;
		}
		data[key] = computed ?? '';
	}

	return data;
};

export const normalizeJSON = (schema: Record<string, string>, item: Record<string, unknown>) => {
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

export const readSchema = (fileName: string) => {
	const path = process.env.NODE_ENV === 'production' ? '/schemas' : '/static/schemas';
	const schema = readFileSync(process.cwd() + `${path}/${fileName}.gql`, 'utf-8');
	return gql(schema);
};

export const hyphenate = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

type ParserType = keyof typeof Parser;

const Parser = { hyphenate };

export const computeProps = (props: Record<string, any>, item: Record<string, any>) => {
	const object = {} as typeof props;

	for (const [key, value] of Object.entries(props)) {
		if (value instanceof Object) {
			const [prefix, self, normalize] = value;
			const func = Parser[normalize as ParserType];

			object[key] = prefix + func(item[self] ?? '');
		} else {
			object[key] = value + item[key];
		}
	}

	return { ...item, ...object };
};
