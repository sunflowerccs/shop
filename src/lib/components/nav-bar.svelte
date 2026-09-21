<script lang="ts">
	import { onMount } from "svelte";
	import { business } from "$lib/config.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import ShoppingBagIcon from "@lucide/svelte/icons/shopping-bag";
	import logoSrc from "$lib/assets/img/logo.jpg";

	let { onOpenCart }: { onOpenCart: () => void } = $props();

	let scrolled = $state(false);

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 320;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	});
</script>

<div
	class="fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out {scrolled
		? 'translate-y-0'
		: '-translate-y-[calc(100%+12px)]'}"
>
	<div class="px-3 pt-3 sm:px-6">
		<header class="shadow-sm backdrop-blur-md bg-background/80 mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border py-1.5 ps-1.5 pe-1">
			<div class="flex min-w-0 items-center gap-2.5">
				<img src={logoSrc} alt={`Logo de ${business.name}`} class="size-8 shrink-0 rounded-full object-cover" />
				<span class="truncate text-sm font-semibold tracking-tight">
					<span class="font-serif italic">Sun</span><span class="text-sunflower">flower</span>
				</span>
			</div>
			<Button size="sm" variant="outline" onclick={onOpenCart} class="rounded-full">
				<ShoppingBagIcon data-icon="inline-start" />
				Mi pedido
			</Button>
		</header>
	</div>
</div>