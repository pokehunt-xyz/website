import { login } from '../AuthContext';
import type { Config } from '../utils';

import discordSvg from '../assets/footer/discord.svg';
import telegramSvg from '../assets/footer/telegram.svg';

export default function LoginButton({
	type,
	link,
	className,
	API_URL,
}: {
	type: 'discord' | 'telegram';
	link: boolean;
	className: string;
	API_URL: Config['API_URL'];
}) {
	if (type === 'discord')
		return (
			<button
				onClick={() => login('discord', link, API_URL)}
				className={`bg-[#5865F2] hover:bg-[#6772e3] text-white text-center rounded-lg flex items-center justify-center space-x-2 transition p-3 ${className}`}
			>
				<img className="w-5 h-5" src={discordSvg} />
				<span>{link ? 'Link Discord account' : 'Login using Discord'}</span>
			</button>
		);
	else if (type === 'telegram')
		return (
			<button
				onClick={() => login('telegram', link, API_URL)}
				className={`bg-[#24A1DE] hover:bg-[#379bcb] text-white text-center rounded-lg flex items-center justify-center space-x-2 transition p-3 ${className}`}
			>
				<img className="w-5 h-5" src={telegramSvg} />
				<span>{link ? 'Link Telegram account' : 'Login using Telegram'}</span>
			</button>
		);
}
