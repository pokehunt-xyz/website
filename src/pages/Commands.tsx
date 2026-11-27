import { useEffect, useState, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
	FaArrowsRotate,
	FaCheck,
	FaCircleInfo,
	FaCoins,
	FaCopy,
	FaGavel,
	FaGear,
	FaHouse,
	FaListUl,
	FaMagnifyingGlass,
	FaRightLeft,
	FaShieldHalved,
	FaStore,
	FaTerminal,
	FaTriangleExclamation,
	FaUsers,
} from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';

import type { Config } from '../utils';

import discordSvg from '../assets/footer/discord.svg';
import telegramSvg from '../assets/footer/telegram.svg';

type Platform = 'discord' | 'telegram';

interface Example {
	command: string;
	description: string;
}

interface Command {
	name: string;
	description: string;
	/** Only in a server (Discord) or group (Telegram), not in a DM */
	serverOnly: boolean;
	discord: { examples: Example[] };
	/** null when the command is not on Telegram */
	telegram: { usage: string; examples: Example[] } | null;
}

interface Category {
	name: string;
	commands: Command[];
}

const ALL = 'All';

const CATEGORY_ICONS: Record<string, IconType> = {
	General: FaHouse,
	Information: FaCircleInfo,
	Economy: FaCoins,
	Market: FaStore,
	Auction: FaGavel,
	Duel: FaShieldHalved,
	Trading: FaRightLeft,
	Settings: FaGear,
};

const PLATFORMS: { id: Platform; name: string; icon: string }[] = [
	{ id: 'discord', name: 'Discord', icon: discordSvg },
	{ id: 'telegram', name: 'Telegram', icon: telegramSvg },
];

function iconOf(category: string): IconType {
	return CATEGORY_ICONS[category] ?? FaTerminal;
}

/** Whether a command matches the search (name, description or an example) */
function matches(command: Command, search: string): boolean {
	const query = search.trim().toLowerCase().replace(/^\//, '');
	if (!query) return true;
	const examples = [...command.discord.examples, ...(command.telegram?.examples ?? [])];
	return (
		command.name.toLowerCase().includes(query) ||
		command.description.toLowerCase().includes(query) ||
		examples.some((example) => example.command.toLowerCase().includes(query) || example.description.toLowerCase().includes(query))
	);
}

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 1500);
		return () => clearTimeout(timeout);
	}, [copied]);

	// The clipboard is only available on https (and localhost)
	if (!navigator.clipboard) return null;

	return (
		<button
			type="button"
			onClick={() =>
				navigator.clipboard
					.writeText(text)
					.then(() => setCopied(true))
					.catch(() => null)
			}
			className="btn btn-ghost btn-xs shrink-0 text-gray-400 hover:text-white"
			aria-label={copied ? 'Copied' : `Copy ${text}`}
			title={copied ? 'Copied!' : 'Copy'}
		>
			{copied ? <FaCheck className="text-green-400" aria-hidden /> : <FaCopy aria-hidden />}
		</button>
	);
}

function ExampleRow({ example }: { example: Example }) {
	return (
		<li className="rounded-box bg-secondary px-3 py-2">
			<div className="flex items-center gap-2 min-w-0">
				<code className="flex-1 min-w-0 truncate font-mono text-sm text-primary" title={example.command}>
					{example.command}
				</code>
				<CopyButton text={example.command} />
			</div>
			<p className="mt-0.5 text-sm text-gray-400">{example.description}</p>
		</li>
	);
}

function CommandCard({ command, platform }: { command: Command; platform: Platform }) {
	const examples = platform === 'discord' ? command.discord.examples : (command.telegram?.examples ?? []);
	return (
		<article id={`command-${command.name}`} className="flex flex-col rounded-box bg-tertiary-light p-5 shadow-lg scroll-mt-6">
			<div className="flex flex-wrap items-center gap-2">
				<h3 className="font-mono text-lg font-bold text-white">/{command.name}</h3>
				{command.serverOnly && (
					<span className="badge badge-sm border-gray-600 bg-transparent text-gray-300" title="Not in a DM">
						<FaUsers aria-hidden /> {platform === 'discord' ? 'Server only' : 'Group only'}
					</span>
				)}
				{command.telegram === null && <span className="badge badge-sm border-none bg-primary/15 text-primary">Discord only</span>}
			</div>
			<p className="mt-1 text-gray-300">{command.description}</p>

			{platform === 'telegram' && command.telegram && (
				<div className="mt-4">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Usage</h4>
					<pre className="mt-1 whitespace-pre-wrap break-words rounded-box bg-secondary px-3 py-2 font-mono text-sm text-gray-200">
						{command.telegram.usage}
					</pre>
				</div>
			)}

			{examples.length > 0 && (
				<div className="mt-4">
					<h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">Examples</h4>
					<ul className="mt-1 space-y-2">
						{examples.map((example, i) => (
							<ExampleRow key={`${i}-${example.command}`} example={example} />
						))}
					</ul>
				</div>
			)}
		</article>
	);
}

function Skeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-2" aria-busy="true" aria-label="Loading the commands">
			{Array.from({ length: 6 }, (_, i) => (
				<div key={i} className="skeleton h-48 rounded-box" />
			))}
		</div>
	);
}

export default function Commands({ config }: { config: Config }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [failed, setFailed] = useState(false);
	const [retries, setRetries] = useState(0);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const controller = new AbortController();
		setFailed(false);
		fetch(`${config.API_URL}/commands`, { signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error(`Status ${res.status}`);
				return res.json();
			})
			.then((data: { categories: Category[] }) => setCategories(data.categories))
			.catch((e) => {
				if (controller.signal.aborted) return;
				console.error('Error fetching the commands:', e);
				setFailed(true);
			});
		return () => controller.abort();
	}, [config.API_URL, retries]);

	// The platform and category are in the URL (?platform=telegram&category=Economy), so they can be shared
	const platform: Platform = searchParams.get('platform') === 'telegram' ? 'telegram' : 'discord';
	const categoryParam = searchParams.get('category');
	const category = categories?.some((c) => c.name === categoryParam) ? (categoryParam as string) : ALL;

	function updateParams(changes: { platform?: Platform; category?: string }) {
		const newPlatform = changes.platform ?? platform;
		const newCategory = changes.category ?? category;
		const params: Record<string, string> = {};
		if (newPlatform !== 'discord') params.platform = newPlatform;
		if (newCategory !== ALL) params.category = newCategory;
		setSearchParams(params, { replace: true });
	}

	const totalCommands = categories?.reduce((total, c) => total + c.commands.length, 0) ?? 0;

	// The categories and commands to show: the chosen category, the platform (Discord only commands are not on Telegram) and the search
	const shown = (categories ?? [])
		.filter((c) => category === ALL || c.name === category)
		.map((c) => ({ ...c, commands: c.commands.filter((command) => (platform === 'discord' || command.telegram !== null) && matches(command, search)) }))
		.filter((c) => c.commands.length > 0);

	let content: ReactNode;
	if (failed)
		content = (
			<div className="flex flex-col items-center text-center py-10 px-4">
				<FaTriangleExclamation className="text-4xl text-primary mb-3" aria-hidden />
				<h3 className="text-xl font-semibold text-white">The commands could not be loaded</h3>
				<p className="mt-2 text-gray-400">Please try again in a moment.</p>
				<button onClick={() => setRetries((r) => r + 1)} className="btn btn-sm mt-5 bg-primary text-white border-none">
					<FaArrowsRotate aria-hidden /> Try again
				</button>
			</div>
		);
	else if (!categories) content = <Skeleton />;
	else if (shown.length === 0)
		content = (
			<div className="flex flex-col items-center text-center py-10 px-4">
				<FaMagnifyingGlass className="text-4xl text-gray-500 mb-3" aria-hidden />
				<h3 className="text-xl font-semibold text-white">No commands found</h3>
				<p className="mt-2 text-gray-400">Try another search{category !== ALL ? ' or category' : ''}.</p>
			</div>
		);
	else
		content = (
			<div className="space-y-12">
				{shown.map((c) => {
					const Icon = iconOf(c.name);
					return (
						<section key={c.name} aria-labelledby={`category-${c.name}`}>
							<h2 id={`category-${c.name}`} className="mb-4 flex items-center gap-3 text-2xl font-bold text-white">
								<Icon className="text-primary" aria-hidden /> {c.name}
								<span className="badge badge-sm border-none bg-white/10 text-gray-300">{c.commands.length}</span>
							</h2>
							<div className="grid gap-4 md:grid-cols-2">
								{c.commands.map((command) => (
									<CommandCard key={command.name} command={command} platform={platform} />
								))}
							</div>
						</section>
					);
				})}
			</div>
		);

	return (
		<div className="bg-secondary min-h-screen">
			<header className="px-4 pt-14 pb-10 text-center">
				<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1 text-sm font-medium animate-fade-down animate-once">
					<FaTerminal aria-hidden /> {categories ? `${totalCommands} commands` : 'Commands'}
				</div>
				<h1 className="mt-4 text-4xl lg:text-5xl font-bold text-white animate-fade-down animate-once">
					Com<span className="text-primary">mands</span>
				</h1>
				<p className="mt-4 text-gray-300 max-w-2xl mx-auto animate-fade-up animate-once">
					Everything you can do with PokéHunt, with examples. Pick your platform to see how to use the commands there.
				</p>
			</header>

			<main className="px-4 pb-20 max-w-6xl mx-auto">
				<div className="flex flex-col gap-4 rounded-box bg-tertiary-light p-4 shadow-2xl sm:p-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="join" role="group" aria-label="Platform">
							{PLATFORMS.map((p) => (
								<button
									key={p.id}
									onClick={() => updateParams({ platform: p.id })}
									aria-pressed={platform === p.id}
									className={`btn btn-sm join-item ${platform === p.id ? 'bg-primary text-white border-primary' : 'bg-secondary text-gray-300 border-gray-600'}`}
								>
									<img src={p.icon} alt="" className="w-4 h-4" /> {p.name}
								</button>
							))}
						</div>

						<label className="input input-sm w-full md:w-72 bg-secondary border-gray-600 focus-within:border-primary">
							<FaMagnifyingGlass className="text-gray-400" aria-hidden />
							<input
								type="search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search commands"
								aria-label="Search commands"
								className="grow text-white"
							/>
						</label>
					</div>

					{categories && (
						<nav aria-label="Command categories" className="flex flex-wrap gap-2">
							{[ALL, ...categories.map((c) => c.name)].map((name) => {
								const Icon = name === ALL ? FaListUl : iconOf(name);
								const active = name === category;
								return (
									<button
										key={name}
										onClick={() => updateParams({ category: name })}
										aria-pressed={active}
										className={`btn btn-sm rounded-full ${
											active ? 'bg-primary text-white border-primary' : 'bg-transparent text-gray-300 border-gray-600 hover:border-primary hover:text-white'
										}`}
									>
										<Icon aria-hidden /> {name}
									</button>
								);
							})}
						</nav>
					)}
				</div>

				<div className="mt-10">{content}</div>
			</main>
		</div>
	);
}
