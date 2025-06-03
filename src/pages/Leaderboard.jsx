import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

// https://github.com/pokehunt-xyz/pokehunt-leaderboard-react

import { loadConfig } from '../config';
const { API_URL } = await loadConfig();

export default function Loaderboard() {
	const { user } = useContext(AuthContext);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (user) setIsLoaded(true);
	}, [user]);

	useEffect(() => {
		if (isLoaded && user.loggedIn) {
			fetch(`${API_URL}/user/leaderboard`, {
				method: 'GET',
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) throw data.error;
				})
				.catch((err) => console.error(err));
		}
	}, [isLoaded, user]);

	if (!isLoaded) return <div></div>;

	const loggedIn = user.loggedIn ?? false;
	if (!loggedIn) return <Navigate to="/#login" />;

	return (
		<>
			<h3>Dashboard</h3>
			<p>Welcome {user.username}</p>
		</>
	);
}
