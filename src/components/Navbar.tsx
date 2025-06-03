import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from '../AuthContext';
import { isUserIn, type Config } from '../utils';
import LoginButton from './LoginButton';

import discordSvg from '../assets/footer/discord.svg';
import telegramSvg from '../assets/footer/telegram.svg';

export default function NavBar({ config }: { config: Config }) {
	useEffect(() => {
		AOS.init();
	}, []);
	const location = useLocation();

	const [sidebar, setSidebar] = useState(false);
	const [loginModalOpen, setLoginModalOpen] = useState(false);

	const openLoginModal = () => setLoginModalOpen(true);
	const closeLoginModal = () => setLoginModalOpen(false);

	useEffect(() => {
		if (location.hash === '#login') setLoginModalOpen(true);
	}, [location.hash]);

	const { user, logout } = useContext(AuthContext);
	if (!user) return <div></div>;

	// const navClass = ({ isActive, isPending }) => (isPending || isActive ? 'active-path' : 'links');
	const pages = (
		<>
			{/* <li>
				<NavLink to="/" className={navClass}>
					Home
				</NavLink>
			</li> */}
			{/* <li>
				<NavLink to="/commands" className={navClass}>
					Commands
				</NavLink>
			</li> */}
		</>
	);
	const btns = (
		<>
			<Link to="/invite-discord" className="text-white btn btn-sm btn-outline bg-primary border-none">
				<img className="w-5 h-5" src={discordSvg} /> Add to server
			</Link>
			<Link to="/invite-telegram" className="text-white btn btn-sm btn-outline border-none">
				<img className="w-5 h-5" src={telegramSvg} /> Add to group
			</Link>
			{isUserIn(user) ? (
				<>
					<Link to="/dashboard" className="text-white btn btn-sm btn-outline">
						{user.hasDiscord && <img className="w-5 h-5" src={discordSvg} />}
						{user.hasTelegram && <img className="w-5 h-5" src={telegramSvg} />}
						<img src={user.avatar} className="h-6" />
						{user.username}
					</Link>
					<button onClick={logout} className="text-white btn btn-sm btn-outline">
						Logout
					</button>
				</>
			) : (
				<>
					<button onClick={openLoginModal} className="text-white btn btn-sm btn-outline">
						<img className="w-5 h-5" src={discordSvg} />
						<img className="w-5 h-5" src={telegramSvg} />
						Login
					</button>
				</>
			)}
		</>
	);

	return (
		<>
			<div className="navbar bg-[#1a1a1a] lg:px-24 px-4">
				<div className="navbar-start">
					<Link to="/" className="text-3xl font-bold leading-6 text-white lg:text-3xl animate-fade-right animate-once">
						Poké<span className="text-primary">Hunt</span>
					</Link>
				</div>
				<div className="hidden lg:flex navbar-center animate-fade-up animate-once">
					<ul className="gap-2 px-2 text-white menu menu-horizontal">{pages}</ul>
				</div>
				<div className="navbar-end gap-x-4">
					<div className="hidden lg:flex gap-2 animate-fade-left animate-once">{btns}</div>
					<div className="flex lg:hidden cursor-pointer dropdown dropdown-end">
						<div onClick={() => setSidebar(true)} className="text-white">
							{sidebar ? <MdMenuOpen className="size-11" /> : <MdMenu className="size-11" />}
						</div>
					</div>
					{sidebar ? (
						<div data-aos="slide-left" className="absolute top-0 right-0 z-50 w-full h-screen overflow-x-hidden bg-white bg-opacity-10">
							<div
								data-aos="slide-left"
								data-aos-easing="ease-in-out"
								data-aos-delay="100"
								className="p-4 absolute w-[65%] top-0 right-0 h-screen bg-[#1a1a1a]"
							>
								<div className="flex items-center justify-between">
									<Link to="/" className="text-2xl font-bold leading-6 text-white lg:text-3xl animate-fade-right animate-once">
										Poké<span className="text-primary">Hunt</span>
									</Link>
									<button
										onClick={() => setSidebar(false)}
										className="border-2 text-xl text-muted opacity-60 hover:opacity-100 font-bold p-3 bg-transparent rounded-full hover:bg-primary"
									>
										<LiaTimesSolid />
									</button>
								</div>

								<ul className="gap-2 px-2 text-white menu menu-vertical">{pages}</ul>
								<div className="flex flex-col gap-2 animate-fade-left animate-once">{btns}</div>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>

			{loginModalOpen && (
				<div tabIndex={-1} className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-opacity-50 backdrop-blur-sm">
					<div className="relative p-8 w-full max-w-lg max-h-full rounded-lg shadow-lg bg-tertiary_light text-white space-y-6">
						<button
							onClick={closeLoginModal}
							className="absolute flex justify-center items-center top-8 right-8 text-4xl bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8"
						>
							&times;
							<span className="sr-only">Close modal</span>
						</button>
						<div className="flex justify-center items-center">
							<h1 className="text-3xl font-bold">
								Poké<span className="text-primary">Hunt</span> Login
							</h1>
						</div>

						<LoginButton type="discord" link={false} API_URL={config.API_URL} className="w-full" />
						<LoginButton type="telegram" link={false} API_URL={config.API_URL} className="w-full" />
					</div>
				</div>
			)}
		</>
	);
}
