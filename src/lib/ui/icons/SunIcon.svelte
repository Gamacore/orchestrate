<script lang="ts">
	import { Sun } from 'lucide-svelte';

	let { class: className = '' } = $props<{ class?: string }>();
</script>

<Sun class={className} size={14} strokeWidth={2} aria-hidden="true" />
