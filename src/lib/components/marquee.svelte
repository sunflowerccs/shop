<script lang="ts">
	import { business } from "$lib/config.js";

	const copy = `${business.slogan} • Arreglos florales artesanales • Hechos a mano • Pedidos directos por WhatsApp • `;
</script>

<div class="relative -rotate-1 overflow-hidden bg-sunflower py-3 text-sunflower-foreground shadow-lg">
	<div class="animate-marquee flex w-max whitespace-nowrap">
		<span class="px-6 text-sm font-semibold uppercase tracking-[0.2em]">{copy}</span>
		<span class="px-6 text-sm font-semibold uppercase tracking-[0.2em]">{copy}</span>
	</div>
</div>