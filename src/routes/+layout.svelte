<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sonner from '$lib/components/ui/sonner/sonner.svelte';
	import { initPetalInteractivity } from '$lib/petals.js';

	let { children } = $props();

	onMount(() => {
		initPetalInteractivity();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

<Sonner position="top-center" richColors />