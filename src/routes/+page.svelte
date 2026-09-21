<script lang="ts">
	import Hero from "$lib/components/hero.svelte";
	import Marquee from "$lib/components/marquee.svelte";
	import NavBar from "$lib/components/nav-bar.svelte";
	import FloralRails from "$lib/components/floral-rails.svelte";
	import ProductCard from "$lib/components/product-card.svelte";
	import Steps from "$lib/components/steps.svelte";
	import QuoteCta from "$lib/components/quote-cta.svelte";
	import Footer from "$lib/components/footer.svelte";
	import CartButton from "$lib/components/cart-button.svelte";
	import CartDrawer from "$lib/components/cart-drawer.svelte";
	import { reveal } from "$lib/actions/scroll.js";
	import { business, seo } from "$lib/config.js";
	import { products } from "$lib/data/products.js";

	let drawerOpen = $state(false);

	function openCart() {
		drawerOpen = true;
	}
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="theme-color" content={seo.themeColor} />
	<link rel="canonical" href={`${seo.siteUrl}/`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={business.name} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={`${seo.siteUrl}/`} />
	<meta property="og:image" content={`${seo.siteUrl}${seo.ogImage}`} />
	<meta property="og:image:alt" content={`Arreglo floral artesanal de ${business.name}`} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={`${seo.siteUrl}${seo.ogImage}`} />
</svelte:head>

<NavBar onOpenCart={openCart} />

<FloralRails />

<Hero onOpenCart={openCart} />

<Marquee />

<section id="catalogo" class="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
	<header class="reveal mb-8 flex flex-col items-center text-center" use:reveal>
		<span class="text-xs font-semibold uppercase tracking-[0.25em] text-sunflower">Nuestro catálogo</span>
		<h2 class="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
			Arreglos hechos para alegrar
		</h2>
		<p class="mt-3 max-w-md text-pretty text-muted-foreground">
			Elige tus favoritos, agrégalos al carrito y envíalos por WhatsApp en menos de un minuto.
		</p>
	</header>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
		{#each products as product, i}
			<div class="reveal h-full" use:reveal={{ delay: (i % 3) * 90 }}>
				<ProductCard {product} />
			</div>
		{/each}

		<div class="reveal h-full" use:reveal={{ delay: (products.length % 3) * 90 }}>
			<QuoteCta />
		</div>
	</div>
</section>

<Steps />

<Footer />

<CartButton onclick={openCart} />

<CartDrawer bind:open={drawerOpen} />