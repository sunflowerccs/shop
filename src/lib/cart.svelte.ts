export interface CartEntry {
	productId: string;
	qty: number;
}

export const entries = $state<CartEntry[]>([]);

export function itemCount(): number {
	return entries.reduce((total, entry) => total + entry.qty, 0);
}

export function quantityOf(productId: string): number {
	return entries.find((entry) => entry.productId === productId)?.qty ?? 0;
}

export function add(productId: string): void {
	const entry = entries.find((item) => item.productId === productId);
	if (entry) {
		entry.qty += 1;
	} else {
		entries.push({ productId, qty: 1 });
	}
}

export function setQuantity(productId: string, qty: number): void {
	if (qty <= 0) {
		remove(productId);
		return;
	}
	const entry = entries.find((item) => item.productId === productId);
	if (entry) {
		entry.qty = qty;
	} else {
		entries.push({ productId, qty });
	}
}

export function remove(productId: string): void {
	const index = entries.findIndex((item) => item.productId === productId);
	if (index !== -1) {
		entries.splice(index, 1);
	}
}

export function clear(): void {
	entries.length = 0;
}