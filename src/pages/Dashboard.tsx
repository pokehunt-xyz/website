import { useContext, useEffect, useState, type ReactNode } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../AuthContext';
import { isUserIn, type Config, type UserIn } from '../utils';

import LoginButton from '../components/LoginButton';
import InviteButton from '../components/InviteButton';

interface Pokemon {
	id: number;
	uid: string;
	pid: string;
	shiny: boolean;
	favorite: boolean;
	nickname: string | null;
	level: number;
	collectedat: string;
	image: string;
	string: string;
}

async function fetchPokemon(page: number, setPages: (pages: number) => void, setPokemonList: (list: ReactNode[]) => void, API_URL: Config['API_URL']) {
	try {
		const response = await fetch(`${API_URL}/user/pokemon/page/${page}`, {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json();
			if (data.invalid || isNaN(data.pages) || !data.pokemon) return;
			setPages(data.pages);
			setPokemonList(data.pokemon.map((poke: Pokemon) => <PokemonComponent key={poke.uid} poke={poke} />));
		}
	} catch (e) {
		console.error('Error fetching Pokemon:', e);
	}
}

function PokemonComponent({ poke }: { poke: Pokemon }) {
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

function LinkStatus(status: string, user: UserIn, API_URL: Config['API_URL']) {
	if (status === 'true') {
		return <p>Your account has been linked successfully!</p>;
	} else if (status === 'false') {
		return <p>You can not link two existing accounts. If you wish to merge them, please contact support.</p>;
	} else {
		return (
			<>
				{!user.hasDiscord && <LoginButton type="discord" link={true} API_URL={API_URL} className="" />}
				{!user.hasTelegram && <LoginButton type="telegram" link={true} API_URL={API_URL} className="" />}
			</>
		);
	}
}

export default function Dashboard({ config }: { config: Config }) {
	const { user } = useContext(AuthContext);
	const [pokemonList, setPokemonList] = useState<ReactNode[]>([]);
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		if (user && user.loggedIn && user.hasAccount) {
			fetchPokemon(page, setPages, setPokemonList, config.API_URL);
		}
	}, [user, page, config.API_URL]);

	if (!user) return <div></div>;
	if (!isUserIn(user)) return <Navigate to="/#login" />;

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
								<LoginButton type="discord" link={true} API_URL={config.API_URL} className="" />
							</>
						)}
						{!user.hasTelegram && (
							<>
								<InviteButton type="support-discord" className="bg-transparent" />
								<LoginButton type="telegram" link={true} API_URL={config.API_URL} className="" />
							</>
						)}
					</div>
				</div>
			</div>
		);
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
				<div className="flex justify-center my-5">{LinkStatus(searchParams.get('link_status') || '', user, config.API_URL)}</div>
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
