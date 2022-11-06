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
				shark: '#242629',
				woodsmoke: '#16161a',
				cornflower: '#7F5AF0'
			}
		}
	},
	plugins: []
};
