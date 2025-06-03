import { useEffect, useState, type ReactNode } from 'react';

import { AuthContext } from '../AuthContext';
import { type Config, type User } from '../utils';

const fetchLoginStatus = async (setUser: (user: User) => void, API_URL: Config['API_URL']) => {
	try {
		const response = await fetch(`${API_URL}/user/login-status`, {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
			setUser(data);
		} else setUser({ loggedIn: false });
	} catch (err) {
		console.log('Error checking authentication status:' + err);
		setUser({ loggedIn: false });
	}
};

export default function AuthProvider({ children, config }: { children: ReactNode; config: Config }) {
	const [user, setUser] = useState<User | null>(null);

	const logout = async () => {
		try {
			const response = await fetch(`${config.API_URL}/user/logout`, {
				method: 'GET',
				credentials: 'include',
			});
			if (response.ok) {
				window.location.href = '/';
				setUser({ loggedIn: false });
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	useEffect(() => {
		fetchLoginStatus(setUser, config.API_URL);
	}, [config.API_URL]);

	return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}
