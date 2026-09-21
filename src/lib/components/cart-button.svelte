<script lang="ts">
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as cart from "$lib/cart.svelte.js";
	import ShoppingBagIcon from "@lucide/svelte/icons/shopping-bag";

	let { onclick }: { onclick: () => void } = $props();
</script>

<div class="fixed end-4 bottom-4 z-40">
	<Button
		size="lg"
		onclick={onclick}
		aria-label="Abrir mi pedido"
		class="bg-sunflower text-sunflower-foreground hover:bg-sunflower/80 rounded-full shadow-lg"
	>
		<ShoppingBagIcon />
		{#if cart.itemCount() > 0}
			<span class="absolute -end-2 -top-2">
				<Badge class="bg-destructive text-white">{cart.itemCount()}</Badge>
			</span>
		{/if}
	</Button>
</div>