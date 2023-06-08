export interface Item {
	topic: string;
	source: string;
	tagline?: string;
	thumbnail?: string;
	__typename?: string;
	votes?: number | string;
}

export interface Props {
	icon: string;
	entry?: string;
	disabled?: boolean;
	schema: Record<string, string>;
}

export interface GQL {
	client: string;
	query: string;
	vars: Record<string, string>;
}

export interface Social extends Props {
	gql?: GQL;
	base: string;
	auth?: string[];
	token?: string[];
	selector?: string;
	options?: string[];
	args?: Record<string, string>;
	params?: Record<string, string[]>;
	sort?: 'byQueryParams' | 'byPathParams' | 'byIndex';
}

export interface App {
	name: string;
	icon: string;
	cover: string;
	source: string;
	tagline: string;
}

export interface Package extends Props {
	name: string;
	source: string;
	downloads: string;
}
