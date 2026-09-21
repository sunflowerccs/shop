function petalImage(base: string, mid: string, tip: string): string {
	const svg =
		`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 96'>` +
		`<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>` +
		`<stop offset='0' stop-color='${base}'/>` +
		`<stop offset='.45' stop-color='${mid}'/>` +
		`<stop offset='1' stop-color='${tip}'/>` +
		`</linearGradient></defs>` +
		`<path d='M32 4 C24 4 12 10 10 26 C8 42 12 72 32 92 C52 72 56 42 54 26 C52 10 40 4 32 4 Z' fill='url(#g)' stroke='rgba(160,110,5,.35)' stroke-width='1'/>` +
		`<path d='M32 6 C29 30 30 58 32 88' fill='none' stroke='rgba(224,142,7,.4)' stroke-width='1.2' stroke-linecap='round'/>` +
		`</svg>`;
	return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const PETAL_IMAGES = [
	petalImage("#d98e03", "#f1b60b", "#ffdb66"),
	petalImage("#c98202", "#eab308", "#ffcf4d"),
	petalImage("#e09b0a", "#f5c518", "#ffe28a")
];

const REDUCED_MOTION =
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let container: HTMLDivElement | null = null;
let lastBurst = 0;

function ensureContainer(): HTMLDivElement {
	if (!container) {
		container = document.createElement("div");
		container.style.position = "fixed";
		container.style.inset = "0";
		container.style.overflow = "hidden";
		container.style.pointerEvents = "none";
		container.style.zIndex = "9999";
		document.body.appendChild(container);
	}
	return container;
}

function random(min: number, max: number): number {
	return min + Math.random() * (max - min);
}

type PetalKeyframe = "petal-fall" | "petal-burst";

function spawnPetal(
	left: number,
	top: number,
	width: number,
	height: number,
	opts: {
		sway?: number;
		displacement?: [number, number];
		spin: number;
		duration: number;
		delay: number;
		keyframe: PetalKeyframe;
	}
): void {
	const petal = document.createElement("span");
	petal.style.position = "absolute";
	petal.style.left = `${left}px`;
	petal.style.top = `${top}px`;
	petal.style.width = `${width}px`;
	petal.style.height = `${height}px`;
	petal.style.backgroundImage = PETAL_IMAGES[Math.floor(Math.random() * PETAL_IMAGES.length)];
	petal.style.backgroundSize = "100% 100%";
	petal.style.backgroundRepeat = "no-repeat";
	if (opts.sway !== undefined) petal.style.setProperty("--dx", `${opts.sway}px`);
	if (opts.displacement) {
		petal.style.setProperty("--bx", `${opts.displacement[0]}px`);
		petal.style.setProperty("--by", `${opts.displacement[1]}px`);
	}
	petal.style.setProperty("--spin", `${opts.spin}deg`);
	petal.style.animation = `${opts.keyframe} ${opts.duration}ms cubic-bezier(0.22, 0.45, 0.36, 1) ${opts.delay}ms both`;
	ensureContainer().appendChild(petal);
	petal.addEventListener("animationend", () => petal.remove());
}

export function rainPetals(count = 20): void {
	if (REDUCED_MOTION) return;
	for (let i = 0; i < count; i++) {
		const width = random(14, 20);
		spawnPetal(random(0, window.innerWidth), random(-90, -24), width, width * 1.5, {
			sway: random(-180, 180),
			spin: random(360, 900) * (Math.random() > 0.5 ? 1 : -1),
			duration: random(1800, 3400),
			delay: random(0, 900),
			keyframe: "petal-fall"
		});
	}
}

export function burstPetals(x: number, y: number, count = 12): void {
	if (REDUCED_MOTION) return;
	const now = performance.now();
	if (now - lastBurst < 110) return;
	lastBurst = now;
	for (let i = 0; i < count; i++) {
		const angle = Math.random() * Math.PI * 2;
		const distance = random(45, 120);
		const size = random(12, 18);
		spawnPetal(x - size / 2, y - size / 2, size, size, {
			displacement: [Math.cos(angle) * distance, Math.sin(angle) * distance],
			spin: random(240, 720) * (Math.random() > 0.5 ? 1 : -1),
			duration: random(550, 950),
			delay: 0,
			keyframe: "petal-burst"
		});
	}
}

export function initPetalInteractivity(): void {
	if (REDUCED_MOTION) return;
	document.addEventListener(
		"click",
		(event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			const interactive = target?.closest(
				"button, a, [role='button'], [data-slot='button'], label, [data-slot='trigger']"
			);
			if (interactive) burstPetals(event.clientX, event.clientY, 8);
		},
		{ passive: true }
	);
}