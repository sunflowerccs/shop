<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from "$lib/components/ui/dialog/index.js";
	import { Field, FieldLabel } from "$lib/components/ui/field/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { buildQuoteWhatsAppLink } from "$lib/checkout.js";
	import { toast } from "svelte-sonner";
	import { reveal } from "$lib/actions/scroll.js";
	import { rainPetals } from "$lib/petals.js";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import Flower2Icon from "@lucide/svelte/icons/flower-2";

	let open = $state(false);

	let name = $state("");
	let details = $state("");

	let canSend = $derived(name.trim() !== "" && details.trim() !== "");

	function submit() {
		if (!canSend) return;
		const url = buildQuoteWhatsAppLink(name, details);
		window.open(url, "_blank", "noopener,noreferrer");
		open = false;
		name = "";
		details = "";
		rainPetals(24);
		toast.success("Cotización en WhatsApp", {
			description: "Gracias por tu interés. Te responderemos con una propuesta."
		});
	}
</script>

<section class="px-4 pb-16 sm:px-6">
	<div class="reveal mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-sunflower/15 ring-1 ring-sunflower/20" use:reveal>
		<div class="relative flex flex-col items-center gap-6 px-6 py-10 text-center sm:px-12 sm:py-14">
			<div
				aria-hidden="true"
				class="animate-float absolute -end-16 -top-16 size-56 rounded-full bg-sunflower/30 blur-3xl"
			></div>

			<span class="flex size-12 items-center justify-center rounded-xl bg-sunflower text-sunflower-foreground shadow-md">
				<Flower2Icon class="size-6" />
			</span>

			<div class="flex max-w-lg flex-col gap-2">
				<h2 class="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
					¿Buscas algo a tu medida?
				</h2>
				<p class="text-pretty text-sm text-muted-foreground sm:text-base">
					Contamos tu idea (ocasión, flores, colores, presupuesto) y armamos el arreglo perfecto. Cotizamos
					sin compromiso por WhatsApp.
				</p>
			</div>

			<Button
				size="lg"
				onclick={() => (open = true)}
				class="bg-sunflower px-6 text-sunflower-foreground shadow-[0_10px_30px_-10px_var(--sunflower)] hover:bg-sunflower/80"
			>
				<MessageCircleIcon data-icon="inline-start" />
				Cotizar arreglo personalizado
			</Button>
		</div>
	</div>
</section>

<Dialog bind:open>
	<DialogContent class="sm:max-w-md">
		<DialogHeader>
			<DialogTitle>Cotiza tu arreglo personalizado</DialogTitle>
			<DialogDescription>
				Cuéntanos qué tienes en mente y te respondemos con una propuesta y precio.
			</DialogDescription>
		</DialogHeader>

		<form
			onsubmit={(event) => {
				event.preventDefault();
				submit();
			}}
			class="flex flex-col gap-4"
		>
			<Field>
				<FieldLabel>Tu nombre</FieldLabel>
				<Input bind:value={name} placeholder="Ej: María" aria-label="Tu nombre" />
			</Field>

			<Field>
				<FieldLabel>Cuéntanos tu idea</FieldLabel>
				<Textarea
					bind:value={details}
					placeholder="Ocasión, tipo de flores, colores, fecha, presupuesto aproximado..."
					aria-label="Detalles del arreglo"
					class="min-h-32"
				/>
			</Field>
		</form>

		<DialogFooter>
			<Button variant="ghost" onclick={() => (open = false)}>
				Cancelar
			</Button>
			<Button
				disabled={!canSend}
				onclick={submit}
				class="bg-sunflower text-sunflower-foreground hover:bg-sunflower/80"
			>
				<MessageCircleIcon data-icon="inline-start" />
				Cotizar por WhatsApp
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>