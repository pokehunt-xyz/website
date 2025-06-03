import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	const [pokemon, setPokemon] = useState(null);
	const [bgColor, setBgColor] = useState('bg-gray-200');

	useEffect(() => {
		const fetchRandomPokemon = async () => {
			const randomId = Math.floor(Math.random() * 1025) + 1;
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
			const data = await res.json();
			setPokemon(data);
		};

		fetchRandomPokemon();
	}, []);

	// Update background based on Pokémon type
	useEffect(() => {
		if (pokemon) {
			const primaryType = pokemon.types[0].type.name;
			// Set background color based on the Pokémon's primary type
			switch (primaryType) {
				case 'normal':
					setBgColor('bg-gradient-to-r from-gray-400 to-gray-600');
					break;
				case 'fire':
					setBgColor('bg-gradient-to-r from-red-500 to-yellow-500');
					break;
				case 'fighting':
					setBgColor('bg-gradient-to-r from-red-600 to-orange-600');
					break;
				case 'water':
					setBgColor('bg-gradient-to-r from-blue-500 to-teal-500');
					break;
				case 'flying':
					setBgColor('bg-gradient-to-r from-blue-400 to-indigo-400');
					break;
				case 'grass':
					setBgColor('bg-gradient-to-r from-green-500 to-lime-500');
					break;
				case 'poison':
					setBgColor('bg-gradient-to-r from-purple-500 to-indigo-500');
					break;
				case 'electric':
					setBgColor('bg-gradient-to-r from-yellow-400 to-yellow-600');
					break;
				case 'ground':
					setBgColor('bg-gradient-to-r from-brown-500 to-amber-500');
					break;
				case 'psychic':
					setBgColor('bg-gradient-to-r from-pink-500 to-indigo-500');
					break;
				case 'rock':
					setBgColor('bg-gradient-to-r from-gray-700 to-gray-900');
					break;
				case 'ice':
					setBgColor('bg-gradient-to-r from-blue-200 to-white');
					break;
				case 'bug':
					setBgColor('bg-gradient-to-r from-green-400 to-green-600');
					break;
				case 'dragon':
					setBgColor('bg-gradient-to-r from-purple-600 to-indigo-600');
					break;
				case 'ghost':
					setBgColor('bg-gradient-to-r from-indigo-500 to-purple-600');
					break;
				case 'dark':
					setBgColor('bg-gradient-to-r from-gray-800 to-black');
					break;
				case 'steel':
					setBgColor('bg-gradient-to-r from-gray-500 to-gray-700');
					break;
				case 'fairy':
					setBgColor('bg-gradient-to-r from-pink-400 to-pink-600');
					break;
				case 'stellar':
					setBgColor('bg-gradient-to-r from-indigo-500 to-blue-600');
					break;
				case '???':
					setBgColor('bg-gradient-to-r from-gray-300 to-gray-500');
					break;
				default:
					setBgColor('bg-gray-200');
			}
		}
	}, [pokemon]);

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className={`flex flex-col w-full mx-auto ${bgColor} items-center`}>
			<div className="flex flex-col items-center justify-center text-center h-screen max-w-6xl text-white">
				<h1 className="text-6xl font-extrabold mb-6">404</h1>
				<h2 className="text-3xl mb-6">
					Uh-oh! Looks like you encountered a wild <span className="text-primary font-semibold">{pokemon ? capitalize(pokemon.name) : 'Pokémon'}</span> that
					doesn&apos;t exist!
				</h2>
				<div className="flex justify-center mb-6">
					<img
						src={pokemon ? pokemon.sprites.front_default : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'}
						alt="Pokemon"
						className="w-40 h-40 animate-pulse"
					/>
				</div>
				<p className="text-lg mb-6">Don&apos;t worry, we will get you back on track. Try going back to the homepage!</p>
				<Link to="/" className="text-white btn btn-outline bg-primary border-none text-sm py-2 px-4">
					Go Back Home
				</Link>
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" // Pokeball image
					alt="Pokeball"
					className="mt-6 w-24 animate-bounce"
				/>
			</div>
		</div>
	);
}
