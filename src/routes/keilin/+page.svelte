<script lang="ts">
	import { base } from "$app/paths";

	type Petal = { angle: number; cw: number; ph: number; outer: boolean };
	type Fall = { left: number; delay: number; dur: number; drift: number; scale: number; rot: number };
	type Orb = { side: number; size: number; gap: number; dur: number; delay: number };

	const rings: Petal[] = (() => {
		const out: Petal[] = [];
		const count = 13;
		for (let ring = 0; ring < 2; ring++) {
			const outer = ring === 1;
			for (let i = 0; i < count; i++) {
				const factor = 1 + 0.07 * (i % 3);
				out.push({
					angle: (i / count) * 360 + (outer ? 180 / count : 0),
					cw: Math.round((outer ? 96 : 68) * factor),
					ph: Math.round((outer ? 200 : 150) * factor),
					outer
				});
			}
		}
		return out;
	})();

	const falls: Fall[] = Array.from({ length: 8 }, (_, i) => ({
		left: 5 + i * 12.5,
		delay: i * 1.7,
		dur: 9.5 + (i % 3) * 2.5,
		drift: i % 2 === 0 ? -46 : 46,
		scale: 0.55 + (i % 4) * 0.22,
		rot: i * 47
	}));

	const orbs: Orb[] = Array.from({ length: 9 }, (_, i) => ({
		side: i % 2 === 0 ? -1 : 1,
		size: 5 + (i % 3) * 3,
		gap: (i / 9) * 360,
		dur: 15 + (i % 4) * 4,
		delay: i * 0.9
	}));
</script>

<svelte:head>
	<title>Para Keilin De Arvelo</title>
	<meta name="robots" content="noindex" />
	<meta name="description" content="Porque para ti, una flor que no se marchita." />
</svelte:head>

<div class="page">
	<a href={base + "/"} class="back">← Volver al catálogo</a>

	<div aria-hidden="true" class="aura">
		<div class="orb" style={`left:${falls[0].left}%;top:18%;animation-duration:${orbs[0].dur}s`}></div>
		<div class="orb" style={`left:85%;top:30%;animation-duration:${orbs[1].dur}s`}></div>
		<div class="orb" style={`left:12%;top:70%;animation-duration:${orbs[2].dur}s`}></div>
		<div class="orb" style={`left:78%;top:78%;animation-duration:${orbs[3].dur}s`}></div>
	</div>

	{#each falls as f}
		<div
			aria-hidden="true"
			class="fall"
			style={`left:${f.left}%;--drift:${f.drift}px;--scale:${f.scale};animation-duration:${f.dur}s;animation-delay:${f.delay}s;animation-iteration-count:infinite;--pe:${f.rot}deg`}
		></div>
	{/each}

	<main class="stage">
		<div class="bloom-shell">
			<div class="bloom" aria-label="Girasol eterno para Keilin">
				<div aria-hidden="true" class="halo"></div>

				<div aria-hidden="true" class="stem-wrap">
					<div class="stem"></div>
					<div class="leaf leaf-l"></div>
					<div class="leaf leaf-r"></div>
				</div>

				<div aria-hidden="true" class="head-wrap">
				<div class="petals">
					{#each rings as p}
						<span
							class="petal {p.outer ? "outer" : ""}"
							style={`--angle:${p.angle}deg;--cw:${p.cw}px;--ph:${p.ph}px;animation-delay:${-(p.angle * 0.012).toFixed(2)}s`}
						></span>
					{/each}
				</div>

				<div class="disk">
					<div class="seeds"></div>
					<div class="shine"></div>
				</div>
			</div>
			</div>
			</div>

		<div class="message">
			<p class="eyebrow rise" style="animation-delay:.5s">F L O R &nbsp; E T E R N A</p>
			<h1 class="title rise" style="animation-delay:.8s">Para Keilin De Arvelo</h1>
			<div class="divider rise" style="animation-delay:1.1s">
				<span></span>
				<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
					<g style="transform:translate(12px,12px)">
						{#each [0, 1, 2, 3, 4, 5, 6, 7] as n}
							<ellipse
								cx="0"
								cy="0"
								rx="2.6"
								ry="5.2"
								style="fill:#f5c518;transform:rotate({n * 45}deg) translateY(-4.6px)"
							/>
						{/each}
					</g>
					<circle cx="12" cy="12" r="3.4" style="fill:#3a2609" />
				</svg>
				<span></span>
			</div>
			<p class="subtitle rise" style="animation-delay:1.35s">
				una flor que no se marchitará<br />
				y será eterna
			</p>
		</div>
	</main>
</div>

<style>
	.page {
		position: relative;
		min-height: 100dvh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background:
			radial-gradient(120% 90% at 50% 0%, #24381f 0%, #12240f 48%, #0a1509 100%);
	}

	.back {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		z-index: 30;
		font-size: 0.8rem;
		color: #f5e6b8;
		text-decoration: none;
		letter-spacing: 0.05em;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}
	.back:hover {
		opacity: 1;
	}

	.aura :global(.orb) {
		position: absolute;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #f5c518;
		box-shadow: 0 0 14px 4px rgba(245, 197, 24, 0.5);
		animation: twinkle 4s ease-in-out infinite;
	}

	.stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 3rem 1.25rem 2rem;
	}

	.bloom-shell {
		width: 440px;
		height: 460px;
		transform-origin: top center;
	}

	.bloom {
		position: relative;
		width: 440px;
		height: 440px;
		animation: bloom-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.halo {
		position: absolute;
		inset: 12px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(245, 197, 24, 0.28) 0%, rgba(245, 197, 24, 0) 68%);
		animation: pulse 5s ease-in-out infinite;
	}

	.head-wrap {
		position: absolute;
		left: 50%;
		top: 40px;
		width: 160px;
		height: 160px;
		margin-left: -80px;
		z-index: 5;
		transform-origin: 50% 120%;
		animation: sway 7s ease-in-out infinite;
	}

	.petals {
		position: absolute;
		inset: 0;
	}

	.petal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: var(--cw);
		height: var(--ph);
		margin-left: calc(var(--cw) / -2);
		margin-top: calc(var(--ph) * -1);
		transform: rotate(var(--angle));
		transform-origin: 50% 100%;
		background: linear-gradient(160deg, #ffd868 0%, #f7b32b 55%, #e89612 100%);
		border-radius: 55% 55% 48% 52% / 82% 82% 20% 20%;
		box-shadow:
			inset -8px 6px 14px rgba(255, 255, 255, 0.24),
			inset 6px -10px 14px rgba(150, 70, 0, 0.3),
			inset 0 2px 4px rgba(120, 60, 0, 0.18);
		animation: petal-breathe 6s ease-in-out infinite;
	}

	.petal.outer {
		background: linear-gradient(160deg, #f8b92f 0%, #ef9c18 55%, #d97f12 100%);
		box-shadow:
			inset -6px 5px 12px rgba(255, 255, 255, 0.16),
			inset 7px -9px 12px rgba(140, 60, 0, 0.34);
	}

	.disk {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 150px;
		height: 150px;
		margin: -75px 0 0 -75px;
		border-radius: 50%;
		background: radial-gradient(circle at 38% 32%, #7a5420 0%, #573808 55%, #2c1c04 100%);
		box-shadow:
			inset 0 0 30px rgba(0, 0, 0, 0.55),
			inset 0 -8px 18px rgba(0, 0, 0, 0.4),
			0 10px 30px rgba(0, 0, 0, 0.45);
		overflow: hidden;
	}

	.seeds {
		position: absolute;
		inset: 0;
		background: repeating-conic-gradient(rgba(0, 0, 0, 0.22) 0deg 5.5deg, rgba(255, 230, 150, 0.05) 5.5deg 11deg);
		border-radius: inherit;
		animation: spin 90s linear infinite;
	}

	.shine {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(circle at 35% 28%, rgba(255, 220, 130, 0.22) 0%, rgba(255, 220, 130, 0) 45%);
	}

	.stem-wrap {
		position: absolute;
		left: 50%;
		top: 170px;
		width: 120px;
		height: 320px;
		z-index: 1;
		transform: translateX(-50%);
	}

	.stem {
		position: absolute;
		left: 50%;
		top: 0;
		width: 11px;
		height: 100%;
		margin-left: -5px;
		border-radius: 6px;
		background: linear-gradient(90deg, #2f5b1e 0%, #4c8a2f 45%, #2f5b1e 100%);
		box-shadow: inset -2px 0 3px rgba(0, 0, 0, 0.25);
		transform-origin: top center;
		animation: grow-stem 1.4s 0.4s cubic-bezier(0.33, 1, 0.68, 1) both;
	}

	.leaf {
		position: absolute;
		top: 130px;
		width: 74px;
		height: 34px;
		background: linear-gradient(120deg, #3f7a26 0%, #57a03a 60%, #3f7a26 100%);
		border-radius: 90% 8% 90% 8%;
		box-shadow: inset 0 -3px 8px rgba(25, 70, 10, 0.35);
		transform-origin: 12% 50%;
		animation: leaf-wave 5s ease-in-out infinite;
	}

	.leaf-l {
		left: 38px;
	}

	.leaf-r {
		right: 38px;
		transform: scaleX(-1);
		animation-delay: -2.5s;
	}

	.fall {
		position: absolute;
		top: -8vh;
		width: 16px;
		height: 34px;
		background: linear-gradient(165deg, #ffd868 0%, #f0a11e 80%);
		border-radius: 60% 60% 50% 55% / 80% 80% 25% 25%;
		opacity: 0;
		animation: fall linear infinite;
		z-index: 10;
		transform-origin: 50% 100%;
	}

	.message {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: #fbf3d8;
		gap: 0.6rem;
		padding-top: 1rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.42em;
		text-indent: 0.42em;
		color: #f5c518;
	}

	.title {
		font-size: clamp(1.9rem, 5vw, 3rem);
		font-weight: 600;
		letter-spacing: -0.01em;
		margin: 0;
		text-shadow: 0 0 34px rgba(245, 197, 24, 0.35);
	}

	.divider {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		width: 200px;
		margin: 0.15rem auto;
	}
	.divider span {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(245, 197, 24, 0.55));
	}
	.divider span:last-child {
		background: linear-gradient(90deg, rgba(245, 197, 24, 0.55), transparent);
	}

	.subtitle {
		font-size: clamp(1rem, 2.6vw, 1.3rem);
		color: #e8dab0;
		line-height: 1.65;
		font-style: italic;
		margin: 0;
		padding: 0 1rem;
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
	}

	.rise {
		opacity: 0;
		animation: rise 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	@keyframes sway {
		0%, 100% {
			transform: rotate(-2.4deg);
		}
		50% {
			transform: rotate(2.4deg);
		}
	}

	@keyframes petal-breathe {
		0%, 100% {
			opacity: 0.92;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.55;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.08);
		}
	}

	@keyframes bloom-in {
		from {
			opacity: 0;
			transform: scale(0.55) translateY(24px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes grow-stem {
		from {
			transform: scaleY(0);
		}
		to {
			transform: scaleY(1);
		}
	}

	@keyframes leaf-wave {
		0%, 100% {
			transform: rotate(-2deg);
		}
		50% {
			transform: rotate(9deg);
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(26px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fall {
		0% {
			opacity: 0;
			transform: translate3d(0, 0, 0) rotate(var(--pe, 0deg));
		}
		8% {
			opacity: 0.85;
		}
		100% {
			opacity: 0;
			transform: translate3d(var(--drift, -40px), 112vh, 0) rotate(340deg);
		}
	}

	@keyframes twinkle {
		0%, 100% {
			opacity: 0.25;
			transform: scale(0.85);
		}
		50% {
			opacity: 1;
			transform: scale(1.15);
		}
	}

	@media (max-width: 640px) {
		.page {
			padding: 4.25rem 1rem 2rem;
		}

		.bloom-shell {
			width: 440px;
			height: 460px;
			transform: scale(0.68);
		}

		.message {
			margin-top: 0;
		}
	}

	@media (max-height: 620px) {
		.bloom-shell {
			transform: scale(0.56);
		}
	}
</style>