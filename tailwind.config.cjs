/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			body: ['IBM Plex Sans', 'sans-serif'],
			mono: ['IBM Plex Mono', 'monospace']
		},
		extend: {
			colors: {
				shark: '#1c1f26',
				charade: '#2b3039',
				bunker: '#0e1217'
			}
		}
	},
	plugins: []
};
