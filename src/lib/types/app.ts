export interface Item {
	topic: string;
	tagline: string;
	thumbnail?: string;
	votes?: number;
	source: string;
}

export interface Service {
	base: string;
	schema: Item;
	auth: string[];
	selector?: string;
	entry?: string;
	params?: Record<string, string[]>;
	token: ['Bearer' | string, string];
}
