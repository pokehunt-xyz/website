import { shape, string } from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

import LoginButton from '../components/LoginButton';
import InviteButton from '../components/InviteButton';

// If you want to change the API url, you have to (re)build the Docker container with the env variable set.
const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.pokehunt.xyz';

async function fetchPokemon(page, setPages, setPokemonList) {
	try {
		const response = await fetch(`${API_URL}/user/pokemon/page/${page}`, {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
			if (data.invalid || isNaN(data.pages) || !data.pokemon) return;
			setPages(data.pages);
			setPokemonList(data.pokemon.map((poke) => <PokemonComponent key={poke.uid} poke={poke} />));
		}
	} catch (e) {
		console.error('Error fetching Pokemon:', e);
	}
}

function PokemonComponent({ poke }) {
	return (
		<div
			className={`max-w-sm border ${poke.shiny ? 'border-yellow-500' : poke.favorite ? 'border-red-600' : 'border-gray-500'} rounded-lg shadow justify-center`}
		>
			<img className="rounded-t-lg p-5" src={`data:image/png;base64,${poke.image}`} alt={poke.string} />
			<div className="p-5 text-center">
				<h5 className="mb-2 font-bold text-white truncate">{poke.string}</h5>
			</div>
		</div>
	);
}

PokemonComponent.propTypes = {
	poke: shape({
		string: string.isRequired,
		image: string.isRequired,
	}).isRequired,
};

export default function Dashboard() {
	const { user } = useContext(AuthContext);
	const [isLoaded, setIsLoaded] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (user) setIsLoaded(true);
	}, [user]);

	useEffect(() => {
		if (isLoaded && user.loggedIn && user.hasAccount) {
			fetchPokemon(page, setPages, setPokemonList);
		}
	}, [isLoaded, user, page]);

	if (!isLoaded) return <div></div>;

	const loggedIn = user.loggedIn ?? false;
	if (!loggedIn) return <Navigate to="/#login" />;

	if (!user.hasAccount) {
		return (
			<div className="flex items-center justify-center h-screen text-center p-6">
				<div className="max-w-xl text-white">
					<h1 className="text-2xl font-semibold mb-4">You do not have an account yet</h1>
					<p className="text-lg mb-6">
						If you want to <span className="text-primary font-semibold">link</span> your accounts, please link your existing account using the button below.
						<br />
						<br />
						If you want to <span className="text-primary font-semibold">create</span> a new account, join{' '}
						{user.hasDiscord && (
							<Link to="/support-discord" className="link" aria-label="Join our Discord server">
								our Discord server
							</Link>
						)}
						{user.hasTelegram && (
							<Link to="/support-telegram" className="link" aria-label="Join our Telegram group">
								our Telegram group
							</Link>
						)}{' '}
						and run <span className="text-primary font-semibold">/start</span>
					</p>
					<div className="flex justify-center gap-4">
						{!user.hasDiscord && (
							<>
								<InviteButton type="support-telegram" className="" />
								<LoginButton type="discord" link={true} />
							</>
						)}
						{!user.hasTelegram && (
							<>
								<InviteButton type="support-discord" className="bg-transparent" />
								<LoginButton type="telegram" link={true} />
							</>
						)}
					</div>
				</div>
			</div>
		);
	}

	const linkStatus = searchParams.get('link_status');
	function LinkStatus() {
		if (linkStatus === 'true') {
			return <p>Your account has been linked successfully!</p>;
		} else if (linkStatus === 'false') {
			return <p>You can not link two existing accounts. If you wish to merge them, please contact support.</p>;
		} else {
			return (
				<>
					{!user.hasDiscord && <LoginButton type="discord" link={true}></LoginButton>}
					{!user.hasTelegram && <LoginButton type="telegram" link={true}></LoginButton>}
				</>
			);
		}
	}

	const previousPage = () => {
		if (page <= 1) return;

		setPokemonList([]);
		setPage(page - 1);
	};

	const nextPage = () => {
		if (page > pages) return;

		setPokemonList([]);
		setPage(page + 1);
	};

	return (
		<>
			<div className="text-center text-white max-w-6xl w-full mx-auto p-4 pt-10">
				<h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
					Hello {user.username}
				</h2>
				<div className="flex justify-center my-5">{LinkStatus()}</div>
				<div className="flex justify-center my-5">
					You currently have {user.credits} credits and {user.redeems} redeems
				</div>
			</div>

			<div className="text-center text-white pt-10">
				<h2 data-aos="fade-up" className="text-3xl md:text-4xl lg:text-5xl font-bold">
					Your Pokémon
				</h2>
				<div id="pokemon" className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 m-10">
					{pokemonList}
				</div>

				<div className="flex justify-center my-4">
					<button className="btn btn-outline mr-2" onClick={previousPage} disabled={page <= 1}>
						Previous
					</button>
					<span className="px-4">
						Page {page} of {pages}
					</span>
					<button className="btn btn-outline ml-2" onClick={nextPage} disabled={page >= pages}>
						Next
					</button>
				</div>
			</div>
		</>
	);
}
