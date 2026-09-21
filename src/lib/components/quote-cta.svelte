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
	import { Card, CardContent } from "$lib/components/ui/card/index.js";
	import { buildQuoteWhatsAppLink } from "$lib/checkout.js";
	import { toast } from "svelte-sonner";
	import { rainPetals } from "$lib/petals.js";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import Flower2Icon from "@lucide/svelte/icons/flower-2";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";

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

<div
	class="group/card relative h-full rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
>
	<Card class="relative h-full overflow-hidden p-0">
		<CardContent class="flex h-full flex-col gap-5 p-6">
			<div class="flex flex-col gap-3">
				<span class="text-xs font-semibold uppercase tracking-[0.25em] text-sunflower">A medida</span>
				<h3 class="text-2xl font-semibold leading-tight tracking-tight text-balance">
					¿Buscas algo único para tu ocasión?
				</h3>
				<p class="text-pretty text-sm leading-relaxed text-muted-foreground">
					Cuéntanos tu idea: la ocasión, tus flores favoritas, los colores, la fecha y un presupuesto
					aproximado. Con eso, nosotros diseñamos un arreglo exclusivo pensado para ti.
				</p>
			</div>

			<div class="h-px w-14 bg-sunflower/40"></div>

			<ul class="flex flex-col gap-3">
				<li class="flex items-start gap-3 text-sm">
					<span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sunflower/15">
						<Flower2Icon class="size-3.5 text-sunflower" />
					</span>
					<p class="leading-relaxed text-muted-foreground">
						<strong class="font-medium text-foreground">Diseño único</strong> para tu ocasión, sin replicar arreglos del catálogo.
					</p>
				</li>
				<li class="flex items-start gap-3 text-sm">
					<span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sunflower/15">
						<SparklesIcon class="size-3.5 text-sunflower" />
					</span>
					<p class="leading-relaxed text-muted-foreground">
						<strong class="font-medium text-foreground">Flores y colores</strong> según tu gusto, fecha y presupuesto.
					</p>
				</li>
				<li class="flex items-start gap-3 text-sm">
					<span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sunflower/15">
						<MessageCircleIcon class="size-3.5 text-sunflower" />
					</span>
					<p class="leading-relaxed text-muted-foreground">
						<strong class="font-medium text-foreground">Respuesta rápida</strong> por WhatsApp con una propuesta clara.
					</p>
				</li>
			</ul>

			<p class="text-xs italic leading-relaxed text-muted-foreground/80">
				La cotización es totalmente gratis y sin ningún compromiso.
			</p>

			<Button
				onclick={() => (open = true)}
				class="mt-auto w-full bg-sunflower text-sunflower-foreground hover:bg-sunflower/80"
			>
				<MessageCircleIcon data-icon="inline-start" />
				Cotizar a medida
			</Button>
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
		<svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(-18deg)">
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
	</span>

	<span
		aria-hidden="true"
		class="text-sunflower/90 pointer-events-none absolute -bottom-3 -end-3 drop-shadow-sm"
	>
		<svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(160deg)">
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
	</span>
</div>

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