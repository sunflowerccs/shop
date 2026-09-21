<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import Sonner from '$lib/components/ui/sonner/sonner.svelte';
	import { initPetalInteractivity } from '$lib/petals.js';

	let { children } = $props();

	onMount(() => {
		initPetalInteractivity();
	});
</script>

{@render children()}

<Sonner position="top-center" richColors />