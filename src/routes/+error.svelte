<script lang="ts">
	/* eslint-disable svelte/valid-prop-names-in-kit-pages */
	import { resolve } from '$app/paths';

	let { error, status } = $props<{
		error: App.Error & { message?: string };
		status: number;
	}>();
</script>

<svelte:head>
	<title>{status} | Arcten</title>
</svelte:head>

<div class="error-shell">
	<div class="error-card">
		<p class="status">{status}</p>
		<h1>{status === 404 ? "This page doesn't exist." : 'Something went wrong.'}</h1>
		<p>{error?.message ?? 'Try heading back to the homepage.'}</p>
		<a href={resolve('/')} class="home-link">Go home</a>
	</div>
</div>

<style>
	.error-shell {
		display: grid;
		min-height: 100vh;
		place-items: center;
		padding: 2rem;
	}

	.error-card {
		display: flex;
		max-width: 24rem;
		flex-direction: column;
		gap: 0.85rem;
		text-align: center;
	}

	.status {
		margin: 0;
		color: var(--muted);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	h1,
	p {
		margin: 0;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		letter-spacing: -0.06em;
	}

	p {
		color: var(--muted);
	}

	.home-link {
		align-self: center;
		margin-top: 0.75rem;
		border-radius: var(--home-link-radius, 0.75rem);
		background: color-mix(in srgb, var(--foreground) 8%, transparent);
		color: var(--foreground);
		padding: 0.6rem 0.85rem;
		text-decoration: none;
	}

	.home-link:hover {
		background: color-mix(in srgb, var(--foreground) 12%, transparent);
	}

	.home-link:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--foreground) 35%, transparent);
		outline-offset: 2px;
	}
</style>
