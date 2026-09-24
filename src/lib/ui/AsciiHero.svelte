<script lang="ts">
	import { heroAscii } from '$lib/content/hero-ascii';
</script>

<div class="ascii-hero">
	<pre
		class="text-muted"
		style="font-family: monospace; font-size: 4px; line-height: 4px; white-space: pre; margin: 0;">{heroAscii}</pre>
</div>

<style>
	.ascii-hero {
		overflow: hidden;
		-webkit-mask-image: linear-gradient(
			110deg,
			black 0%,
			black 30%,
			transparent 70%,
			transparent 100%
		);
		mask-image: linear-gradient(
			110deg,
			black 0%,
			black 30%,
			transparent 70%,
			transparent 100%
		);
		-webkit-mask-size: 300% 300%;
		mask-size: 300% 300%;
		-webkit-mask-position: 100% 100%;
		mask-position: 100% 100%;
		animation: ascii-sweep 2.4s cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
		will-change: mask-position, opacity;
	}

	@keyframes ascii-sweep {
		0% {
			-webkit-mask-position: 100% 100%;
			mask-position: 100% 100%;
			opacity: 0.35;
		}
		100% {
			-webkit-mask-position: 0% 0%;
			mask-position: 0% 0%;
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ascii-hero {
			animation: none;
			-webkit-mask-image: none;
			mask-image: none;
			opacity: 1;
		}
	}
</style>
