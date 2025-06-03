import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Image from '../components/Image';
import InviteButton from '../components/InviteButton';

import pokehunt from '../assets/pokehunt.png';
import duelPng from '../assets/home/duel.png';
import duelWebp from '../assets/home/duel.webp';
import huntPng from '../assets/home/hunt.png';
import huntWebp from '../assets/home/hunt.webp';
import questsPng from '../assets/home/quests.png';
import questsWebp from '../assets/home/quests.webp';
import tradePng from '../assets/home/trade.png';
import tradeWebp from '../assets/home/trade.webp';
import discTeleSvg from '../assets/home/disc-tele.svg';
import discordSvg from '../assets/footer/discord.svg';
import telegramSvg from '../assets/footer/telegram.svg';

export default function Home() {
	useEffect(() => {
		AOS.init();
	}, []);

	function Feature({
		title,
		imgSrc,
		imgFallback,
		imgType = 'image/webp',
		description,
		reversed,
	}: {
		title: string;
		imgSrc: string;
		imgFallback: string;
		imgType?: string;
		description: ReactNode;
		reversed: boolean;
	}) {
		return (
			<div
				className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-x-hidden items-center justify-evenly gap-x-20 px-4 lg:px-24 py-4 lg:py-24`}
			>
				<Image
					src={imgSrc}
					fallback={imgFallback}
					type={imgType}
					data-aos={reversed ? 'fade-left' : 'fade-right'}
					className={`hidden lg:block rounded-lg max-w-md ${imgType === 'image/webp' ? 'shadow-2xl' : ''}`}
					loading="lazy"
				/>
				<div
					data-aos={reversed ? 'fade-right' : 'fade-left'}
					className="bg-secondary lg:bg-transparent bg-opacity-90 shadow-2xl lg:shadow-none max-w-4xl w-full rounded-md lg:rounded-none p-2 lg:p-0"
				>
					<h3 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">{title}</h3>
					<p className="text-white lg:text-muted py-6">{description}</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-screen hero bg-secondary lg:px-24">
				<div className="flex-col hero-content lg:flex-row gap-x-20">
					<img src={pokehunt} alt="PokéHunt logo" className="max-w-xs duration-500 md:max-w-sm animate-spin animate-once" />
					<div className="text-center animate-fade-down lg:animate-fade-left">
						<h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
							The Best Pokémon experience on <span className="text-primary">Discord</span> and <span className="text-primary">Telegram</span>
						</h1>
						<p className="py-6 text-gray-300">
							PokéHunt is a Pokémon bot where players can catch, collect, trade, and battle. Embark on an exciting Pokémon adventure, available on both Discord
							and Telegram. Complete thrilling quests, conquer challenges and build your ultimate Pokémon collection!
						</p>
						<div className="flex justify-center gap-4">
							<Link to="/invite-discord" className="text-white btn btn-outline bg-primary border-none" aria-label="Invite to Discord">
								<img className="w-5 h-5" src={discordSvg} /> Add to server
							</Link>
							<Link to="/invite-telegram" className="text-white btn btn-outline border-none" aria-label="Invite to Telegram">
								<img className="w-5 h-5" src={telegramSvg} /> Add to group
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="text-center max-w-6xl w-full mx-auto p-4 pt-10">
				<h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-6xl text-primary font-bold">
					Why PokéHunt?
				</h2>
				<p className="text-white lg:text-muted py-6">
					PokéHunt is not just a bot, it is an entire Pokémon experience built to bring players together through cross-platform gameplay and exciting features.
					Whether you are using Discord or Telegram, you will always have access to the same, fun, immersive Pokémon world where you can catch, hunt, trade,
					battle, and much more. With our ever-evolving updates and new features, there is always something to look forward to. Join us today and start your
					journey to becoming a Pokémon Master!
				</p>

				<div className="flex justify-center gap-4">
					<InviteButton type="support-discord" className="text-sm py-2 px-4" />
					<InviteButton type="support-telegram" className="text-sm py-2 px-4" />
				</div>
			</div>

			<div className="pt-10">
				<h2 data-aos="fade-down" className="text-3xl md:text-4xl lg:text-6xl text-center text-white font-bold">
					Features
				</h2>
			</div>

			<Feature
				title="Collecting"
				imgSrc={huntWebp}
				imgFallback={huntPng}
				description={
					<>
						Random Pokémon spawn while you are chatting with your friends. Be the quickest to catch them and complete your Pokédex!
						<br />
						<br />
						Addtionally, Every 10 minutes you can go on a hunt to find a wild Pokémon. This is a good way to catch Pokémon if you are not (yet) familiar with
						all the Pokémon names, as you do not need to know the name to catch it.
					</>
				}
				reversed={false}
			/>

			<Feature
				title="Quests & Challenges"
				imgSrc={questsWebp}
				imgFallback={questsPng}
				description={
					<>
						Embark on exciting quests and daily challenges to earn rewards and enhance your Pokémon collection. Challenge yourself with various tasks and
						missions, designed to test your skills and strategy.
						<br />
						The bot offers a range of quests and challenges, from simple tasks to complex adventures, each with unique rewards and customizable experiences.
					</>
				}
				reversed={true}
			/>

			<Feature
				title="Duelling"
				imgSrc={duelWebp}
				imgFallback={duelPng}
				description={
					<>
						Feeling ready for a battle? Engage in exciting duels and test your Pokémon&apos;s power using the duel command.
						<br />
						Winning a duel rewards your Pokémon with experience points and you can level up your Pokémon to make them stronger!
					</>
				}
				reversed={false}
			/>

			<Feature
				title="Auction, Market & Trading"
				imgSrc={tradeWebp}
				imgFallback={tradePng}
				description={
					<>
						Do you have too many of the same Pokémon, or are you looking for a specific Pokémon?
						<br />
						Buy and sell Pokémon on the market for a specific price, or put Pokémon on an auction for other players to bid on it. After the timer of the auction
						has expired, the highest bidder wins! You can also trade directly with other players to negotiate the price.
					</>
				}
				reversed={true}
			/>

			<Feature
				title="Cross-Platform"
				imgSrc={discTeleSvg}
				imgFallback="/svg/discord-telegram.svg"
				imgType="image/svg+xml"
				description={
					<>
						Play Pokémon anywhere, anytime, with our seamless cross-platform integration!
						<br />
						Whether you are chatting on Discord or Telegram, you can enjoy the full Pokémon experience with your friends and community. Plus, you only need one
						account to play on both platforms, and you can seamlessly switch between them without losing progress.
					</>
				}
				reversed={false}
			/>
		</>
	);
}
