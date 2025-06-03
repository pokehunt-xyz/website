import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Turnstile, { useTurnstile } from 'react-turnstile';

import pikachuHappyPng from '../assets/pikachu-happy.png';
import pikachuSadPng from '../assets/pikachu-sad.png';

// If you want to change the API url, you have to (re)build the Docker container with the env variable set.
const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.pokehunt.xyz';
const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY ?? '1x00000000000000000000AA';

export default function CaptchaPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState('loading');
	const turnstile = useTurnstile();

	// Check initial CAPTCHA status
	useEffect(() => {
		fetch(`${API_URL}/user/captcha/${id}`)
			.then((res) => {
				if (res.status === 200) setStatus('pending');
				else setStatus('solved');
			})
			.catch(() => setStatus('error'));
	}, [id]);

	const onVerify = async (token) => {
		const fp = await FingerprintJS.load();
		const { visitorId } = await fp.get();

		let deviceId = localStorage.getItem('deviceId');
		if (!deviceId) {
			deviceId = crypto.randomUUID();
			localStorage.setItem('deviceId', deviceId);
		}

		fetch(`${API_URL}/user/captcha/${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, deviceId, fingerprint: visitorId }),
		})
			.then((res) => {
				if (!res.ok) {
					turnstile.reset();
					setStatus('error');
				} else navigate(0);
			})
			.catch(() => setStatus('error'));
	};

	return (
		<div className="flex flex-col items-center justify-center text-center h-screen max-w-6xl w-full mx-auto text-white">
			{status === 'loading' && (
				<>
					<h1 className="text-5xl font-extrabold mb-6">Loading CAPTCHA</h1>
					<div className="w-40 h-40 bg-gray-700 rounded-full animate-pulse mb-6" />
				</>
			)}

			{status === 'pending' && (
				<>
					<h1 className="text-5xl font-extrabold mb-6">Verify You are Human</h1>
					<div className="mb-6">
						<Turnstile sitekey={CAPTCHA_SITE_KEY} onVerify={onVerify} />
					</div>
					<p className="text-lg">
						Please complete the verification to prove you are not a bot
						<br />⚡ Team PokéHunt
					</p>
				</>
			)}

			{status === 'solved' && (
				<>
					<h1 className="text-5xl font-extrabold mb-6">Verified successfully!</h1>
					<div className="flex justify-center mb-6">
						<img src={pikachuHappyPng} alt="Pikachu" className="w-40 h-40 animate-pulse" />
					</div>
					<p className="text-lg mb-4">You have verified you are not a bot!</p>
					<button
						onClick={() => navigate('/dashboard')}
						className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-lg transition-colors duration-200"
					>
						Go to Dashboard
					</button>
				</>
			)}

			{status === 'error' && (
				<>
					<h1 className="text-5xl font-extrabold mb-6">Verification Error</h1>
					<div className="flex justify-center mb-6">
						<img src={pikachuSadPng} alt="Pikachu" className="w-40 h-40 animate-pulse" />
					</div>
					<p className="text-lg mb-4">Something went wrong, please try again or contact support</p>
					<button
						onClick={() => navigate(0)}
						className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-lg transition-colors duration-200"
					>
						Try again
					</button>
				</>
			)}
		</div>
	);
}
