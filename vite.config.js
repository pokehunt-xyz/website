import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_DOMAIN = process.env.VITE_SITE_DOMAIN ?? 'pokehunt.xyz';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		allowedHosts: [SITE_DOMAIN],
	},
});
