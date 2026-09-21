export type Currency = "USD" | "VES";

export const business = {
	name: "Sunflower",
	slogan: "Color a la vida",
	whatsapp: "584149210425",
	currency: "USD" as Currency,
	locale: "es-VE"
};

export function formatPrice(value: number): string {
	return new Intl.NumberFormat(business.locale, {
		style: "currency",
		currency: business.currency
	}).format(value);
}

export function formatPriceCompact(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: business.currency,
		maximumFractionDigits: 2
	}).format(value);
}

export const seo = {
	title: "Sunflower — Color a la vida",
	description: "Arreglos florales artesanales. Elige tus favoritos y pide tu pedido directamente por WhatsApp.",
	// TODO: cambia esta URL por el dominio real del sitio (la imagen og.webp se sirve desde /static)
	siteUrl: "https://sunflower.example.com",
	ogImage: "/og.webp",
	themeColor: "#f5c518"
};