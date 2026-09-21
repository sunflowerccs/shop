<script lang="ts">
	import { base } from "$app/paths";

	type Bubble = { left: number; size: number; delay: number; dur: number; opacity: number };
	type Fleck = { left: number; scale: number; delay: number; dur: number; drift: number; rot: number };

	const bubbles: Bubble[] = Array.from({ length: 13 }, (_, i) => ({
		left: 10 + (i * 149) % 64,
		size: 4 + (i % 5) * 3,
		delay: i * 0.5,
		dur: 2.2 + (i % 5) * 0.6,
		opacity: 0.55 + (i % 3) * 0.15
	}));

	const flecks: Fleck[] = Array.from({ length: 9 }, (_, i) => ({
		left: 4 + i * 11,
		scale: 0.6 + (i % 3) * 0.3,
		delay: i * 1.3,
		dur: 10 + (i % 4) * 2,
		drift: i % 2 === 0 ? -60 : 60,
		rot: i * 41
	}));
</script>

<svelte:head>
	<title>Para Mi Negra</title>
	<meta name="robots" content="noindex" />
	<meta name="description" content="Mejor que flores: una fría, bien amarilla." />
</svelte:head>

<div class="page">
	<a href={base + "/"} class="back">← Volver al catálogo</a>

	<div aria-hidden="true" class="aurora">
		<div class="glow glow-a"></div>
		<div class="glow glow-b"></div>
	</div>

	{#each flecks as f}
		<div
			aria-hidden="true"
			class="fleck"
			style={`left:${f.left}%;--drift:${f.drift}px;--scale:${f.scale};animation-duration:${f.dur}s;animation-delay:${f.delay}s;--fr:${f.rot}deg`}
		></div>
	{/each}

	<main class="stage">
		<div class="drink-shell">
			<div class="drink" aria-label="Una clara bien fría para Esther">
				<div aria-hidden="true" class="halo"></div>

				<div aria-hidden="true" class="vapor">
					<span></span>
					<span></span>
					<span></span>
				</div>

				<div aria-hidden="true" class="mug">
					<div class="mug-body">
						<div class="mug-shine"></div>
						<div class="mug-liquid">
							{#each bubbles as b}
								<span
									class="bubble"
									style={`left:${b.left}%;width:${b.size}px;height:${b.size}px;opacity:${b.opacity};animation-duration:${b.dur}s;animation-delay:${b.delay}s`}
								></span>
							{/each}
						</div>
						<div class="mug-foam">
							<span class="fob fob-a"></span>
							<span class="fob fob-b"></span>
							<span class="fob fob-c"></span>
							<span class="fob fob-d"></span>
						</div>
						<div class="mug-label">
							<strong>Esther F.</strong>
						</div>
						<svg
							class="handle"
							viewBox="0 0 70 130"
							aria-hidden="true"
						>
							<path
								d="M 16 20 C 60 20 58 108 16 108"
								style="fill:none;stroke:rgba(222,238,255,0.55);stroke-width:15;stroke-linecap:round"
							/>
							<path
								d="M 16 20 C 60 20 58 108 16 108"
								style="fill:none;stroke:rgba(255,255,255,0.35);stroke-width:4;stroke-linecap:round;transform:translate(1px,-3px)"
							/>
						</svg>
					</div>
				</div>

				<div aria-hidden="true" class="coaster"></div>
			</div>
		</div>

		<div class="message">
			<p class="eyebrow rise" style="animation-delay:.5s">MEJOR &nbsp;QUE&nbsp; FLORES</p>
			<h1 class="title rise" style="animation-delay:.8s">Para Mi Negra</h1>
			<div class="divider rise" style="animation-delay:1.1s">
				<span></span>
				<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
					<g style="transform: translate(12px, 12px)">
						{#each [0, 1, 2, 3, 4, 5, 6, 7] as n}
							<ellipse
								cx="0"
								cy="0"
								rx="2.4"
								ry="5"
								style="fill:#7fd0f2;transform:rotate({n * 45}deg) translateY(-4.4px)"
							/>
						{/each}
					</g>
					<circle cx="12" cy="12" r="3.2" style="fill:#16336e" />
				</svg>
				<span></span>
			</div>
			<p class="subtitle rise" style="animation-delay:1.35s">
				las flores son muy caras,<br />
				así que mejor una fría.
			</p>
			<p class="foot rise" style="animation-delay:1.6s">
				Amarilla como un girasol, con etiqueta azul y bien helada. Salud, corazón.
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
			radial-gradient(120% 90% at 50% 0%, #16305e 0%, #0c1c3d 48%, #060f26 100%);
	}

	.back {
		position: absolute;
		top: 1.25rem;
		left: 1.25rem;
		z-index: 30;
		font-size: 0.8rem;
		color: #a9c6ef;
		text-decoration: none;
		letter-spacing: 0.05em;
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}
	.back:hover {
		opacity: 1;
	}

	.aurora :global(.glow) {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		animation: glow-breathe 7s ease-in-out infinite;
	}
	.aurora :global(.glow-a) {
		width: 340px;
		height: 340px;
		left: 8%;
		top: 16%;
		background: rgba(64, 140, 255, 0.22);
	}
	.aurora :global(.glow-b) {
		width: 300px;
		height: 300px;
		right: 6%;
		bottom: 12%;
		background: rgba(245, 197, 24, 0.14);
		animation-delay: -3s;
	}

	.fleck {
		position: absolute;
		top: -6vh;
		width: 7px;
		height: 15px;
		background: linear-gradient(180deg, rgba(190, 226, 255, 0.95), rgba(190, 226, 255, 0.1));
		border-radius: 50%;
		opacity: 0;
		animation: frost linear infinite;
	}

	.stage {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		padding: 3rem 1.25rem 2rem;
	}

	.drink-shell {
		width: 300px;
		height: 400px;
		transform-origin: top center;
	}

	.drink {
		position: relative;
		width: 300px;
		height: 400px;
		animation: drink-in 1.5s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.halo {
		position: absolute;
		inset: 30px 0 30px 0;
		background: radial-gradient(ellipse at 50% 42%, rgba(245, 197, 24, 0.24) 0%, rgba(245, 197, 24, 0) 62%);
		animation: pulse 5s ease-in-out infinite;
	}

	.vapor :global(span) {
		position: absolute;
		top: 26px;
		left: 50%;
		width: 26px;
		height: 20px;
		margin-left: -13px;
		background: radial-gradient(circle, rgba(210, 235, 255, 0.5), rgba(210, 235, 255, 0));
		border-radius: 50%;
		filter: blur(3px);
		animation: vapor-rise 4s ease-in-out infinite;
	}
	.vapor :global(span:nth-child(2)) {
		margin-left: 30px;
		animation-delay: -1.3s;
	}
	.vapor :global(span:nth-child(3)) {
		margin-left: -46px;
		animation-delay: -2.6s;
	}

	.mug {
		position: absolute;
		left: 50%;
		top: 84px;
		width: 216px;
		height: 258px;
		margin-left: -108px;
	}

	.mug-body {
		position: absolute;
		left: 22px;
		top: 0;
		width: 172px;
		height: 256px;
		border-radius: 26px 26px 22px 22px;
		background: linear-gradient(90deg, rgba(224, 240, 255, 0.16), rgba(255, 255, 255, 0.1), rgba(224, 240, 255, 0.16));
		box-shadow:
			inset -16px 0 22px rgba(0, 0, 0, 0.22),
			inset 7px 0 16px rgba(255, 255, 255, 0.14),
			0 20px 40px rgba(0, 0, 0, 0.45);
		transform-origin: 50% 100%;
		animation: rock 6s ease-in-out infinite;
	}

	.mug-shine {
		position: absolute;
		left: 30px;
		top: 30px;
		width: 16px;
		height: 150px;
		border-radius: 50%;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 75%);
		transform: rotate(6deg);
	}

	.mug-liquid {
		position: absolute;
		left: 7px;
		right: 7px;
		top: 10px;
		bottom: 8px;
		border-radius: 22px 22px 16px 16px;
		background: linear-gradient(180deg, #f6cc52 0%, #edab1f 58%, #d98e12 100%);
		box-shadow: inset 0 -10px 22px rgba(160, 90, 0, 0.35);
		overflow: hidden;
	}

	.bubble {
		position: absolute;
		bottom: 0;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.25) 65%, rgba(255, 255, 255, 0.05));
		border: 1px solid rgba(255, 255, 255, 0.45);
		box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
		animation: bubble-rise linear infinite;
	}

	.mug-foam {
		position: absolute;
		left: 7px;
		right: 7px;
		top: 0;
		height: 56px;
		background: radial-gradient(circle at 50% 50%, #fffdf4 0%, #faf0cf 62%, #f2dc9f 100%);
		border-radius: 24px 24px 10px 10px;
		box-shadow: inset 0 -8px 12px rgba(214, 178, 92, 0.45);
	}

	.fob {
		position: absolute;
		bottom: -8px;
		border-radius: 50%;
		background: inherit;
	}
	.fob-a {
		left: 8px;
		width: 34px;
		height: 20px;
	}
	.fob-b {
		left: 52px;
		width: 46px;
		height: 26px;
		bottom: -12px;
	}
	.fob-c {
		left: 108px;
		width: 36px;
		height: 21px;
	}
	.fob-d {
		left: 142px;
		width: 24px;
		height: 15px;
	}

	.handle {
		position: absolute;
		right: -46px;
		top: 58px;
		width: 70px;
		height: 130px;
		filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.3));
	}

	.mug-label {
		position: absolute;
		left: 50%;
		top: 156px;
		width: 118px;
		height: 70px;
		margin-left: -59px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		background: linear-gradient(180deg, #2f5cd6 0%, #1b3a8f 100%);
		box-shadow:
			inset 0 0 0 2px rgba(255, 255, 255, 0.16),
			inset 0 -8px 16px rgba(0, 20, 80, 0.45),
			0 6px 16px rgba(0, 0, 0, 0.35);
	}

	.mug-label strong {
		font-family: "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive;
		font-weight: 600;
		font-style: italic;
		font-size: 1.35rem;
		letter-spacing: 0.05em;
		color: #ffe9a3;
		text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
	}

	.coaster {
		position: absolute;
		left: 50%;
		bottom: 14px;
		width: 208px;
		height: 38px;
		margin-left: -104px;
		border-radius: 50%;
		background: radial-gradient(ellipse at 50% 40%, #2f5cd6 0%, #162f74 100%);
		box-shadow:
			inset 0 -4px 8px rgba(0, 10, 50, 0.5),
			0 14px 30px rgba(0, 0, 0, 0.5);
	}

	.message {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: #f3f7ff;
		gap: 0.55rem;
		padding-top: 0.8rem;
	}

	.eyebrow {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.42em;
		text-indent: 0.42em;
		color: #7fd0f2;
	}

	.title {
		font-size: clamp(1.9rem, 5vw, 3rem);
		font-weight: 600;
		letter-spacing: -0.01em;
		margin: 0;
		text-shadow: 0 0 34px rgba(127, 208, 242, 0.35);
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
		background: linear-gradient(90deg, transparent, rgba(127, 208, 242, 0.55));
	}
	.divider span:last-child {
		background: linear-gradient(90deg, rgba(127, 208, 242, 0.55), transparent);
	}

	.subtitle {
		font-size: clamp(1rem, 2.6vw, 1.3rem);
		color: #d9e4f8;
		line-height: 1.65;
		font-style: italic;
		margin: 0;
		padding: 0 1rem;
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
	}

	.foot {
		font-size: 0.8rem;
		max-width: 30ch;
		color: #9db4de;
		line-height: 1.6;
		margin: 0;
		padding: 0 1.25rem;
	}

	.rise {
		opacity: 0;
		animation: rise 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
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

	@keyframes drink-in {
		from {
			opacity: 0;
			transform: scale(0.6) translateY(24px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes rock {
		0%, 100% {
			transform: rotate(-1.4deg);
		}
		50% {
			transform: rotate(1.4deg);
		}
	}

	@keyframes bubble-rise {
		0% {
			transform: translateY(0);
			opacity: 0;
		}
		12% {
			opacity: 1;
		}
		100% {
			transform: translateY(-260px);
			opacity: 0;
		}
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.55;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
	}

	@keyframes vapor-rise {
		0% {
			opacity: 0;
			transform: translateY(8px) scale(0.7);
		}
		50% {
			opacity: 0.7;
		}
		100% {
			opacity: 0;
			transform: translateY(-40px) scale(1.3);
		}
	}

	@keyframes glow-breathe {
		0%, 100% {
			opacity: 0.5;
			transform: translateY(0);
		}
		50% {
			opacity: 1;
			transform: translateY(-14px);
		}
	}

	@keyframes frost {
		0% {
			opacity: 0;
			transform: translate3d(0, 0, 0) rotate(var(--fr, 0deg)) scale(var(--scale, 1));
		}
		10% {
			opacity: 0.85;
		}
		100% {
			opacity: 0;
			transform: translate3d(var(--drift, 0px), 110vh, 0) rotate(300deg) scale(var(--scale, 1));
		}
	}

	@media (max-width: 640px) {
		.page {
			padding: 4rem 1rem 2rem;
		}
		.drink-shell {
			width: 300px;
			height: 400px;
			transform: scale(0.8);
		}
	}

	@media (max-height: 640px) {
		.drink-shell {
			transform: scale(0.62);
		}
	}
</style>