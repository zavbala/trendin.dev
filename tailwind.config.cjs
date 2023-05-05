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
				shark: '#1b1d1f',
				woodsmoke: '#0f1113'
			}
		}
	},
	plugins: []
};
