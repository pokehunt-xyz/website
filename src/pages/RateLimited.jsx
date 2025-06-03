export function RateLimited() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 via-purple-600 to-red-500 text-white text-center p-8">
			<div className="max-w-lg w-full">
				<h1 className="text-4xl font-bold mb-4">You&apos;ve Been Rate-Limited!</h1>
				<p className="mb-8 text-xl">Looks like you have hit a limit! Please wait a bit before trying again.</p>

				<div className="mb-6">
					<img
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
						alt="Snorlax"
						className="mx-auto w-1/2"
					/>
				</div>

				<p className="mb-8 text-lg">Snorlax is blocking the way! You&apos;ve made too many requests in a short period of time. Please try again later!</p>
			</div>
		</div>
	);
}

export default RateLimited;
