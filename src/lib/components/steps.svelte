<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card/index.js";
	import { reveal } from "$lib/actions/scroll.js";
	import ShoppingBagIcon from "@lucide/svelte/icons/shopping-bag";
	import ClipboardListIcon from "@lucide/svelte/icons/clipboard-list";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";

	const steps = [
		{
			title: "Elige tus arreglos",
			description: "Explora el catálogo y agrega los arreglos que más te gusten."
		},
		{
			title: "Revisa tu pedido",
			description: "Toca el botón flotante para ajustar cantidades y ver el total."
		},
		{
			title: "Envíalo por WhatsApp",
			description: "Escribe tu nombre y recibe confirmación de tu pedido al instante."
		}
	];

	const icons = [ShoppingBagIcon, ClipboardListIcon, MessageCircleIcon];
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
	<header class="reveal mb-8 flex flex-col items-center text-center" use:reveal>
		<span class="text-xs font-semibold uppercase tracking-[0.25em] text-sunflower">Fácil y rápido</span>
		<h2 class="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Pedir nunca fue tan simple</h2>
	</header>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
		{#each steps as step, i}
			{@const Icon = icons[i]}
			<div class="reveal h-full" use:reveal={{ delay: i * 120 }}>
				<Card size="sm" class="hover:-translate-y-1 h-full transition-transform duration-300 hover:shadow-lg">
					<CardContent class="flex flex-col items-start gap-4 p-4">
						<div class="flex items-center justify-between gap-3 self-stretch">
							<span class="flex size-10 items-center justify-center rounded-xl bg-sunflower/15 text-sunflower">
								<Icon class="size-5" />
							</span>
							<span class="font-serif text-4xl italic text-muted-foreground/40">{i + 1}</span>
						</div>
						<div class="flex flex-col gap-1">
							<h3 class="text-base font-medium">{step.title}</h3>
							<p class="text-sm leading-snug text-muted-foreground">{step.description}</p>
						</div>
					</CardContent>
				</Card>
			</div>
		{/each}
	</div>
</section>