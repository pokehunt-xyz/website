import { Link } from 'react-router-dom';

import discordSvg from '../assets/footer/discord.svg';
import telegramSvg from '../assets/footer/telegram.svg';

export default function InviteButton({ type, className }: { type: 'support-discord' | 'support-telegram'; className: string }) {
	if (type === 'support-discord')
		return (
			<Link to="/support-discord" className={`text-white btn btn-outline bg-primary border-none ${className}`} aria-label="Join our Discord server">
				<img className="w-5 h-5" src={discordSvg} /> Join server
			</Link>
		);
	else if (type === 'support-telegram')
		return (
			<Link to="/support-telegram" className={`text-white btn btn-outline border-none ${className}`} aria-label="Join our Telegram group">
				<img className="w-5 h-5" src={telegramSvg} /> Join group
			</Link>
		);
}
