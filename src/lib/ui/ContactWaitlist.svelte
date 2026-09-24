<script lang="ts">
	import { onMount } from 'svelte';
	import type { Root } from 'react-dom/client';
	import { closingCta } from '$lib/content/landing';
	import 'performative-ui/styles.css';

	let host: HTMLDivElement;
	let root: Root | null = null;

	onMount(() => {
		let cancelled = false;

		async function mountContactForm() {
			const [{ createElement }, { createRoot }, { WaitlistForm }] = await Promise.all([
				import('react'),
				import('react-dom/client'),
				import('performative-ui')
			]);

			if (cancelled || !host) {
				return;
			}

			root = createRoot(host);
			root.render(
				createElement(WaitlistForm, {
					placeholder: closingCta.formPlaceholder,
					ctaLabel: closingCta.formLabel,
					footnote: closingCta.formFootnote,
					className: 'arcten-contact-form',
					onSubmit: (email: string) => {
						const subject = encodeURIComponent(closingCta.emailSubject);
						const body = encodeURIComponent(`Work email: ${email}\n\n${closingCta.emailPrompt}\n`);
						window.location.href = `mailto:founders@arcten.com?subject=${subject}&body=${body}`;
					}
				})
			);
		}

		void mountContactForm();

		return () => {
			cancelled = true;
			root?.unmount();
			root = null;
		};
	});
</script>

<div bind:this={host} class="contact-host"></div>

<style>
	.contact-host {
		--pui-fg: var(--foreground);
		--pui-fg-dim: var(--muted);
		--pui-fg-mute: color-mix(in srgb, var(--muted) 72%, var(--background));
		--pui-border-bright: color-mix(in srgb, var(--foreground) 12%, transparent);
		--pui-glass-soft: color-mix(in srgb, var(--background) 76%, transparent);
		--pui-grad: var(--brand);
		width: 100%;
	}

	:global(.contact-host .arcten-contact-form) {
		max-width: 560px;
	}

	:global(.contact-host .pui-waitlist) {
		background: color-mix(in srgb, var(--background) 88%, transparent);
		box-shadow: 0 12px 36px rgb(15 23 42 / 0.06);
	}

	:global(.contact-host .pui-btn) {
		border-radius: 999px;
		background: var(--brand);
		color: white;
	}
</style>
