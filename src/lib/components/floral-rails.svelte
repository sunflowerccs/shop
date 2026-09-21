<script lang="ts">
	interface Flower {
		top: number;
		size: number;
		x: number;
		delay: number;
	}

	interface Leaf {
		top: number;
		size: number;
		x: number;
		rot: number;
	}

	const flowers: Flower[] = [
		{ top: 9, size: 26, x: -2, delay: 0 },
		{ top: 27, size: 20, x: 7, delay: 1.3 },
		{ top: 45, size: 28, x: -5, delay: 0.6 },
		{ top: 63, size: 18, x: 8, delay: 2 },
		{ top: 82, size: 24, x: -3, delay: 1 }
	];

	const leaves: Leaf[] = [
		{ top: 16, size: 12, x: -9, rot: -32 },
		{ top: 36, size: 14, x: 10, rot: 28 },
		{ top: 54, size: 11, x: -8, rot: -25 },
		{ top: 72, size: 13, x: 9, rot: 38 },
		{ top: 90, size: 12, x: -6, rot: -18 }
	];

	const rightFlowers: Flower[] = flowers.map((f) => ({ ...f, x: -f.x }));
	const rightLeaves: Leaf[] = leaves.map((l) => ({ ...l, x: -l.x, rot: -l.rot }));

	const VINE_GREEN = "oklch(0.6 0.12 145)";
	const LEAF_GREEN = "oklch(0.55 0.12 150)";
</script>

{#snippet flower(flower: Flower)}
	<svg
		width={flower.size}
		height={flower.size}
		viewBox="0 0 24 24"
		class="animate-float"
		style="animation-delay: {flower.delay}s"
	>
		<g style="transform: translate(12px, 12px)">
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as n}
				<ellipse
					cx="0"
					cy="0"
					rx="2.7"
					ry="6"
					style="fill: var(--sunflower); transform: rotate({n * 36}deg) translateY(-5.5px);"
				/>
			{/each}
		</g>
		<circle cx="12" cy="12" r="4" style="fill: oklch(0.5 0.12 70)" />
	</svg>
{/snippet}

{#snippet leaf(leaf: Leaf)}
	<span
		class="absolute"
		style="top: {leaf.top}%; left: calc(50% + {leaf.x}px); transform: translateY(-50%) rotate({leaf.rot}deg);"
	>
		<svg width={leaf.size * 2} height={leaf.size} viewBox="0 0 16 8">
			<path
				d="M8 0 C12 1 15 3 16 4 C15 5 12 7 8 8 C4 7 1 5 0 4 C1 3 4 1 8 0 Z"
				style="fill: {LEAF_GREEN}; opacity: 0.55;"
			/>
			<path d="M8 1.5 L8 6.5" style="stroke: {VINE_GREEN}; stroke-width: 0.5; opacity: 0.5;" />
		</svg>
	</span>
{/snippet}

{#snippet vine()}
	<svg
		width="48"
		height="100%"
		viewBox="0 0 48 720"
		preserveAspectRatio="none"
		class="absolute inset-y-0 left-1/2 h-full -translate-x-1/2"
	>
		<path
			d="M24 0 C14 110 34 150 24 240 C14 330 34 370 24 460 C14 550 34 590 24 680 C21 700 23 712 24 720"
			fill="none"
			style="stroke: {VINE_GREEN}; stroke-width: 8; stroke-linecap: round; opacity: 0.5;"
			vector-effect="non-scaling-stroke"
		/>
		<path d="M24 84 C20 100 12 108 6 112" fill="none" style="stroke: {VINE_GREEN}; stroke-width: 4; opacity: 0.45;" vector-effect="non-scaling-stroke" />
		<path d="M24 200 C28 214 38 222 44 228" fill="none" style="stroke: {VINE_GREEN}; stroke-width: 4; opacity: 0.45;" vector-effect="non-scaling-stroke" />
		<path d="M24 328 C20 344 12 352 6 356" fill="none" style="stroke: {VINE_GREEN}; stroke-width: 4; opacity: 0.45;" vector-effect="non-scaling-stroke" />
		<path d="M24 456 C28 470 38 478 44 484" fill="none" style="stroke: {VINE_GREEN}; stroke-width: 4; opacity: 0.45;" vector-effect="non-scaling-stroke" />
		<path d="M24 584 C20 600 12 608 6 612" fill="none" style="stroke: {VINE_GREEN}; stroke-width: 4; opacity: 0.45;" vector-effect="non-scaling-stroke" />
		<path d="M24 688 C28 700 36 706 40 710" fill="none" style="stroke: {VINE_GREEN}; stroke-width: 4; opacity: 0.45;" vector-effect="non-scaling-stroke" />
	</svg>
{/snippet}

{#snippet rail(list: { flowers: Flower[]; leaves: Leaf[]; cls: string })}
	<div aria-hidden="true" class="pointer-events-none fixed top-0 bottom-0 z-10 hidden w-12 xl:block {list.cls}">
		{@render vine()}
		{#each list.flowers as item}
			<span
				class="absolute -translate-x-1/2 -translate-y-1/2"
				style="left: calc(50% + {item.x}px); top: {item.top}%;"
			>
				{@render flower(item)}
			</span>
		{/each}
		{#each list.leaves as leafItem}
			{@render leaf(leafItem)}
		{/each}
	</div>
{/snippet}

{@render rail({ flowers, leaves, cls: "left-3" })}
{@render rail({ flowers: rightFlowers, leaves: rightLeaves, cls: "right-3" })}