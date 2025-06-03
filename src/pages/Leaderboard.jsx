import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

// https://github.com/pokehunt-xyz/pokehunt-leaderboard-react

// If you want to change the API url, you have to (re)build the Docker container with the env variable set.
const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.pokehunt.xyz';

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
