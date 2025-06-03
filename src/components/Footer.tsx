import { Link } from 'react-router-dom';

import pokehunt from '../assets/pokehunt.png';

import discordSvg from '../assets/footer/discord.svg';
import emailSvg from '../assets/footer/email.svg';
import githubSvg from '../assets/footer/github.svg';
import telegramSvg from '../assets/footer/telegram.svg';

export default function Footer() {
	return (
		<>
			<footer className="bg-[#1a1a1a]">
				<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
					<div className="md:flex md:justify-between">
						<div className="mb-6 md:mb-0">
							<Link to="/" className="flex items-center text-white">
								<img src={pokehunt} className="h-8 me-3" alt="Logo" />
								<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
									Poké<span className="text-primary">Hunt</span>
								</span>
							</Link>
						</div>
						<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
							<div>
								<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Links</h2>
								<ul className="text-gray-500 dark:text-gray-400 font-medium">
									<li className="flex gap-2 mb-4">
										<img className="w-5 h-5" src={discordSvg} />
										<Link to="/invite-discord" className="link link-hover">
											Bot
										</Link>
										<Link to="/support-discord" className="link link-hover">
											Support
										</Link>
									</li>
									<li className="flex gap-2">
										<img className="w-5 h-5" src={telegramSvg} />
										<Link to="/invite-telegram" className="link link-hover">
											Bot
										</Link>
										<Link to="/support-telegram" className="link link-hover">
											Support
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
								<ul className="text-gray-500 dark:text-gray-400 font-medium">
									<li className="mb-4">
										<Link to="/privacy" className="link link-hover">
											Privacy Policy
										</Link>
									</li>
									<li>
										<Link to="/terms" className="link link-hover">
											Terms &amp; Conditions
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<div className="sm:flex sm:items-center sm:justify-between">
						<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
							© 2025{' '}
							<Link to="/" className="link link-hover">
								PokéHunt
							</Link>
							. All Rights Reserved.
						</span>
						<div className="flex mt-4 sm:justify-center sm:mt-0">
							<Link to="/support-discord" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<img className="w-5 h-5" aria-hidden="true" src={discordSvg} />
								<span className="sr-only">Discord</span>
							</Link>
							<Link to="/support-telegram" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<img className="w-5 h-5" aria-hidden="true" src={telegramSvg} />
								<span className="sr-only">Telegram</span>
							</Link>
							<a href="mailto:support@pokehunt.xyz" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<img className="w-5 h-5" aria-hidden="true" src={emailSvg} />
								<span className="sr-only">Email</span>
							</a>
							<Link to="/github" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
								<img className="w-5 h-5" aria-hidden="true" src={githubSvg} />
								<span className="sr-only">GitHub</span>
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
