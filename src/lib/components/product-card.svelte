<script lang="ts">
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Card, CardContent } from "$lib/components/ui/card/index.js";
	import { formatPrice } from "$lib/config.js";
	import * as cart from "$lib/cart.svelte.js";
	import type { Product } from "$lib/data/products.js";
	import { toast } from "svelte-sonner";
	import { rainPetals } from "$lib/petals.js";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import MinusIcon from "@lucide/svelte/icons/minus";

	let { product }: { product: Product } = $props();

	let qty = $derived(cart.quantityOf(product.id));

	function addOne() {
		cart.add(product.id);
		rainPetals(14);
		toast.success("Agregado al pedido", { description: product.name });
	}
</script>

{#snippet bloom(rotate: string)}
	<svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate({rotate})">
		<g style="transform: translate(12px, 12px)">
			{#each [0, 1, 2, 3, 4, 5, 6, 7] as n}
				<ellipse
					cx="0"
					cy="0"
					rx="2.8"
					ry="5.6"
					style="fill: var(--sunflower); transform: rotate({n * 45}deg) translateY(-5px);"
				/>
			{/each}
		</g>
		<circle cx="12" cy="12" r="3.8" style="fill: oklch(0.5 0.12 70)" />
	</svg>
{/snippet}

<div
	class="group/card relative h-full rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
>
	<Card class="relative h-full p-0">
		<img
			src={product.image}
			alt={product.name}
			class="transition-transform duration-500 ease-out group-hover/card:scale-[1.04] aspect-[4/3] w-full object-cover"
		/>
		{#if product.tag}
			<Badge variant="secondary" class="absolute start-3 top-3 z-10">{product.tag}</Badge>
		{/if}

		<CardContent class="flex h-full flex-col gap-3 p-4">
			<div class="flex flex-col gap-1">
				<div class="flex items-start justify-between gap-3">
					<h3 class="text-base font-medium leading-snug">{product.name}</h3>
					<p class="text-sm font-medium whitespace-nowrap tabular-nums">{formatPrice(product.price)}</p>
				</div>
				<p class="text-sm leading-snug text-muted-foreground">{product.description}</p>
			</div>

			{#if qty === 0}
				<Button
					onclick={addOne}
					class="mt-auto bg-sunflower text-sunflower-foreground hover:bg-sunflower/80"
				>
					<PlusIcon data-icon="inline-start" />
					Agregar
				</Button>
			{:else}
				<div class="mt-auto flex items-center justify-between gap-2">
					<div class="flex items-center gap-2">
						<Button
							size="icon-sm"
							variant="outline"
							onclick={() => cart.setQuantity(product.id, qty - 1)}
							aria-label="Quitar uno"
						>
							<MinusIcon />
						</Button>
						<span class="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
						<Button size="icon-sm" variant="outline" onclick={() => cart.add(product.id)} aria-label="Agregar uno">
							<PlusIcon />
						</Button>
					</div>
					<span class="text-sm font-medium tabular-nums">{formatPrice(product.price * qty)}</span>
				</div>
			{/if}
		</CardContent>
	</Card>

	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-[9px] rounded-[10px] border border-dashed border-sunflower/25 transition-colors duration-300 group-hover/card:border-sunflower/45"
	></div>

	<span
		aria-hidden="true"
		class="text-sunflower/90 pointer-events-none absolute -top-3 -start-3 drop-shadow-sm"
	>
		{@render bloom("-18deg")}
	</span>

	<span
		aria-hidden="true"
		class="text-sunflower/90 pointer-events-none absolute -bottom-3 -end-3 drop-shadow-sm"
	>
		{@render bloom("160deg")}
	</span>
</div>