import { node } from 'prop-types';
import { useEffect, useState } from 'react';

// If you want to change the API url, you have to (re)build the Docker container with the env variable set.
const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.pokehunt.xyz';

import { AuthContext } from '../AuthContext';

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const fetchLoginStatus = async () => {
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

	const logout = async () => {
		try {
			const response = await fetch(`${API_URL}/user/logout`, {
				method: 'GET',
				credentials: 'include',
			});
			if (response.ok) {
				window.location.href = '/';
				setUser(null);
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	useEffect(() => {
		fetchLoginStatus();
	}, []);

	return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
	children: node.isRequired,
};
