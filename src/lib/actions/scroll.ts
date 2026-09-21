export function reveal(node: HTMLElement, opts: { delay?: number } = {}): { destroy: () => void } {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		node.dataset.revealed = "true";
		return { destroy: () => {} };
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			window.setTimeout(() => {
				node.dataset.revealed = "true";
			}, opts.delay ?? 0);
			observer.disconnect();
		},
		{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

export function parallax(node: HTMLElement, opts: { strength?: number } = {}): { destroy: () => void } {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return { destroy: () => {} };
	}

	const strength = opts.strength ?? 60;
	let ticking = false;

	function update() {
		const rect = node.getBoundingClientRect();
		const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);
		node.style.opacity = String(1 - progress * 0.5);
		node.style.transform = `translateY(${progress * strength}px) scale(${1 - progress * 0.06})`;
		ticking = false;
	}

	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(update);
	}

	window.addEventListener("scroll", onScroll, { passive: true });
	update();

	return {
		destroy() {
			window.removeEventListener("scroll", onScroll);
		}
	};
}