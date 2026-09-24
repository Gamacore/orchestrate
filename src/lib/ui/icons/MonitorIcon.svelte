<script lang="ts">
	import { Monitor } from 'lucide-svelte';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<Monitor class={className} size={14} strokeWidth={2} aria-hidden="true" />
