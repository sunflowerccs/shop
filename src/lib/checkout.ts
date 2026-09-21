import { business, formatPriceCompact } from "./config.js";
import type { CartEntry } from "./cart.svelte.js";
import type { Product } from "./data/products.js";

export function buildQuoteWhatsAppLink(customerName: string, details: string): string {
	const message = [
		`Hola ${business.name}, soy *${customerName.trim()}* y quisiera cotizar un arreglo personalizado:`,
		"",
		details.trim()
	].join("\n");

	return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderLink(entries: CartEntry[], products: Product[], customerName: string): string {
	const byId = new Map(products.map((product) => [product.id, product]));
	const items = entries
		.map((entry) => {
			const product = byId.get(entry.productId);
			if (!product) return null;
			return `• ${entry.qty} x ${product.name} — ${formatPriceCompact(product.price * entry.qty)}`;
		})
		.filter((line): line is string => line !== null);

	const total = entries.reduce((sum, entry) => {
		const product = byId.get(entry.productId);
		return sum + (product ? product.price * entry.qty : 0);
	}, 0);

	const message = [
		`Hola ${business.name}, soy *${customerName}* y quiero hacer este pedido:`,
		"",
		items.join("\n"),
		"",
		`Total: *${formatPriceCompact(total)}*`
	].join("\n");

	return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}