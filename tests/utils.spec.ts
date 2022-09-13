import test, { expect } from '@playwright/test';
import { getAttrByPath } from '../src/lib/utils.js';

const set = [
	[
		{
			super: {
				nested: {
					data: {
						user: 'zavbala',
						password: 'secret'
					}
				}
			}
		},
		'super.nested.data.user',
		'zavbala'
	]
];

for (const sample of set) {
	const [schema, data, expected] = sample;

	test('get deep attribute', () => {
		const result = getAttrByPath(schema as Record<string, unknown>, data as string);
		expect(result).toStrictEqual(expected);
	});
}
