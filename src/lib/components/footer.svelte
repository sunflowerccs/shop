<script lang="ts">
	import { business } from "$lib/config.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import logoSrc from "$lib/assets/img/logo.jpg";

	const waLink = `https://wa.me/${business.whatsapp}`;
</script>

<footer class="mt-6 border-t py-12">
	<div class="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
		<div class="relative">
			<div aria-hidden="true" class="animate-sun-rotate absolute -inset-2 rounded-full border border-dashed border-sunflower/40"></div>
			<img
				src={logoSrc}
				alt={`Logo de ${business.name}`}
				class="shadow-md ring-2 ring-sunflower/40 relative size-12 rounded-full object-cover"
			/>
		</div>
		<p class="mt-1 text-lg font-semibold tracking-tight">
			<span class="font-serif italic">Sun</span><span class="text-sunflower">flower</span>
		</p>
		<p class="text-sm text-muted-foreground">{business.slogan} — arreglos florales artesanales.</p>
		<a href={waLink} target="_blank" rel="noopener noreferrer" class="mt-2">
			<Button size="lg" class="bg-sunflower text-sunflower-foreground hover:bg-sunflower/80">
				<MessageCircleIcon data-icon="inline-start" />
				Pedir por WhatsApp
			</Button>
		</a>
	</div>
</footer>