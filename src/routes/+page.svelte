<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { ArrowUpRight, Menu, X, CircleCheck, Command, Sparkles } from 'lucide-svelte';
	import { siteConfig } from '$lib/config/site';
	import { FooterThemeToggle } from '$lib/ui';

	let { data } = $props<{ data: PageData }>();
	let menuOpen = $state(false);
	let annualPricing = $state(false);
	const integrations = ['Company documents', 'Linear'];

	onMount(() => {
		document.documentElement.classList.add('motion-ready');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.16 }
		);

		document.querySelectorAll('.chapter').forEach((section) => observer.observe(section));
		return () => {
			observer.disconnect();
			document.documentElement.classList.remove('motion-ready');
		};
	});
</script>

<svelte:head>
	<title>{siteConfig.name} — Shared tools with agents that keep them running</title>
	<meta
		name="description"
		content="Describe the tool your company needs. Arcten builds it, hosts it, and runs the agents behind it."
	/>
</svelte:head>

<div class="landing-shell">
	<nav class="site-nav" aria-label="Main navigation">
		<a class="wordmark" href="/" aria-label={`${siteConfig.name} home`}>
			<span class="wordmark-mark" aria-hidden="true">A</span>
			<span>{siteConfig.name}</span>
		</a>

		<div class:open={menuOpen} class="nav-links">
			<a href="#why">Why now</a>
			<a href="#how-it-works">How it works</a>
			<a href="#field-notes">Field notes</a>
			<a class="nav-link-quiet" href="#contact">Pilot</a>
		</div>

		<a class="nav-cta" href="#contact">Discuss a pilot</a>
		<button
			class="menu-toggle"
			type="button"
			aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			{#if menuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
		</button>
	</nav>

	<main>
		<section class="hero chapter is-visible" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="eyebrow"><span class="eyebrow-dot"></span> Proposed MVP</p>
				<h1 id="hero-title">Shared tools that keep running.</h1>
				<p class="hero-lede">
					Describe the tool your company needs. Arcten builds it, hosts it, and runs the agents
					behind it—then your team can share and operate it together.
				</p>
				<div class="hero-actions">
					<a class="button button-primary" href="#contact"
						>Discuss a pilot <ArrowUpRight size={16} /></a
					>
					<a class="button button-secondary" href="#how-it-works">See how it works</a>
				</div>
				<p class="hero-note"><span>↳</span> For YC founders and small teams with recurring work.</p>
			</div>

			<div class="agent-window" aria-label="Product preview placeholder">
				<div class="window-chrome">
					<div class="window-dots"><span></span><span></span><span></span></div>
					<span class="window-label">Shared operations</span>
					<span class="window-status"><i></i> Live</span>
				</div>
				<div class="window-body">
					<div class="window-sidebar">
						<div class="sidebar-avatar">A</div>
						<div class="sidebar-line active"></div>
						<div class="sidebar-line"></div>
						<div class="sidebar-line short"></div>
						<div class="sidebar-rule"></div>
						<div class="sidebar-line"></div>
					</div>
					<div class="window-main">
						<div class="preview-kicker">Customer onboarding</div>
						<div class="preview-title">8 customers on track · 2 need approval · 1 blocked</div>
						<div class="progress-row"><span>Progress</span><strong>68%</strong></div>
						<div class="progress-track"><span></span></div>
						<div class="task-list">
							<div><CircleCheck size={15} /><span>Created the onboarding tracker</span></div>
							<div><CircleCheck size={15} /><span>Updated tasks from Linear</span></div>
							<div class="task-current">
								<Sparkles size={15} /><span>Drafting customer follow-ups</span><b>Working</b>
							</div>
						</div>
					</div>
				</div>
				<div class="window-foot"><span>⌘</span> Waiting for approval before an external action</div>
			</div>
		</section>

		<section class="signal-bar chapter" aria-label="Workflow integrations">
			<p>Fits into the work already in motion</p>
			<div class="integration-rail" aria-label="Example integrations">
				{#each integrations as integration, index}
					<button class="integration-chip" type="button" style={`--delay: ${index * 55}ms`}>
						{integration} <span aria-hidden="true">↗</span>
					</button>
				{/each}
			</div>
		</section>

		<section class="story-section chapter" id="why" aria-labelledby="why-title">
			<div class="section-index">01 / WHY NOW</div>
			<div class="story-heading">
				<h2 id="why-title">The work is bigger than the window.</h2>
				<p>
					Creating an agent is easier than turning it into something a team can depend on. Sharing,
					failed runs, integrations, costs, and maintenance still fall back on its creator.
				</p>
			</div>
			<div class="feature-grid">
				<article class="feature-featured">
					<span class="feature-icon"><Command size={18} /></span>
					<h3>Operate without the creator on call.</h3>
					<p>
						Teammates can check progress, resolve permitted blockers, approve actions, or pause the
						work without learning how the agent works.
					</p>
					<div class="feature-line"></div>
					<span class="feature-caption">View · operate · edit · approve</span>
				</article>
				<article class="feature">
					<span class="feature-number">02</span>
					<h3>Share one live tool.</h3>
					<p>
						Everyone works from the same deployed tool, data, and ongoing work—not a separate copy
						of an agent.
					</p>
				</article>
				<article class="feature">
					<span class="feature-number">03</span>
					<h3>Recover with context.</h3>
					<p>
						See what completed, what failed, and what is needed next—then safely resume from saved
						progress.
					</p>
				</article>
			</div>
		</section>

		<section class="process-section chapter" id="how-it-works" aria-labelledby="process-title">
			<div class="section-index">02 / HOW IT WORKS</div>
			<div class="process-intro">
				<h2 id="process-title">From intent<br />to <em>done.</em></h2>
				<p>
					Start from a working template, test it on sample inputs, then publish an authenticated
					tool that continues running after its creator closes the browser.
				</p>
			</div>
			<div class="process-steps">
				<div class="process-step">
					<strong>01</strong><span>DESCRIBE &amp; CONNECT</span>
					<p>Write the process in plain English and select the relevant company context.</p>
				</div>
				<div class="process-connector"></div>
				<div class="process-step">
					<strong>02</strong><span>TEST &amp; PUBLISH</span>
					<p>Preview behavior on saved examples, then explicitly publish the approved version.</p>
				</div>
				<div class="process-connector"></div>
				<div class="process-step">
					<strong>03</strong><span>SHARE &amp; OPERATE</span>
					<p>
						The team sees the same run, approvals, blockers, and activity as the work continues.
					</p>
				</div>
			</div>
		</section>

		<section class="notes-section chapter" id="field-notes" aria-labelledby="notes-title">
			<div class="section-index">03 / FIELD NOTES</div>
			<div class="notes-heading">
				<h2 id="notes-title">Thinking in public.</h2>
				<a href="/blog">Read all notes <ArrowUpRight size={15} /></a>
			</div>
			<div class="notes-list">
				{#if data.blogPosts.length > 0}
					{#each data.blogPosts.slice(0, 3) as post (post.slug)}
						<a class="note-row" href={resolve('/blog/[slug]', { slug: post.slug })}>
							<span>{post.formattedDate}</span><strong>{post.title}</strong><ArrowUpRight
								size={16}
							/>
						</a>
					{/each}
				{:else}
					<a class="note-row" href="/blog"
						><span>[DATE]</span><strong>[FIELD NOTE TITLE PLACEHOLDER]</strong><ArrowUpRight
							size={16}
						/></a
					>
				{/if}
			</div>
		</section>

		<section class="pricing-section chapter" aria-labelledby="pricing-title">
			<div class="section-index">05 / ACCESS</div>
			<div class="pricing-heading">
				<h2 id="pricing-title">Start with the work in front of you.</h2>
				<div class="billing-toggle" aria-label="Billing frequency">
					<button
						class:active={!annualPricing}
						type="button"
						aria-pressed={!annualPricing}
						onclick={() => (annualPricing = false)}>Monthly</button
					>
					<button
						class:active={annualPricing}
						type="button"
						aria-pressed={annualPricing}
						onclick={() => (annualPricing = true)}>Annual</button
					>
				</div>
			</div>
			<div class="pricing-grid">
				{#each ['[EXPLORER]', '[TEAM]', '[FRONTIER]'] as tier, index}
					<article class:featured={index === 1}>
						<p>{tier}</p>
						<strong>{annualPricing ? '[ANNUAL PRICE]' : '[MONTHLY PRICE]'}</strong>
						<span>[WHO THIS IS FOR]</span>
						<a href="#contact">[START HERE] <ArrowUpRight size={15} /></a>
					</article>
				{/each}
			</div>
		</section>

		<section class="contact-section chapter" id="contact" aria-labelledby="contact-title">
			<div class="contact-orbit orbit-one"></div>
			<div class="contact-orbit orbit-two"></div>
			<p class="eyebrow"><span class="eyebrow-dot"></span> Proposed pilot</p>
			<h2 id="contact-title">Give the work<br />a shared home.</h2>
			<p>Five YC teams. One recurring process per team. At least two people operating each tool.</p>
			<a class="button button-primary" href="mailto:hello@example.com"
				>[CONTACT CTA] <ArrowUpRight size={16} /></a
			>
		</section>
	</main>

	<footer class="site-footer">
		<div class="footer-brand"><span class="wordmark-mark">A</span> {siteConfig.name}</div>
		<p>Shared internal tools with agents that keep them running.</p>
		<FooterThemeToggle width="auto" />
	</footer>
</div>

<style>
	:global(:root) {
		--ink: #11130f;
		--paper: #f2f0e8;
		--lime: #d6f94a;
		--line: color-mix(in srgb, var(--foreground) 16%, transparent);
	}
	:global(body) {
		background: var(--paper);
	}
	.landing-shell {
		overflow: hidden;
		background: var(--paper);
		color: var(--ink);
	}
	.site-nav,
	main,
	.site-footer {
		width: min(1180px, calc(100% - 64px));
		margin: 0 auto;
	}
	.site-nav {
		min-height: 86px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 32px;
	}
	.wordmark,
	.footer-brand {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--ink);
		font-size: 15px;
		font-weight: 700;
		letter-spacing: -0.04em;
		text-decoration: none;
	}
	.wordmark-mark {
		display: grid;
		width: 27px;
		height: 27px;
		place-items: center;
		border-radius: 50%;
		background: var(--ink);
		color: var(--lime);
		font-size: 14px;
		font-weight: 800;
	}
	.nav-links {
		display: flex;
		align-items: center;
		gap: 30px;
		margin-left: auto;
	}
	.nav-links a,
	.nav-cta {
		color: color-mix(in srgb, var(--ink) 68%, transparent);
		font-size: 12px;
		text-decoration: none;
	}
	.nav-links a:hover,
	.nav-links a:focus-visible {
		color: var(--ink);
	}
	.nav-link-quiet {
		color: color-mix(in srgb, var(--ink) 42%, transparent) !important;
	}
	.nav-cta {
		border-bottom: 1px solid var(--ink);
		color: var(--ink);
		padding-bottom: 4px;
	}
	.menu-toggle {
		display: none;
		border: 0;
		background: transparent;
		color: var(--ink);
	}
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 0.92fr) minmax(440px, 1.08fr);
		gap: clamp(40px, 8vw, 120px);
		align-items: center;
		padding: 104px 0 118px;
	}
	.eyebrow,
	.section-index {
		color: color-mix(in srgb, var(--ink) 55%, transparent);
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.eyebrow {
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.eyebrow-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--lime);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--lime) 35%, transparent);
	}
	h1,
	h2,
	h3,
	p {
		margin: 0;
	}
	h1 {
		max-width: 640px;
		margin: 22px 0 25px;
		font-size: clamp(50px, 6.4vw, 92px);
		font-weight: 670;
		letter-spacing: -0.085em;
		line-height: 0.91;
	}
	.hero-lede {
		max-width: 420px;
		color: color-mix(in srgb, var(--ink) 65%, transparent);
		font-size: 16px;
		line-height: 1.5;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 34px;
	}
	.button {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		min-height: 44px;
		padding: 0 18px;
		font-size: 12px;
		font-weight: 700;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			background 0.2s ease;
	}
	.button:hover,
	.button:focus-visible {
		transform: translateY(-2px);
	}
	.button-primary {
		background: var(--ink);
		color: var(--paper);
	}
	.button-primary:hover,
	.button-primary:focus-visible {
		background: #303626;
	}
	.button-secondary {
		border: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
		color: var(--ink);
	}
	.hero-note {
		margin-top: 58px;
		color: color-mix(in srgb, var(--ink) 47%, transparent);
		font-size: 11px;
	}
	.hero-note span {
		color: var(--ink);
		font-size: 15px;
		margin-right: 6px;
	}
	.agent-window {
		border: 1px solid var(--ink);
		background: #e5e3d9;
		box-shadow: 16px 16px 0 var(--lime);
		transform: rotate(1.2deg);
	}
	.window-chrome,
	.window-foot {
		display: flex;
		align-items: center;
		border-bottom: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
		padding: 13px 16px;
		font-size: 9px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.window-chrome {
		justify-content: space-between;
	}
	.window-dots {
		display: flex;
		gap: 5px;
	}
	.window-dots span {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--ink) 35%, transparent);
	}
	.window-label {
		margin-right: auto;
		margin-left: 18px;
	}
	.window-status {
		color: color-mix(in srgb, var(--ink) 60%, transparent);
	}
	.window-status i {
		display: inline-block;
		width: 5px;
		height: 5px;
		margin-right: 5px;
		border-radius: 50%;
		background: #779218;
	}
	.window-body {
		display: grid;
		grid-template-columns: 72px 1fr;
		min-height: 380px;
	}
	.window-sidebar {
		border-right: 1px solid color-mix(in srgb, var(--ink) 15%, transparent);
		padding: 19px 16px;
	}
	.sidebar-avatar {
		display: grid;
		width: 29px;
		height: 29px;
		place-items: center;
		margin-bottom: 38px;
		background: var(--ink);
		color: var(--lime);
		font-size: 12px;
		font-weight: 800;
	}
	.sidebar-line {
		width: 32px;
		height: 4px;
		margin: 17px 0;
		background: color-mix(in srgb, var(--ink) 15%, transparent);
	}
	.sidebar-line.active {
		background: var(--ink);
	}
	.sidebar-line.short {
		width: 20px;
	}
	.sidebar-rule {
		width: 40px;
		border-top: 1px solid color-mix(in srgb, var(--ink) 15%, transparent);
		margin: 28px 0;
	}
	.window-main {
		padding: 54px 12%;
	}
	.preview-kicker,
	.feature-caption {
		color: color-mix(in srgb, var(--ink) 52%, transparent);
		font-size: 9px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.preview-title {
		max-width: 300px;
		margin: 15px 0 44px;
		font-size: clamp(24px, 3vw, 42px);
		font-weight: 650;
		letter-spacing: -0.06em;
		line-height: 0.95;
	}
	.progress-row {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
	}
	.progress-track {
		height: 5px;
		margin: 8px 0 28px;
		background: color-mix(in srgb, var(--ink) 13%, transparent);
	}
	.progress-track span {
		display: block;
		width: 68%;
		height: 100%;
		background: var(--ink);
	}
	.task-list {
		display: grid;
		gap: 13px;
		font-size: 11px;
	}
	.task-list div {
		display: flex;
		align-items: center;
		gap: 8px;
		color: color-mix(in srgb, var(--ink) 52%, transparent);
	}
	.task-list :global(svg) {
		color: #779218;
	}
	.task-list .task-current {
		color: var(--ink);
	}
	.task-current b {
		margin-left: auto;
		color: #779218;
		font-size: 9px;
		font-weight: 500;
	}
	.window-foot {
		justify-content: flex-start;
		gap: 8px;
		border-top: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
		border-bottom: 0;
		color: color-mix(in srgb, var(--ink) 52%, transparent);
	}
	.window-foot span {
		display: grid;
		width: 17px;
		height: 17px;
		place-items: center;
		border: 1px solid color-mix(in srgb, var(--ink) 30%, transparent);
	}
	.signal-bar {
		display: flex;
		align-items: center;
		gap: 24px;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		padding: 20px 0;
	}
	.signal-bar p {
		color: color-mix(in srgb, var(--ink) 60%, transparent);
		font-size: 10px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.story-section,
	.process-section,
	.notes-section {
		padding: 136px 0;
	}
	.section-index {
		padding-bottom: 38px;
		border-bottom: 1px solid var(--line);
	}
	.story-heading {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		padding: 50px 0 76px;
	}
	h2 {
		font-size: clamp(40px, 5vw, 70px);
		font-weight: 650;
		letter-spacing: -0.075em;
		line-height: 0.95;
	}
	.story-heading p,
	.process-intro p {
		max-width: 290px;
		align-self: end;
		color: color-mix(in srgb, var(--ink) 60%, transparent);
		font-size: 14px;
		line-height: 1.5;
	}
	.feature-grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr 1fr;
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}
	.feature-grid article {
		min-height: 270px;
		background: var(--paper);
		padding: 28px;
	}
	.feature-featured {
		background: var(--ink) !important;
		color: var(--paper);
	}
	.feature-icon {
		display: grid;
		width: 34px;
		height: 34px;
		place-items: center;
		margin-bottom: 75px;
		background: var(--lime);
		color: var(--ink);
	}
	.feature h3 {
		max-width: 220px;
		margin-bottom: 15px;
		font-size: 21px;
		font-weight: 650;
		letter-spacing: -0.055em;
		line-height: 1;
	}
	.feature p {
		max-width: 230px;
		color: color-mix(in srgb, currentColor 62%, transparent);
		font-size: 13px;
		line-height: 1.45;
	}
	.feature-line {
		margin: 33px 0 14px;
		border-top: 1px solid color-mix(in srgb, var(--paper) 20%, transparent);
	}
	.feature-caption {
		color: color-mix(in srgb, var(--paper) 50%, transparent);
	}
	.feature-number {
		display: block;
		margin-bottom: 84px;
		color: color-mix(in srgb, var(--ink) 45%, transparent);
		font-size: 11px;
	}
	.process-section {
		background: var(--ink);
		color: var(--paper);
		margin: 0 calc((100vw - min(1180px, calc(100vw - 64px))) / -2);
		padding-right: max(32px, calc((100vw - min(1180px, calc(100vw - 64px))) / 2));
		padding-left: max(32px, calc((100vw - min(1180px, calc(100vw - 64px))) / 2));
	}
	.process-section .section-index {
		color: color-mix(in srgb, var(--paper) 55%, transparent);
		border-color: color-mix(in srgb, var(--paper) 20%, transparent);
	}
	.process-intro {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;
		padding: 50px 0 86px;
	}
	.process-intro p {
		color: color-mix(in srgb, var(--paper) 58%, transparent);
	}
	.process-intro em {
		color: var(--lime);
		font-style: normal;
	}
	.process-steps {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr;
		align-items: start;
		gap: 24px;
	}
	.process-step strong {
		display: block;
		margin-bottom: 50px;
		color: var(--lime);
		font-size: 12px;
	}
	.process-step span {
		font-size: 12px;
		font-weight: 700;
	}
	.process-step p {
		margin-top: 13px;
		max-width: 170px;
		color: color-mix(in srgb, var(--paper) 52%, transparent);
		font-size: 13px;
		line-height: 1.45;
	}
	.process-connector {
		width: 70px;
		margin-top: 5px;
		border-top: 1px dashed color-mix(in srgb, var(--paper) 30%, transparent);
	}
	.notes-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		padding: 50px 0 36px;
	}
	.notes-heading a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--ink);
		font-size: 12px;
		font-weight: 700;
	}
	.notes-list {
		border-top: 1px solid var(--line);
	}
	.note-row {
		display: grid;
		grid-template-columns: 110px 1fr auto;
		align-items: center;
		gap: 20px;
		border-bottom: 1px solid var(--line);
		padding: 21px 0;
		color: var(--ink);
		text-decoration: none;
	}
	.note-row span {
		color: color-mix(in srgb, var(--ink) 48%, transparent);
		font-size: 10px;
	}
	.note-row strong {
		font-size: 15px;
		font-weight: 550;
		letter-spacing: -0.025em;
	}
	.note-row :global(svg) {
		opacity: 0.45;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}
	.note-row:hover :global(svg),
	.note-row:focus-visible :global(svg) {
		opacity: 1;
		transform: translate(3px, -3px);
	}
	.contact-section {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 140px 20px 150px;
		background: var(--lime);
		text-align: center;
	}
	.contact-section h2 {
		position: relative;
		margin: 23px 0 24px;
		font-size: clamp(46px, 7vw, 92px);
	}
	.contact-section > p:not(.eyebrow) {
		position: relative;
		max-width: 400px;
		color: color-mix(in srgb, var(--ink) 67%, transparent);
		font-size: 15px;
		line-height: 1.5;
	}
	.contact-section .button {
		position: relative;
		margin-top: 31px;
	}
	.contact-orbit {
		position: absolute;
		border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent);
		border-radius: 50%;
	}
	.orbit-one {
		width: 650px;
		height: 290px;
		transform: rotate(-22deg);
	}
	.orbit-two {
		width: 900px;
		height: 380px;
		transform: rotate(22deg);
	}
	.site-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px 0;
	}
	.site-footer p {
		color: color-mix(in srgb, var(--ink) 48%, transparent);
		font-size: 11px;
	}
	:global(.site-footer footer) {
		padding: 0 !important;
	}
	:global(.site-footer footer > div) {
		padding: 0 !important;
	}
	:global(:focus-visible) {
		outline: 2px solid #697d15;
		outline-offset: 4px;
	}
	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			scroll-behavior: auto !important;
			transition-duration: 0.01ms !important;
		}
	}
	@media (max-width: 760px) {
		.site-nav,
		main,
		.site-footer {
			width: min(100% - 36px, 560px);
		}
		.site-nav {
			min-height: 74px;
		}
		.nav-links {
			position: absolute;
			z-index: 10;
			top: 74px;
			right: 18px;
			left: 18px;
			display: none;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			padding: 10px 18px;
			border: 1px solid var(--ink);
			background: var(--paper);
		}
		.nav-links.open {
			display: flex;
		}
		.nav-links a {
			padding: 13px 0;
			border-bottom: 1px solid var(--line);
		}
		.nav-links a:last-child {
			border: 0;
		}
		.nav-cta {
			display: none;
		}
		.menu-toggle {
			display: inline-flex;
		}
		.hero {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			padding: 72px 0 88px;
		}
		h1 {
			font-size: clamp(52px, 15vw, 82px);
		}
		.agent-window {
			margin: 15px 9px 0 0;
		}
		.window-body {
			min-height: 300px;
		}
		.window-main {
			padding: 36px 8%;
		}
		.signal-bar {
			gap: 12px;
		}
		.signal-bar p {
			font-size: 8px;
		}
		.story-section,
		.process-section,
		.notes-section {
			padding: 90px 0;
		}
		.story-heading,
		.process-intro {
			display: flex;
			flex-direction: column;
			gap: 28px;
			padding: 34px 0 52px;
		}
		.feature-grid {
			display: block;
		}
		.feature-grid article {
			min-height: auto;
			border-bottom: 1px solid var(--line);
		}
		.feature-icon,
		.feature-number {
			margin-bottom: 45px;
		}
		.process-section {
			margin-right: -18px;
			margin-left: -18px;
			padding-right: 18px;
			padding-left: 18px;
		}
		.process-steps {
			display: flex;
			flex-direction: column;
			gap: 24px;
		}
		.process-step strong {
			margin-bottom: 20px;
		}
		.process-connector {
			width: 35px;
		}
		.notes-heading {
			align-items: start;
			flex-direction: column;
			gap: 24px;
		}
		.note-row {
			grid-template-columns: 72px 1fr auto;
			gap: 10px;
		}
		.note-row strong {
			font-size: 13px;
		}
		.contact-section {
			margin: 0 -18px;
			padding: 100px 18px 110px;
		}
		.site-footer {
			align-items: start;
			flex-wrap: wrap;
			gap: 18px;
		}
		.site-footer p {
			order: 3;
			width: 100%;
		}
	}

	/* Aurora Field redesign: one ink color, with hierarchy supplied by scale and space. */
	:global(:root) {
		--ink: #eaf2ff;
		--paper: #07111f;
		--lime: #30d6e6;
		--line: rgb(234 242 255 / 0.16);
		--aurora: linear-gradient(118deg, #465dff 0%, #30d6e6 48%, #966bff 100%);
	}
	:global(body),
	.landing-shell {
		background: var(--paper);
		color: var(--ink);
	}
	.landing-shell :is(a, button, h1, h2, h3, p, span, strong, b, em, i) {
		color: var(--ink) !important;
	}
	.site-nav {
		min-height: 78px;
	}
	.wordmark-mark {
		border-radius: 8px;
		background: var(--aurora);
	}
	.hero {
		position: relative;
		isolation: isolate;
		min-height: calc(100svh - 78px);
		margin: 0 calc((100vw - min(1180px, calc(100vw - 64px))) / -2);
		padding-right: max(32px, calc((100vw - min(1180px, calc(100vw - 64px))) / 2));
		padding-left: max(32px, calc((100vw - min(1180px, calc(100vw - 64px))) / 2));
		background:
			radial-gradient(circle at 78% 24%, rgb(48 214 230 / 0.31), transparent 23rem),
			radial-gradient(circle at 20% 92%, rgb(150 107 255 / 0.35), transparent 30rem), #07111f;
	}
	.hero::after,
	.contact-section::after {
		position: absolute;
		z-index: -1;
		inset: auto 0 0;
		height: 5px;
		background: var(--aurora);
		content: '';
	}
	.hero-copy {
		animation: hero-copy-in 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.agent-window {
		border-color: rgb(234 242 255 / 0.4);
		background: rgb(7 17 31 / 0.76);
		box-shadow: 20px 22px 70px rgb(48 214 230 / 0.2);
		backdrop-filter: blur(18px);
		animation: hero-window-in 900ms 120ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.window-sidebar,
	.window-main,
	.window-chrome,
	.window-foot,
	.feature-grid article {
		background: rgb(7 17 31 / 0.7) !important;
	}
	.button,
	.nav-cta {
		border: 1px solid rgb(234 242 255 / 0.45) !important;
		background: transparent !important;
	}
	.button-primary {
		border-color: transparent !important;
		background: var(--aurora) !important;
	}
	.button:hover,
	.button:focus-visible {
		box-shadow: 0 10px 28px rgb(48 214 230 / 0.22);
	}
	.signal-bar {
		position: relative;
		min-height: 76px;
		border-color: rgb(234 242 255 / 0.18);
	}
	.story-section {
		background-image:
			linear-gradient(rgb(234 242 255 / 0.045) 1px, transparent 1px),
			linear-gradient(90deg, rgb(234 242 255 / 0.045) 1px, transparent 1px);
		background-size: 36px 36px;
	}
	.feature-grid {
		background: rgb(234 242 255 / 0.16);
		border-color: rgb(234 242 255 / 0.16);
	}
	.feature-grid article,
	.feature-featured {
		border-radius: 0 !important;
	}
	.feature-icon {
		border-radius: 8px;
		background: var(--aurora);
	}
	.process-section {
		background: linear-gradient(90deg, rgb(70 93 255 / 0.16), transparent 44%), #07111f;
	}
	.process-connector {
		border-color: rgb(48 214 230 / 0.75);
	}
	.notes-section {
		background: #0a1626;
	}
	.contact-section {
		background:
			radial-gradient(circle at 50% 30%, rgb(234 242 255 / 0.2), transparent 22rem), var(--aurora);
	}
	.site-footer {
		min-height: 92px;
	}
	:global(:focus-visible) {
		outline-color: var(--ink);
	}
	:global(.motion-ready) .chapter:not(.is-visible) {
		opacity: 0;
		transform: translateY(36px);
	}
	.chapter {
		transition:
			opacity 650ms ease,
			transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	.chapter.is-visible {
		opacity: 1;
		transform: translateY(0);
	}
	@keyframes hero-copy-in {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes hero-window-in {
		from {
			opacity: 0;
			transform: translate(28px, 24px) rotate(1.2deg);
		}
		to {
			opacity: 1;
			transform: translate(0, 0) rotate(1.2deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-copy,
		.agent-window {
			animation: none;
		}
		:global(.motion-ready) .chapter:not(.is-visible) {
			opacity: 1;
			transform: none;
		}
	}
	@media (max-width: 760px) {
		.hero {
			min-height: auto;
			margin-right: -18px;
			margin-left: -18px;
			padding-right: 18px;
			padding-left: 18px;
		}
	}

	/* Interaction feedback: controls always acknowledge attention without competing with the content. */
	.integration-rail {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		gap: 8px;
		overflow-x: auto;
		padding: 7px 0;
		scroll-snap-type: x mandatory;
	}
	.integration-chip,
	.billing-toggle button {
		flex: 0 0 auto;
		border: 1px solid rgb(234 242 255 / 0.24);
		border-radius: 999px;
		background: rgb(234 242 255 / 0.05);
		padding: 8px 12px;
		font: inherit;
		font-size: 10px;
		font-weight: 650;
		letter-spacing: 0.04em;
		scroll-snap-align: start;
		transition:
			transform 180ms ease,
			background-color 180ms ease,
			border-color 180ms ease;
	}
	.integration-chip span {
		display: inline-block;
		margin-left: 5px;
		transition: transform 180ms ease;
	}
	.integration-chip:hover,
	.integration-chip:focus-visible,
	.billing-toggle button:hover,
	.billing-toggle button:focus-visible,
	.billing-toggle button.active {
		border-color: rgb(234 242 255 / 0.75);
		background: rgb(234 242 255 / 0.14);
		transform: translateY(-2px);
	}
	.integration-chip:hover span,
	.integration-chip:focus-visible span {
		transform: translate(2px, -2px);
	}
	.feature-grid article,
	.note-row,
	.process-step,
	.agent-window {
		transition:
			transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
			border-color 240ms ease,
			box-shadow 240ms ease,
			background-color 240ms ease;
	}
	.feature-grid article:hover,
	.feature-grid article:focus-within,
	.process-step:hover,
	.agent-window:hover {
		transform: translateY(-7px);
		box-shadow: 0 18px 40px rgb(48 214 230 / 0.12);
	}
	.note-row:hover,
	.note-row:focus-visible {
		padding-right: 12px;
		padding-left: 12px;
		background: rgb(234 242 255 / 0.05);
	}
	.pricing-section {
		padding: 136px 0;
		background: linear-gradient(180deg, #0a1626, #07111f);
	}
	.pricing-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 32px;
		padding: 52px 0;
	}
	.pricing-heading h2 {
		max-width: 600px;
	}
	.billing-toggle {
		display: flex;
		gap: 6px;
		padding: 4px;
		border: 1px solid rgb(234 242 255 / 0.18);
		border-radius: 999px;
	}
	.billing-toggle button {
		border-color: transparent;
		background: transparent;
	}
	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		border: 1px solid rgb(234 242 255 / 0.16);
		background: rgb(234 242 255 / 0.16);
	}
	.pricing-grid article {
		display: flex;
		min-height: 290px;
		flex-direction: column;
		align-items: flex-start;
		padding: 30px;
		background: #07111f;
		transition:
			transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
			background-color 240ms ease;
	}
	.pricing-grid article:hover,
	.pricing-grid article:focus-within {
		background: #0d2036;
		transform: translateY(-8px);
	}
	.pricing-grid article.featured {
		background: linear-gradient(145deg, rgb(70 93 255 / 0.38), rgb(48 214 230 / 0.14));
	}
	.pricing-grid article > p {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
	}
	.pricing-grid strong {
		margin: 34px 0 12px;
		font-size: 26px;
		letter-spacing: -0.05em;
	}
	.pricing-grid article > span {
		font-size: 13px;
		line-height: 1.45;
	}
	.pricing-grid a {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: auto;
		border-bottom: 1px solid rgb(234 242 255 / 0.55);
		padding-bottom: 5px;
		font-size: 12px;
		font-weight: 700;
		text-decoration: none;
		transition:
			gap 180ms ease,
			border-color 180ms ease;
	}
	.pricing-grid a:hover,
	.pricing-grid a:focus-visible {
		gap: 13px;
		border-color: var(--ink);
	}
	@media (max-width: 760px) {
		.signal-bar {
			align-items: start;
			flex-direction: column;
		}
		.integration-rail {
			width: 100%;
			justify-content: start;
		}
		.pricing-section {
			padding: 90px 0;
		}
		.pricing-heading {
			align-items: start;
			flex-direction: column;
			padding: 35px 0;
		}
		.pricing-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Shared surface language: future panels should inherit --surface-radius, not invent a new radius. */
	:global(:root) {
		--surface-radius: 18px;
		--control-radius: 12px;
		--landing-font: ui-rounded, 'Arial Rounded MT Bold', 'Trebuchet MS', sans-serif;
	}
	.landing-shell {
		font-family: var(--landing-font);
	}
	.landing-shell :is(h1, h2, h3, .wordmark, .footer-brand) {
		font-family: var(--landing-font);
		font-weight: 650;
		letter-spacing: -0.065em;
	}
	.landing-shell :is(p, a, button, span, strong, b) {
		font-family: var(--landing-font);
	}
	.agent-window,
	.feature-grid,
	.feature-grid article,
	.pricing-grid,
	.pricing-grid article,
	.contact-section,
	.nav-links {
		border-radius: var(--surface-radius) !important;
	}
	.feature-grid,
	.pricing-grid {
		overflow: hidden;
	}
	.button,
	.nav-cta,
	.menu-toggle,
	.billing-toggle {
		border-radius: var(--control-radius) !important;
	}
	.window-chrome {
		border-radius: calc(var(--surface-radius) - 1px) calc(var(--surface-radius) - 1px) 0 0;
	}
	.window-foot {
		border-radius: 0 0 calc(var(--surface-radius) - 1px) calc(var(--surface-radius) - 1px);
	}
	.note-row:hover,
	.note-row:focus-visible {
		border-radius: var(--control-radius);
	}
</style>
