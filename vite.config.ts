import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

const SITE_DOMAIN = process.env.VITE_SITE_DOMAIN ?? 'pokehunt.xyz';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss()
	],
	server: {
		allowedHosts: [SITE_DOMAIN],
	},
});
