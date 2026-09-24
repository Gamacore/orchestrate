<script lang="ts">
	import { Send } from 'lucide-svelte';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<Send class={className} size={13} strokeWidth={2} aria-hidden="true" />
