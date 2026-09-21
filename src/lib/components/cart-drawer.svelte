<script lang="ts">
	import {
		Drawer,
		DrawerContent,
		DrawerDescription,
		DrawerFooter,
		DrawerHeader,
		DrawerTitle
	} from "$lib/components/ui/drawer/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "$lib/components/ui/empty/index.js";
	import { formatPrice } from "$lib/config.js";
	import * as cart from "$lib/cart.svelte.js";
	import { productById, products } from "$lib/data/products.js";
	import { buildWhatsAppOrderLink } from "$lib/checkout.js";
	import { toast } from "svelte-sonner";
	import { rainPetals } from "$lib/petals.js";
	import ShoppingBagIcon from "@lucide/svelte/icons/shopping-bag";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import MinusIcon from "@lucide/svelte/icons/minus";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";

	let { open = $bindable(false) }: { open?: boolean } = $props();

	let customerName = $state("");

	let total = $derived(
		cart.entries.reduce((sum, entry) => {
			const product = productById.get(entry.productId);
			return sum + (product ? product.price * entry.qty : 0);
		}, 0)
	);

	let canCheckout = $derived(customerName.trim() !== "" && cart.entries.length > 0);

	function checkout() {
		if (!canCheckout) return;
		const name = customerName.trim();
		const url = buildWhatsAppOrderLink(cart.entries, products, name);
		window.open(url, "_blank", "noopener,noreferrer");
		customerName = "";
		cart.clear();
		rainPetals(30);
		toast.success("Pedido abierto en WhatsApp", {
			description: `Gracias, ${name}. Te escribimos para confirmar.`
		});
	}
</script>

<Drawer bind:open>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle>Mi pedido</DrawerTitle>
			<DrawerDescription>Revisa los arreglos que elegiste y envía tu pedido por WhatsApp.</DrawerDescription>
		</DrawerHeader>

		<Separator />

		{#if cart.entries.length === 0}
			<div class="px-4 pt-2">
				<Empty>
					<EmptyMedia variant="icon">
						<ShoppingBagIcon />
					</EmptyMedia>
					<EmptyTitle>Tu pedido está vacío</EmptyTitle>
					<EmptyDescription>Agrega algunos arreglos del catálogo para comenzar.</EmptyDescription>
				</Empty>
			</div>
		{:else}
			<div class="flex max-h-[40vh] flex-col gap-3 overflow-y-auto px-4 pt-2 pb-4">
				{#each cart.entries as entry}
					{@const product = productById.get(entry.productId)}
					{#if product}
						<div class="flex items-center gap-3">
							<img
								src={product.image}
								alt={product.name}
								class="size-14 shrink-0 rounded-lg object-cover"
							/>
							<div class="flex min-w-0 flex-1 flex-col gap-1">
								<p class="truncate text-sm font-medium">{product.name}</p>
								<p class="text-xs text-muted-foreground">
									{formatPrice(product.price)} c/u
								</p>
							</div>
							<div class="flex items-center gap-1">
								<Button
									size="icon-xs"
									variant="outline"
									onclick={() => cart.setQuantity(entry.productId, entry.qty - 1)}
									aria-label="Quitar uno"
								>
									<MinusIcon />
								</Button>
								<span class="w-8 text-center text-sm font-medium tabular-nums">{entry.qty}</span>
								<Button
									size="icon-xs"
									variant="outline"
									onclick={() => cart.add(entry.productId)}
									aria-label="Agregar uno"
								>
									<PlusIcon />
								</Button>
							</div>
							<p class="w-16 text-end text-sm font-medium tabular-nums">{formatPrice(product.price * entry.qty)}</p>
							<Button
								size="icon-xs"
								variant="ghost"
								onclick={() => cart.remove(entry.productId)}
								aria-label={`Eliminar ${product.name}`}
								class="text-destructive hover:bg-destructive/10"
							>
								<Trash2Icon />
							</Button>
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<Separator />

		<DrawerFooter>
			<div class="flex items-center justify-between gap-3">
				<Input
					bind:value={customerName}
					placeholder="Tu nombre"
					aria-label="Tu nombre"
					disabled={cart.entries.length === 0}
				/>
				<p class="text-sm font-medium whitespace-nowrap text-muted-foreground">
					Total: <span class="text-foreground tabular-nums">{formatPrice(total)}</span>
				</p>
			</div>
			<Button
				size="lg"
				onclick={checkout}
				disabled={!canCheckout}
				class="bg-sunflower text-sunflower-foreground hover:bg-sunflower/80"
			>
				<MessageCircleIcon data-icon="inline-start" />
				Enviar pedido por WhatsApp
			</Button>
		</DrawerFooter>
	</DrawerContent>
</Drawer>