/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.no-scrollbar': {
					'overflow': 'hidden',
					'&::-webkit-scrollbar': {
						display: 'none'
					},
					'-ms-overflow-style': 'none', /* IE and Edge */
					'scrollbar-width': 'none' /* Firefox */
				}
			});
		}
	],
}

