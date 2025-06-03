import { useSearchParams } from 'react-router-dom';

import pikachuHappyPng from '../assets/pikachu-happy.png';
import pikachuSadPng from '../assets/pikachu-sad.png';

export default function DonateStatus() {
	const [searchParams] = useSearchParams();
	const amount = searchParams.get('amount');

	if (amount && amount > 0)
		return (
			<div className="flex flex-col items-center justify-center text-center h-screen max-w-6xl w-full mx-auto text-white">
				<h1 className="text-5xl font-extrabold mb-6">Donation Successful!</h1>
				<p className="text-3xl mb-6">Congratulations! You just made a huge impact in helping us grow!</p>
				<div className="flex justify-center mb-6">
					<img src={pikachuHappyPng} alt="Pikachu" className="w-40 h-40 animate-pulse" />
				</div>
				<p className="text-lg mb-4">
					Thank you for your support! Your donation helps to keep the bot running and brings more exciting features to life.
					<br />⚡ Team PokéHunt
				</p>
			</div>
		);
	else
		return (
			<div className="flex flex-col items-center justify-center text-center h-screen max-w-6xl w-full mx-auto text-white">
				<h1 className="text-5xl font-extrabold mb-6">Payment unsuccessful</h1>
				<div className="flex justify-center mb-6">
					<img src={pikachuSadPng} alt="Pikachu" className="w-40 h-40 animate-pulse" />
				</div>
				<p className="text-lg">Something went wrong while processing your payment, please try again.</p>
			</div>
		);
}
