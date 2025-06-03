import { createContext } from 'react';

// If you want to change the API url, you have to (re)build the Docker container with the env variable set.
const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.pokehunt.xyz';

export const AuthContext = createContext();

function generateRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}

export function login(platform, link_account) {
	// const URLParams = new URLSearchParams(window.location.search);
	// const stateFromParams = URLParams.get('state');
	// const stateFromStorage = window.localStorage.getItem('oauth_state');
	const state = generateRandomString(16);
	// window.localStorage.setItem('oauth_state', state);

	const authUrl = new URL(`${API_URL}/user/${platform}/login`);
	authUrl.searchParams.set('state', state);
	authUrl.searchParams.set('link_account', link_account);
	authUrl.searchParams.set('redirect_uri', window.location.origin + '/dashboard');

	window.location.href = authUrl.toString();
}
