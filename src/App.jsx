import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AuthProvider from './components/AuthProvider';
import ExternalRedirect from './components/ExternalRedirect';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

// import Commands from './pages/Commands';
import Captcha from './pages/Captcha';
import Dashboard from './pages/Dashboard';
import DonateStatus from './pages/DonateStatus';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import RateLimited from './pages/RateLimited';
import Terms from './pages/Terms';

const DISCORD_INVITE_LINK = 'https://discord.com/api/oauth2/authorize?client_id=716533909818572850&permissions=137976138816&scope=bot%20applications.commands';
const DISCORD_SERVER_LINK = 'https://discord.gg/cpYkJzd';
const TELEGRAM_INVITE_LINK = 'https://t.me/Pokehunt_xyz_bot';
const TELEGRAM_CHAT_LINK = 'https://t.me/pokehunt_xyz';
const GITHUB = 'https://github.com/pokehunt-xyz';

import './index.css';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

export default function App() {
	return (
		<BrowserRouter>
			<div className="font-poppins">
				<AuthProvider>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Navigate to="/#login" />} />
						{/* <Route path="/commands" element={<Commands />} /> */}
						<Route path="/donate-status" element={<DonateStatus />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/captcha/:id" element={<Captcha />} />
						<Route path="/privacy" element={<Privacy />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/rate-limited" element={<RateLimited />} />
						<Route path="/invite" element={<ExternalRedirect url={DISCORD_INVITE_LINK} />} />
						<Route path="/invite-discord" element={<ExternalRedirect url={DISCORD_INVITE_LINK} />} />
						<Route path="/invite-telegram" element={<ExternalRedirect url={TELEGRAM_INVITE_LINK} />} />
						<Route path="/support" element={<ExternalRedirect url={DISCORD_SERVER_LINK} />} />
						<Route path="/support-discord" element={<ExternalRedirect url={DISCORD_SERVER_LINK} />} />
						<Route path="/support-telegram" element={<ExternalRedirect url={TELEGRAM_CHAT_LINK} />} />
						<Route path="/github" element={<ExternalRedirect url={GITHUB} />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Footer />
				</AuthProvider>
			</div>
		</BrowserRouter>
	);
}
