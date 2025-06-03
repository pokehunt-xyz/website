// Use dynamic import to load the config
export async function loadConfig(): Promise<Config> {
	const response = await fetch('/config.json');
	return await response.json();
}

export interface Config {
	API_URL: string;
	CAPTCHA_SITE_KEY: string;
}

interface UserOut {
	loggedIn: false;
}

export interface UserIn {
	loggedIn: true;
	hasAccount: boolean;
	hasDiscord: boolean;
	hasTelegram: boolean;
	username: string;
	avatar: string;
	credits: number;
	redeems: number;
}

export type User = UserOut | UserIn;

export function isUserIn(user: unknown): user is UserIn {
	return typeof user === 'object' && user !== null && 'loggedIn' in user && user.loggedIn === true;
}
