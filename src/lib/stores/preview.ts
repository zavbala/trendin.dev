import { writable } from 'svelte/store';

const stored = {
	theme: 'dark',
	direction: 'LTR',
	showSidebar: true
};

export const preview = writable(stored);

export const toggle = (key: keyof typeof stored, value: unknown) => {
	preview.update((state) => ({ ...state, [key]: value }));
};
