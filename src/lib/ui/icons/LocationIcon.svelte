<script lang="ts">
	import { MapPin } from 'lucide-svelte';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<MapPin class={className} size={13} strokeWidth={2} aria-hidden="true" />
