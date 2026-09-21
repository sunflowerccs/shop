<script lang="ts">
	import { base } from "$app/paths";
	import HomeIcon from "@lucide/svelte/icons/home";

	let { status, error }: { status: number; error: Error } = $props();

	const is404 = $derived(status === 404);
	const title = $derived(
		is404 ? "Ups… esa página se voló del ramo" : "Algo se marchitó en el camino"
	);
	const subtitle = $derived(
		is404
			? "La flor que buscas no está aquí. Quizá cambió de taller."
			: "Ocurrió un error inesperado mientras preparábamos tu arreglo. Inténtalo de nuevo."
	);
</script>

<svelte:head>
	<title>{is404 ? "Página no encontrada" : "Error en la tienda"} — Sunflower</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="flex min-h-[80dvh] flex-col items-center justify-center px-4 py-20 text-center">
	<div class="relative flex flex-col items-center" aria-hidden="true">
		<span class="ghost-404">{status}</span>

		<svg
			width="150"
			height="150"
			viewBox="0 0 24 24"
			class="relative -mt-4 animate-[blossom_6s_ease-in-out_infinite]"
		>
			<g style="transform: translate(12px, 12px)">
				{#each [0, 1, 2, 3, 4, 5, 6, 7] as n}
					<ellipse
						cx="0"
						cy="0"
						rx="3.1"
						ry="6.4"
						style="fill: var(--sunflower); transform: rotate({n * 45}deg) translateY(-5.6px)"
					/>
				{/each}
			</g>
			<circle cx="12" cy="12" r="4.2" style="fill: oklch(0.5 0.12 70)" />
		</svg>
	</div>

	<div class="relative">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-sunflower">
			{is404 ? "Ramo extraviado" : "Error inesperado"}
		</p>
		<h1 class="mt-3 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
			{title}
		</h1>
		<p class="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">{subtitle}</p>

		{#if !is404 && error && error.message}
			<p class="mt-2 font-mono text-xs text-muted-foreground/70">{error.message}</p>
		{/if}

		<div class="mt-8">
			<a
				href={base + "/"}
				class="group inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent bg-sunflower px-4 text-sm font-medium text-sunflower-foreground transition-all select-none hover:-translate-y-px hover:bg-sunflower/80 [&_svg]:size-4"
			>
				<HomeIcon />
				Volver a la tienda
			</a>
		</div>
	</div>
</section>

{#each [3, 17, 31, 45, 62, 78, 90] as left, i}
	<span
		aria-hidden="true"
		class="drift"
		style={`left:${left}%;top:${[8, 68, 24, 78, 14, 58, 34][i]}%;animation-delay:${i * 1.3}s;animation-duration:${8 + (i % 3) * 2}s;transform:rotate(${i * 47}deg)`}
	></span>
{/each}

<style>
	.ghost-404 {
		pointer-events: none;
		font-size: clamp(9rem, 26vw, 16rem);
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 1;
		color: transparent;
		-webkit-text-stroke: 1.5px color-mix(in oklab, var(--sunflower) 45%, transparent);
		opacity: 0.6;
	}

	.drift {
		position: absolute;
		width: 14px;
		height: 30px;
		background: linear-gradient(165deg, #ffd868 0%, #f0a11e 80%);
		border-radius: 60% 60% 50% 55% / 80% 80% 25% 25%;
		opacity: 0;
		animation: drift 9s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes blossom {
		0%,
		100% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(4deg);
		}
	}

	@keyframes drift {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 0.45;
		}
		100% {
			transform: translate3d(-140px, 220px, 0) rotate(320deg);
			opacity: 0;
		}
	}
</style>