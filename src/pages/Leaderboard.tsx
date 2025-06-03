import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext';
import { isUserIn, type Config } from '../utils';

// https://github.com/pokehunt-xyz/pokehunt-leaderboard-react

export default function Leaderboard({ config }: { config: Config }) {
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user && user.loggedIn) {
			fetch(`${config.API_URL}/user/leaderboard`, {
				method: 'GET',
				credentials: 'include',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.error) throw data.error;
				})
				.catch((err) => console.error(err));
		}
	}, [user, config.API_URL]);

	if (!user) return <div></div>;
	if (!isUserIn(user)) return <Navigate to="/#login" />;

	return (
		<>
			<h3>Dashboard</h3>
			<p>Welcome {user.username}</p>
		</>
	);
}
