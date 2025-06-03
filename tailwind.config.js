import DaisyUI from 'daisyui';
import TailwindAnimated from 'tailwindcss-animated';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			colors: {
				primary: '#FE0000',
				secondary: '#202020',
				tertiary: '#1B222B',
				tertiary_light: '#242B34',
			},
		},
	},
	plugins: [DaisyUI, TailwindAnimated],
};
