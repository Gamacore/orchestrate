<script lang="ts">
	import { resolve } from '$app/paths';
	import { siteConfig } from '$lib/config/site';
</script>

<svelte:head>
	<title>Terms of Service | Arcten</title>
	<meta
		name="description"
		content="Terms of Service governing access to and use of the Arcten website."
	/>
</svelte:head>

<div class="flex-1 px-8 py-16">
	<article class="mx-auto max-w-full" style={`width: ${siteConfig.contentWidth};`}>
		<div class="space-y-3">
			<a
				href={resolve('/')}
				class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
			>
				<span aria-hidden="true">←</span>
				Home
			</a>
			<div class="space-y-2">
				<div class="space-y-1 text-sm text-muted">
					<p>Effective Date: Jun 5, 2026</p>
					<p>Last Updated: Jun 6, 2026</p>
				</div>
				<h1 class="text-[1.15rem] font-semibold tracking-tight text-foreground sm:text-[1.3rem]">
					Terms of Service
				</h1>
			</div>
		</div>

		<div
			class="mt-10 flex flex-col gap-4 text-sm leading-7 text-[color-mix(in_srgb,var(--foreground)_88%,var(--background))]"
		>
			<p>
				These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website
				located at arcten.com and any related pages operated by Arcten (&ldquo;Arcten,&rdquo;
				&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
			</p>
			<p>
				By accessing or using our website, you agree to these Terms. If you do not agree, do not use
				the website.
			</p>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">1. About Arcten</h2>
				<p>
					Arcten is an applied AI research lab. Our website is intended to provide general
					information about Arcten, our research interests, and related updates. We do not currently
					provide a public product, customer-facing service, user account system, or paid online
					service through the website.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">
					2. Use of the Website
				</h2>
				<p>
					You may use the website only for lawful purposes and in accordance with these Terms. You
					agree not to:
				</p>
				<ul class="space-y-1">
					<li>Interfere with or disrupt the operation or security of the website;</li>
					<li>Attempt to gain unauthorized access to any systems or networks;</li>
					<li>
						Use automated tools to scrape, copy, or harvest content from the website without
						permission;
					</li>
					<li>Misrepresent your identity or affiliation with any person or organization;</li>
					<li>Use the website in violation of applicable laws or regulations.</li>
				</ul>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">
					3. Informational Content
				</h2>
				<p>
					The content on the website is provided for general informational purposes only. We may
					update, modify, or remove content at any time without notice.
				</p>
				<p>
					Nothing on the website constitutes professional, technical, legal, financial, or
					investment advice. References to research, technology, or future plans are provided for
					informational purposes and do not create any commitment, guarantee, or obligation by
					Arcten.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">
					4. Intellectual Property
				</h2>
				<p>
					The website, including its text, graphics, logos, designs, and other content, is owned by
					Arcten or its licensors and is protected by intellectual property laws.
				</p>
				<p>
					You may not copy, reproduce, modify, distribute, display, or create derivative works from
					any website content without our prior written permission, except as allowed by applicable
					law.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">5. Third-Party Links</h2>
				<p>
					The website may contain links to third-party websites or resources. We provide these links
					for convenience only and do not control or endorse third-party content. Arcten is not
					responsible for any third-party websites, services, policies, or practices.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">6. Privacy</h2>
				<p>
					Your use of the website is also subject to our Privacy Policy, if posted. The website does
					not currently provide user accounts or customer-facing product functionality. However,
					standard technical information, such as browser type, IP address, device information, and
					website usage data, may be processed by our hosting, security, analytics, or
					infrastructure providers.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">7. No Warranties</h2>
				<p>
					The website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To
					the fullest extent permitted by law, Arcten disclaims all warranties, express or implied,
					including warranties of merchantability, fitness for a particular purpose, title, and
					non-infringement.
				</p>
				<p>
					We do not guarantee that the website will be uninterrupted, secure, error-free, or free of
					harmful components.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">
					8. Limitation of Liability
				</h2>
				<p>
					To the fullest extent permitted by law, Arcten and its officers, directors, employees,
					contractors, and affiliates will not be liable for any indirect, incidental,
					consequential, special, exemplary, or punitive damages, or for any loss of profits, data,
					goodwill, or other intangible losses arising from or related to your use of the website.
				</p>
				<p>
					To the fullest extent permitted by law, Arcten&rsquo;s total liability for any claim
					arising from or related to the website or these Terms will not exceed one hundred U.S.
					dollars ($100).
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">9. Indemnification</h2>
				<p>
					You agree to defend, indemnify, and hold harmless Arcten and its officers, directors,
					employees, contractors, and affiliates from and against any claims, liabilities, damages,
					losses, and expenses, including reasonable attorneys&rsquo; fees, arising out of or
					related to your violation of these Terms or misuse of the website.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">
					10. Changes to the Website or Terms
				</h2>
				<p>
					We may modify or discontinue the website at any time without notice. We may also update
					these Terms from time to time. The updated Terms will be posted on this page with a
					revised effective date. Your continued use of the website after any update means you
					accept the revised Terms.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">11. Governing Law</h2>
				<p>
					These Terms are governed by the laws of the State of California, without regard to
					conflict of law principles. Any disputes arising from or related to these Terms or the
					website will be resolved in the state or federal courts located in California, unless
					applicable law requires otherwise.
				</p>
			</section>

			<section class="space-y-2">
				<h2 class="text-base font-semibold tracking-tight text-foreground">12. Contact</h2>
				<p>If you have questions about these Terms, contact us at:</p>
				<address class="not-italic">
					Arcten<br />
					Website:
					<a class="text-link" href="https://arcten.com">
						<span class="text-link__label">https://arcten.com</span>
					</a><br />
					Email:
					<a class="text-link" href="mailto:founders@arcten.com">
						<span class="text-link__label">founders@arcten.com</span>
					</a>
				</address>
			</section>
		</div>
	</article>
</div>
