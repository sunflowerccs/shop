<script lang="ts">
	import { business } from "$lib/config.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { parallax } from "$lib/actions/scroll.js";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import ArrowDownIcon from "@lucide/svelte/icons/arrow-down";
	import logoSrc from "$lib/assets/img/logo.jpg";

	let { onOpenCart }: { onOpenCart: () => void } = $props();
</script>

<section
	class="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-18 pb-12 text-center"
	use:parallax={{ strength: 90 }}
>
	<div
		aria-hidden="true"
		class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--sunflower)_0%,rgba(255,255,255,0)_58%)]"
	></div>
	<div
		aria-hidden="true"
		class="animate-float absolute -start-24 -top-24 size-72 rounded-full bg-sunflower/25 blur-3xl"
	></div>
	<div
		aria-hidden="true"
		class="animate-float absolute -end-28 top-1/3 size-80 rounded-full bg-amber-300/25 blur-3xl"
		style="animation-delay: 2.5s"
	></div>

	<div class="relative mx-auto flex max-w-6xl flex-col items-center">
		<div class="animate-rise relative mb-8 size-40 sm:size-48" style="animation-delay: 0ms">
			<div
				aria-hidden="true"
				class="animate-sun-rotate absolute -inset-4 rounded-full border-2 border-dashed border-sunflower/50"
			></div>
			<div aria-hidden="true" class="absolute inset-4 rounded-full bg-sunflower/40 blur-2xl"></div>
			<img
				src={logoSrc}
				alt={`Logo de ${business.name}`}
				class="shadow-2xl ring-4 ring-sunflower/40 relative size-full rounded-full object-cover"
			/>
		</div>

		<Badge variant="secondary" class="animate-rise mb-5 gap-1.5 rounded-full px-3 py-1" style="animation-delay: 120ms">
			<span class="animate-pulse size-1.5 rounded-full bg-sunflower"></span>
			Pedidos directos por WhatsApp
		</Badge>

		<h1 class="animate-rise text-5xl font-semibold tracking-tight text-balance sm:text-7xl" style="animation-delay: 220ms">
			<span class="font-serif italic">Sun</span><span class="text-sunflower">flower</span>
		</h1>

		<p class="animate-rise mt-4 max-w-md text-base text-pretty text-muted-foreground sm:text-lg" style="animation-delay: 320ms">
			{business.slogan} — arreglos florales artesanales que alegran cualquier día.
		</p>

		<div class="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style="animation-delay: 420ms">
			<Button
				size="lg"
				class="bg-sunflower px-6 text-sunflower-foreground shadow-[0_10px_30px_-10px_var(--sunflower)] hover:bg-sunflower/80"
				onclick={() => document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })}
			>
				Ver catálogo
			</Button>
			<Button size="lg" variant="outline" class="px-6" onclick={onOpenCart}>
				<MessageCircleIcon data-icon="inline-start" />
				Mi pedido
			</Button>
		</div>

		<div
			class="animate-rise mt-14 flex flex-col items-center gap-1 text-muted-foreground"
			style="animation-delay: 520ms"
		>
			<span class="text-xs font-medium uppercase tracking-[0.25em]">Desliza para descubrir</span>
			<ArrowDownIcon class="animate-bounce size-4" />
		</div>
	</div>
</section>