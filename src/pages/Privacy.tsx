import { Link } from 'react-router-dom';

export default function Privacy() {
	return (
		<>
			<div className="bg-secondary px-4 pt-6 md:px-[15vw] lg:px-[20vw] animate-fade-down lg:animate-fade-left">
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white py-3">Privacy Policy</h2>
				<p>Last updated: 14th January 2025</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Introduction</h3>
				<p>
					Pokéhunt is a Pokémon themed bot that allows you to collect and interact with Pokémon directly within Discord and Telegram. We are committed to
					protecting your privacy and ensuring that your personal information is handled with care. This Privacy Policy explains what information we collect,
					how we use it, and the steps we take to safeguard it.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Information we collect</h3>
				<p>
					We collect the minimum amount possible necessary to provide and improve our services. This includes the following types of information:
					<ul className="list-disc list-inside">
						<li>
							<span className="font-bold">Discord IDs</span>: We store user, channel and guild Discord IDs to associate you, channels and guilds with
							configuration settings and in-game data.
						</li>
						<li>
							<span className="font-bold">Discord names, avatars and banners</span>: We collect these to show them when you are using our services. We only
							store those temporarily for the minimum duration needed.
						</li>
						<li>
							<span className="font-bold">Telegram IDs</span>: We store user and chat Telegram IDs to associate you and chats/groups with configuration settings
							and in-game data.
						</li>
						<li>
							<span className="font-bold">Telegram names and avatars</span>: We collect these to show them when you are using our services. We only store those
							temporarily for the minimum duration needed.
						</li>
						<li>
							<span className="font-bold">In-Game information</span>: We store information about your in-game progress, such as Pokémon caught, amount of
							credits (in-game currency), quests and challenges completed and other in-game data. Note that this information is not personally identifiable.
						</li>
						<li>
							<span className="font-bold">Other</span>: We may log information about the requests you make to our services, including interactions with our
							website and API. This data is used primarily to prevent attacks and enforce rate limits. We strive to keep this information stored in memory to
							minimize its persistence, but we cannot always guarantee that.
						</li>
					</ul>
					<br />
					We do <span className="font-bold">not</span> collect or store your email address or any other personally identifiable information described above.
					Please note that as our services evolve, we may collect additional types of data, which we will disclose here if applicable.
					<br />
					We do not knowingly collect or solicit personal information from children under the age of 13. If we learn that we have collected personal data from a
					child under 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we may have
					inadvertently collected data from a child under 13, please contact us so we can take appropriate action.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">How we use your Information</h3>
				<p>The information we collect is used exclusively for the following purposes:</p>
				<ul className="list-disc list-inside">
					<li>To manage and maintain your in-game profile and progress, provide technical support, and ensure smooth operation of our services</li>
					<li>
						To enable features and functionalities of our services, such as collecting Pokémon, completing quests and challenges, and managing in-game currency
					</li>
					<li>To safeguard our services and ensure fairness by preventing cheating</li>
				</ul>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Sharing of Information</h3>
				<p>
					We do not share, sell or trade your information with third parties. Your information is solely used within the context of our services to enhance your
					experience. The information remains on servers controlled and owned by us. Note that we may only share your information if required tao do so by law
					or in response to valid legal requests, such as subpoenas<br></br>
					We may link to third-party websites or services, but we are not responsible for the privacy practices of these websites or services. We encourage you
					to read the privacy policies of any third-party websites or services that you visit.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Data Security</h3>
				<p>
					We take data protection seriously and implement appropriate technical and organizational measures to protect your information from unauthorized
					access, alteration, or disclosure. While we strive to use commercially acceptable means to protect your personal data, please note that no method of
					transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security. In the event of a data breach, we will
					notify you without undue delay in accordance with applicable data protection laws.
					<br />
					<br />
					If you discover a significant (security) issue, please contact us immediately through private means by emailing{' '}
					<a href="mailto:support@pokehunt.xyz" className="link link-hover">
						support [at] pokehunt.xyz
					</a>
					. We may offer a award for reporting such vulnerabilities, but please be aware that we have sophisticated anti-cheat measures in place, and attempting
					to exploit our systems could result your account in getting blacklisted. If you wish to test our systems, please contact us beforehand so we can place
					you on a whitelist.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Data Retention</h3>
				<p>
					We retain your data for as long as you use the our services and for a reasonable period thereafter, in order to maintain your game progress and allow
					you to continue using our services. If you wish to delete your data, you can request deletion by contact us at{' '}
					<a href="mailto:support@pokehunt.xyz" className="link link-hover">
						support [at] pokehunt.xyz
					</a>
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Third-Party Services</h3>
				<p>
					We use <span className="font-bold">Cloudflare</span>, a third-party service, to optimize and secure the performance of our services. Cloudflare may
					collect and process certain data such as IP addresses, in order to deliver its services and protect the integrity of our platform. For more
					information on how Cloudflare collects and processes data, please refer to their{' '}
					<a href="https://www.cloudflare.com/privacypolicy/" className="link link-hover" target="_blank" rel="noopener noreferrer">
						Privacy Policy
					</a>
					<br />
					Additionaly, we use <span className="font-bold">Discord</span> and <span className="font-bold">Telegram</span> for interacting with the bot. They can
					(probably) read all your messages, log IP addresses and collect other personal information. You can find their privacy policy{' '}
					<a href="https://discord.com/privacy" className="link link-hover" target="_blank" rel="noopener noreferrer">
						here
					</a>{' '}
					and{' '}
					<a href="https://telegram.org/privacy" className="link link-hover" target="_blank" rel="noopener noreferrer">
						here
					</a>{' '}
					respectively.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Changes to this Privacy Policy</h3>
				<p>
					We may update this Privacy Policy from time to time. If we make significant changes, we will notify you by posting a notice in the support
					server/group or through appropriate means. Your continued use of our services after such changes will be considered as your acceptance of the updated
					Privacy Policy.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Contact us</h3>
				<p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
				<ul className="list-disc list-inside">
					<li>
						<span className="font-bold">Email</span>:{' '}
						<a href="mailto:support@pokehunt.xyz" className="link link-hover">
							support [at] pokehunt.xyz
						</a>
					</li>
					<li>
						<span className="font-bold">Discord</span>:{' '}
						<Link to="/support-discord" className="link link-hover">
							Join our Discord Support Server
						</Link>
					</li>
					<li>
						<span className="font-bold">Telegram</span>:{' '}
						<Link to="/support-telegram" className="link link-hover">
							Join our Telegram Support Group
						</Link>
					</li>
				</ul>
				<p className="py-5">Thank you for using Pokéhunt! Your privacy is important to us, and we are committed to protecting it.</p>
			</div>
		</>
	);
}
