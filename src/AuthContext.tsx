import { createContext } from 'react';
import type { Config, User } from './utils';

export const AuthContext = createContext<{ user: User | null; logout: () => void }>({ user: null, logout: () => {} });

function generateRandomString(length: number): string {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}

export function login(platform: string, link_account: boolean, API_URL: Config['API_URL']) {
	// const URLParams = new URLSearchParams(window.location.search);
	// const stateFromParams = URLParams.get('state');
	// const stateFromStorage = window.localStorage.getItem('oauth_state');
	const state = generateRandomString(16);
	// window.localStorage.setItem('oauth_state', state);

	const authUrl = new URL(`${API_URL}/user/${platform}/login`);
	authUrl.searchParams.set('state', state);
	authUrl.searchParams.set('link_account', link_account.toString());
	authUrl.searchParams.set('redirect_uri', window.location.origin + '/dashboard');

	window.location.href = authUrl.toString();
}
