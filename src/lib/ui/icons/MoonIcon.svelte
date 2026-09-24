<script lang="ts">
	import { Moon } from 'lucide-svelte';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<Moon class={className} size={14} strokeWidth={2} aria-hidden="true" />
