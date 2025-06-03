import { Link } from 'react-router-dom';

export default function Terms() {
	return (
		<>
			<div className="bg-secondary px-4 pt-6 md:px-[15vw] lg:px-[20vw] animate-fade-down lg:animate-fade-left">
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white py-3">Terms of Service</h2>
				<p>Last updated: 14th January 2025</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Introduction</h3>
				<p>
					Welcome to Pokéhunt! These Terms of Service govern your use of our services, including our Discord bot, Telegram bot, website, API and other services
					we provide.
					<br />
					By accepting these Terms of Service, or by using or accessing our services, you confirm that you are at least 13 years old and consent to the
					collection and processing of your data as described in the{' '}
					<Link to="/privacy" className="link link-hover">
						Privacy Policy
					</Link>
					. If you are legal of age in your jurisdiction, you have read, understand, and agree to be legally bound by these Terms and our Privacy Policy. If you
					are under the legal age in your jurisdiction, your legal guardian has reviewed and agreed to these Terms and Privacy Policy on your behalf. If you do
					not agree to these Terms or Privacy Policy, please do not use our services.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Acceptance of Terms</h3>
				<p>
					By using our services, you agree to be bound by these Terms of Service. If you do not agree to these Terms of Service, please do not use our services.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Description of Service</h3>
				<p>
					Pokéhunt is a bot that allows you to collect and interact with Pokémon directly within Discord and/or Telegram. We also provide various other
					services, such as an API, which are also bound by these Terms.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">User Conduct</h3>
				<p>
					Users are responsible for their own conduct while using our services. You agree to use them only for purposes that are legal, proper and in accordance
					with these Terms of Service. Any violation of these Terms of Service may result in the termination of your account without prior notice.
				</p>
				<p>You are explicitly not allowed to:</p>
				<ul className="list-disc list-inside">
					<li>Use our services for any illegal or unauthorized purpose</li>
					<li>Use our services to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
					<li>Trade in-game assets for non in-game currency(ies) or item(s)</li>
					<li>Use any form of cheating, including botting, automations, macros and auto catchers</li>
					<li>Use exploits or bugs to intentionally gain an advantage, or share information on how to do so</li>
					<li>Compromise the security of your account or anyone else&apos;s</li>
					<li>Impersonate our services or attempt to interrupt the proper operation of our services</li>
				</ul>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Account Responsibility</h3>
				<p>
					You are responsible for maintaining the confidentiality of your account credentials, including those used to log into Discord and Telegram. If you
					suspect any unauthorized use of your accounts or believe any of your accounts has been compromised, you agree to notify us immediately. You are solely
					responsible for any activity that occurs under your accounts (including your Discord and/or Telegram account), whether or not authorized by you.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">In-game items</h3>
				<p>
					You are prohibited from transferring, purchasing, selling, or exchanging in-game items outside of our services for any form of value. Any violation of
					this may result in suspension or termination of your access to our services. We reserve the right to modify, manage, control or remove in-game items
					at our discretion.
					<br />
					All prices and availabilities of our items are subject to change without notice. We are not liable for any losses or damages resulting from such
					changes.
					<br />
					All purchases made within our services are eligible for a refund within 14 days of purchase, provided the purchased item has not been used. Once the
					purchased item has been used, refunds are no longer available. If you believe there has been an error with your transaction, please contact support
					within 14 days of purchase.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Termination</h3>
				<p>
					We reserve the right to terminate or suspend your account at any time without prior notice if we believe you have violated these Terms of Service.
					Upon termination, your right to use any of our services will immediately cease. In the event of a suspension or termination of your account for any
					reason attributable to you, any in-game items may be forfeited and no refunds will be issued.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Intellectual Property</h3>
				<p>
					All Pokémon images and data are the property of Nintendo. PokéHunt is a fan-made project and is not affiliated with Nintendo. All other trademarks are
					the property of their respective owners. You may not use any of our intellectual property without our prior written consent.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Limitation of Liability</h3>
				<p>
					Our services are provided &quot;as is&quot; and &quot;as available&quot; without any warranty of any kind. We are not liable for any damages or losses
					resulting from your use of our services. We reserve the right to modify, suspend or discontinue our services at any time without prior notice.
					<br />
					We are not liable for any delays or failures in providing our services due to causes beyond our reasonable control, including but not limited to
					natural disasters, technical failures, or government actions. This clause shall apply even if any of these events occur outside of normal operating
					conditions.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Changes to the Terms of Service</h3>
				<p>
					We may update the Terms of Service from time to time. If we make significant changes, we will notify you by posting a notice in the support
					server/group or through appropriate means. Your continued use of our services after such changes will be considered as your acceptance of the updated
					Terms of Service.
				</p>
				<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white py-5">Contact Us</h3>
				<p>
					If you have any questions or concerns about these Terms of Service, please contact us at{' '}
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
				</p>
			</div>
		</>
	);
}
