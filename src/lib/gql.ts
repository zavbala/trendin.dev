import { Client, cacheExchange, fetchExchange } from '@urql/core';

const ProductHunt = new Client({
	url: 'https://www.producthunt.com/frontend/graphql',
	exchanges: [cacheExchange, fetchExchange],
	fetchOptions: () => {
		return {
			headers: {
				Host: 'www.producthunt.com',
				Referer: 'https://www.producthunt.com/',
				'x-requested-with': 'XMLHttpRequest'
			}
		};
	}
});

export type ClientType = keyof typeof Clients;

export const Clients = { ProductHunt };
