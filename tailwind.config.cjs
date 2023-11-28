/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			mono: ['IBM Plex Mono', 'monospace'],
			body: ['IBM Plex Sans', 'sans-serif']
		},
		extend: {
			colors: {
				shark: '#1b1d1f',
				woodsmoke: '#0f1113'
			}
		}
	},
	plugins: []
};
