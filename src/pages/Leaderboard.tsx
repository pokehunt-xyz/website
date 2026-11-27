import { useContext, useEffect, useState, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
	FaArrowsRotate,
	FaBookOpen,
	FaCalendarCheck,
	FaCartShopping,
	FaClock,
	FaCoins,
	FaCrosshairs,
	FaCrown,
	FaShieldHalved,
	FaStore,
	FaTriangleExclamation,
	FaTrophy,
	FaUserSecret,
} from 'react-icons/fa6';
import { MdCatchingPokemon } from 'react-icons/md';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { AuthContext } from '../AuthContext';
import { isUserIn, type Config } from '../utils';

import pikachuSad from '../assets/pikachu-sad.png';

type Period = 'week' | 'month' | 'all';

interface Category {
	id: string;
	title: string;
	description: string;
	periods: Period[];
}

interface Entry {
	position: number;
	username: string;
	value: number;
	display: string;
}

/** The entry of the logged in hunter (GET /user/leaderboard/:category), index: its index in the top */
interface OwnEntry extends Entry {
	index: number;
}

interface Own {
	/** The computation this entry is from (only used when it is the same as the top) */
	computed: string | null;
	entry: OwnEntry | null;
}

interface Board {
	category: string;
	title: string;
	description: string;
	period: Period;
	periods: Period[];
	/** ISO date, null when the leaderboards were never computed */
	computed: string | null;
	entries: Entry[];
}

const DEFAULT_CATEGORY = 'allRound';

const ICONS: Record<string, IconType> = {
	allRound: FaCrown,
	dex: FaBookOpen,
	catches: MdCatchingPokemon,
	hunts: FaCrosshairs,
	duels: FaShieldHalved,
	votes: FaCalendarCheck,
	balance: FaCoins,
	marketSales: FaStore,
	marketSpending: FaCartShopping,
};

const PERIOD_NAMES: Record<Period, string> = { week: 'This week', month: 'This month', all: 'All time' };

const RESETS: Record<Period, string | null> = {
	week: 'Resets every Monday at 00:00 UTC',
	month: 'Resets on the 1st of every month at 00:00 UTC',
	all: null,
};

/** The colors of the first three places: gold, silver and bronze */
const PODIUM = [
	{ border: 'border-yellow-400', text: 'text-yellow-400', ring: 'ring-yellow-400/40', bg: 'bg-yellow-400/10', height: 'pt-10 pb-6' },
	{ border: 'border-gray-300', text: 'text-gray-300', ring: 'ring-gray-300/40', bg: 'bg-gray-300/10', height: 'pt-6 pb-5' },
	{ border: 'border-amber-600', text: 'text-amber-600', ring: 'ring-amber-600/40', bg: 'bg-amber-600/10', height: 'pt-4 pb-4' },
];

function iconOf(category: string): IconType {
	return ICONS[category] ?? FaTrophy;
}

/** e.g. "5 minutes ago" */
function timeAgo(iso: string, now: number): string {
	const minutes = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60_000));
	if (minutes < 1) return 'just now';
	if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
	const days = Math.floor(hours / 24);
	return `${days} day${days === 1 ? '' : 's'} ago`;
}

/** The current time, updated every minute (for "updated 5 minutes ago") */
function useNow(): number {
	const [now, setNow] = useState(() => Date.now());
	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 60_000);
		return () => clearInterval(interval);
	}, []);
	return now;
}

function Name({ username, className = '' }: { username: string; className?: string }) {
	if (username === 'Anonymous')
		return (
			<span className={`inline-flex items-center gap-1.5 italic text-gray-400 min-w-0 ${className}`} title="This player hides their username">
				<FaUserSecret className="shrink-0" aria-hidden />
				<span className="truncate">Anonymous</span>
			</span>
		);
	return <span className={`truncate min-w-0 text-white ${className}`}>{username}</span>;
}

function YouBadge() {
	return <span className="badge badge-sm shrink-0 bg-primary text-white border-none font-semibold">You</span>;
}

function PodiumCard({ entry, place, own }: { entry: Entry; place: 0 | 1 | 2; own: boolean }) {
	const style = PODIUM[place];
	return (
		<div
			className={`flex flex-col items-center text-center min-w-0 rounded-box border-t-4 ${style.border} ${style.bg} bg-secondary px-2 sm:px-4 ${style.height} shadow-lg animate-fade-up animate-once ${own ? 'ring-2 ring-primary' : ''}`}
		>
			{place === 0 && <FaCrown className="text-yellow-400 text-2xl mb-2" aria-hidden />}
			<div
				className={`flex items-center justify-center size-12 sm:size-14 rounded-full ring-4 ${style.ring} bg-tertiary text-xl sm:text-2xl font-bold ${style.text}`}
			>
				{entry.position}
			</div>
			<Name username={entry.username} className="mt-3 w-full justify-center font-semibold text-sm sm:text-base" />
			<span className={`mt-1 text-xs sm:text-sm font-medium ${style.text}`}>{entry.display}</span>
			{own && (
				<span className="mt-2">
					<YouBadge />
				</span>
			)}
		</div>
	);
}

function Podium({ entries, ownIndex }: { entries: Entry[]; ownIndex: number | null }) {
	// 2nd, 1st, 3rd: the winner in the middle
	const slots: { entry: Entry | undefined; place: 0 | 1 | 2 }[] = [
		{ entry: entries[1], place: 1 },
		{ entry: entries[0], place: 0 },
		{ entry: entries[2], place: 2 },
	];
	return (
		<div className="grid grid-cols-3 items-end gap-2 sm:gap-4">
			{slots.map(({ entry, place }) =>
				entry ? <PodiumCard key={place} entry={entry} place={place} own={place === ownIndex} /> : <div key={place} aria-hidden />
			)}
		</div>
	);
}

function Row({ entry, own }: { entry: Entry; own: boolean }) {
	return (
		<li
			className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 border-l-4 ${own ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-white/5'}`}
		>
			<span className="w-10 shrink-0 text-right font-semibold tabular-nums text-gray-400">{entry.position}.</span>
			<span className="flex flex-1 items-center gap-2 min-w-0">
				<Name username={entry.username} />
				{own && <YouBadge />}
			</span>
			<span className="shrink-0 text-right font-semibold tabular-nums text-gray-200">{entry.display}</span>
		</li>
	);
}

/** The entries after the podium (the first one has index 3 in the top) */
function Rows({ entries, ownIndex }: { entries: Entry[]; ownIndex: number | null }) {
	return (
		<ol className="mt-6 divide-y divide-white/5 rounded-box bg-secondary overflow-hidden">
			{entries.map((entry, i) => (
				<Row key={i + 3} entry={entry} own={i + 3 === ownIndex} />
			))}
		</ol>
	);
}

/** The logged in hunter, when not in the top that is shown */
function OwnBelow({ entry }: { entry: Entry }) {
	return (
		<div className="mt-2">
			<p className="text-center text-gray-500 leading-none py-1" aria-hidden>
				⋮
			</p>
			<ol className="rounded-box bg-secondary overflow-hidden" aria-label="Your position">
				<Row entry={entry} own />
			</ol>
		</div>
	);
}

function Skeleton() {
	return (
		<div aria-busy="true" aria-label="Loading the leaderboard">
			<div className="grid grid-cols-3 items-end gap-2 sm:gap-4">
				<div className="skeleton h-36 rounded-box" />
				<div className="skeleton h-44 rounded-box" />
				<div className="skeleton h-32 rounded-box" />
			</div>
			<div className="mt-6 space-y-2">
				{Array.from({ length: 6 }, (_, i) => (
					<div key={i} className="skeleton h-12 rounded-box" />
				))}
			</div>
		</div>
	);
}

function Message({ image, title, children }: { image?: string; title: string; children?: ReactNode }) {
	return (
		<div className="flex flex-col items-center text-center py-10 px-4">
			{image && <img src={image} alt="" className="w-28 mb-4 opacity-90" />}
			<h3 className="text-xl font-semibold text-white">{title}</h3>
			{children && <div className="mt-2 text-gray-400 max-w-md">{children}</div>}
		</div>
	);
}

function ErrorMessage({ onRetry }: { onRetry: () => void }) {
	return (
		<div className="flex flex-col items-center text-center py-10 px-4">
			<FaTriangleExclamation className="text-4xl text-primary mb-3" aria-hidden />
			<h3 className="text-xl font-semibold text-white">The leaderboard could not be loaded</h3>
			<p className="mt-2 text-gray-400">Please try again in a moment.</p>
			<button onClick={onRetry} className="btn btn-sm mt-5 bg-primary text-white border-none">
				<FaArrowsRotate aria-hidden /> Try again
			</button>
		</div>
	);
}

export default function Leaderboard({ config }: { config: Config }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [categories, setCategories] = useState<Category[] | null>(null);
	const [categoriesFailed, setCategoriesFailed] = useState(false);
	const [board, setBoard] = useState<Board | null>(null);
	const [boardFailed, setBoardFailed] = useState(false);
	const [own, setOwn] = useState<Own | null>(null);
	const [retries, setRetries] = useState(0);
	const now = useNow();
	const location = useLocation();
	const { user } = useContext(AuthContext);
	const loggedIn = isUserIn(user);
	const hasAccount = isUserIn(user) && user.hasAccount;

	// The categories (with their periods) come from the API, so new leaderboards show up without changing the website
	useEffect(() => {
		const controller = new AbortController();
		fetch(`${config.API_URL}/leaderboard`, { signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error(`Status ${res.status}`);
				return res.json();
			})
			.then((data: { categories: Category[] }) => {
				setCategories(data.categories);
				setCategoriesFailed(false);
			})
			.catch((e) => {
				if (controller.signal.aborted) return;
				console.error('Error fetching the leaderboard categories:', e);
				setCategoriesFailed(true);
			});
		return () => controller.abort();
	}, [config.API_URL, retries]);

	// The category and period are in the URL (?category=catches&period=month), so a leaderboard can be shared
	const category = categories?.find((c) => c.id === searchParams.get('category')) ?? categories?.find((c) => c.id === DEFAULT_CATEGORY) ?? categories?.[0];
	const periodParam = searchParams.get('period');
	const period: Period | undefined = category && category.periods.includes(periodParam as Period) ? (periodParam as Period) : category?.periods[0];
	const categoryID = category?.id;

	useEffect(() => {
		if (!categoryID || !period) return;
		const controller = new AbortController();
		setBoard(null);
		setBoardFailed(false);
		fetch(`${config.API_URL}/leaderboard/${encodeURIComponent(categoryID)}?period=${period}`, { signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error(`Status ${res.status}`);
				return res.json();
			})
			.then((data: Board) => setBoard(data))
			.catch((e) => {
				if (controller.signal.aborted) return;
				console.error('Error fetching the leaderboard:', e);
				setBoardFailed(true);
			});
		return () => controller.abort();
	}, [config.API_URL, categoryID, period, retries]);

	// The position of the logged in hunter (with the login cookie), to highlight it or show it below the top
	useEffect(() => {
		setOwn(null);
		if (!hasAccount || !categoryID || !period) return;
		const controller = new AbortController();
		fetch(`${config.API_URL}/user/leaderboard/${encodeURIComponent(categoryID)}?period=${period}`, { credentials: 'include', signal: controller.signal })
			.then((res) => {
				if (!res.ok) throw new Error(`Status ${res.status}`);
				return res.json();
			})
			.then((data: { loggedIn: boolean; computed: string | null; entry: OwnEntry | null }) => {
				if (data.loggedIn) setOwn({ computed: data.computed, entry: data.entry });
			})
			.catch((e) => {
				// The leaderboard itself still works, only without your own position
				if (controller.signal.aborted) return;
				console.error('Error fetching your leaderboard position:', e);
			});
		return () => controller.abort();
	}, [config.API_URL, categoryID, period, hasAccount, retries]);

	function selectCategory(id: string) {
		setSearchParams(id === DEFAULT_CATEGORY ? {} : { category: id });
	}

	function selectPeriod(newPeriod: Period) {
		if (!category) return;
		const params: Record<string, string> = {};
		if (category.id !== DEFAULT_CATEGORY) params.category = category.id;
		if (newPeriod !== category.periods[0]) params.period = newPeriod;
		setSearchParams(params);
	}

	const retry = () => setRetries((r) => r + 1);
	const CategoryIcon = category ? iconOf(category.id) : FaTrophy;
	const reset = period ? RESETS[period] : null;

	let content: ReactNode;
	if (categoriesFailed || boardFailed) content = <ErrorMessage onRetry={retry} />;
	else if (!board) content = <Skeleton />;
	else if (board.computed === null)
		content = <Message title="The leaderboards are being calculated">They are updated every hour, please check again in a little while!</Message>;
	else if (board.entries.length === 0)
		content = (
			<Message image={pikachuSad} title="Nobody is on this leaderboard yet">
				{period === 'all' ? 'Be the first one!' : `Be the first one ${PERIOD_NAMES[period ?? 'all'].toLowerCase()}!`}
			</Message>
		);
	else {
		// Only when both are from the same computation, otherwise the index could point to someone else
		const ownEntry = own && own.computed === board.computed ? own.entry : null;
		const ownInTop = ownEntry !== null && ownEntry.index < board.entries.length && board.entries[ownEntry.index].position === ownEntry.position;
		const ownIndex = ownInTop ? ownEntry.index : null;
		content = (
			<>
				<Podium entries={board.entries.slice(0, 3)} ownIndex={ownIndex} />
				{board.entries.length > 3 && <Rows entries={board.entries.slice(3)} ownIndex={ownIndex} />}
				{ownEntry && ownEntry.index >= board.entries.length && <OwnBelow entry={ownEntry} />}
			</>
		);
	}

	// Below the leaderboard: why you are not on it, or log in to see your position
	let ownHint: ReactNode = null;
	if (board?.computed) {
		// user is null while the login status is loading
		if (user && !loggedIn)
			ownHint = (
				<>
					<Link to={{ search: location.search, hash: '#login' }} className="link link-hover text-primary">
						Log in
					</Link>{' '}
					to see your own position.
				</>
			);
		else if (hasAccount && own && own.computed === board.computed && own.entry === null) ownHint = 'You are not on this leaderboard yet.';
	}

	return (
		<div className="bg-secondary min-h-screen">
			<header className="px-4 pt-14 pb-10 text-center">
				<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1 text-sm font-medium animate-fade-down animate-once">
					<FaTrophy aria-hidden /> Updated every hour
				</div>
				<h1 className="mt-4 text-4xl lg:text-5xl font-bold text-white animate-fade-down animate-once">
					Leader<span className="text-primary">boards</span>
				</h1>
				<p className="mt-4 text-gray-300 max-w-2xl mx-auto animate-fade-up animate-once">
					The best trainers of PokéHunt on Discord and Telegram. Catch, collect, duel and trade your way to the top!
				</p>
			</header>

			<main className="px-4 pb-20">
				{categories && (
					<nav aria-label="Leaderboard categories" className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2">
						{categories.map((c) => {
							const Icon = iconOf(c.id);
							const active = c.id === category?.id;
							return (
								<button
									key={c.id}
									onClick={() => selectCategory(c.id)}
									aria-pressed={active}
									className={`btn btn-sm rounded-full ${
										active ? 'bg-primary text-white border-primary' : 'bg-transparent text-gray-300 border-gray-600 hover:border-primary hover:text-white'
									}`}
								>
									<Icon aria-hidden /> {c.title}
								</button>
							);
						})}
					</nav>
				)}

				<section className="max-w-4xl mx-auto mt-8 rounded-box bg-tertiary-light shadow-2xl p-4 sm:p-8">
					<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
						<div className="min-w-0">
							<h2 className="flex items-center gap-3 text-2xl font-bold text-white">
								<CategoryIcon className="text-primary shrink-0" aria-hidden />
								{category ? category.title : 'Leaderboard'}
							</h2>
							{category && <p className="mt-1 text-gray-400">{category.description}</p>}
						</div>

						{category && period && category.periods.length > 1 && (
							<div className="join self-start" role="group" aria-label="Period">
								{category.periods.map((p) => (
									<button
										key={p}
										onClick={() => selectPeriod(p)}
										aria-pressed={p === period}
										className={`btn btn-sm join-item ${p === period ? 'bg-primary text-white border-primary' : 'bg-secondary text-gray-300 border-gray-600'}`}
									>
										{PERIOD_NAMES[p]}
									</button>
								))}
							</div>
						)}
					</div>

					{content}

					{board?.computed && (
						<div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-400">
							<span className="inline-flex items-center gap-2">
								<FaClock aria-hidden /> Updated {timeAgo(board.computed, now)}
							</span>
							{reset && <span>{reset}</span>}
						</div>
					)}
					{ownHint && <p className="mt-3 text-sm text-gray-400">{ownHint}</p>}
				</section>

				<p className="max-w-4xl mx-auto mt-6 text-center text-sm text-gray-400">
					Want your name on the leaderboards instead of <span className="italic">Anonymous</span>? Use{' '}
					<code className="rounded bg-tertiary-light px-1.5 py-0.5 text-gray-200">/settings username</code> in the bot.
				</p>
			</main>
		</div>
	);
}
