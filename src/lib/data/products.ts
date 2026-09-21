import img1 from "$lib/assets/img/01-sunflower_ccs_24-3986125936822563554_1-20260914_122824.webp";
import img2 from "$lib/assets/img/02-sunflower_ccs_24-3986125942426069908_2-20260914_122824.webp";
import img3 from "$lib/assets/img/sunflower_ccs_24-2990878129-20241123_115754.webp";
import img4 from "$lib/assets/img/sunflower_ccs_24-3628781207-20241123_094718.webp";
import img5 from "$lib/assets/img/sunflower_ccs_24-3515350498427743722_70151451929_1-20241203_232057.webp";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	tag?: string;
}

export const products: Product[] = [
	{
		id: "ramo-girasoles",
		name: "Ramo de Girasoles",
		description: "Ramo fresco de girasoles amarillos envuelto a mano.",
		price: 25,
		image: img1,
		tag: "Más vendido"
	},
	{
		id: "ramo-premium",
		name: "Ramo Premium",
		description: "Selección especial de girasoles con papel premium y lazo.",
		price: 35,
		image: img2
	},
	{
		id: "ramo-campestre",
		name: "Ramo Campestre",
		description: "Composición rústica con flores amarillas de temporada.",
		price: 22,
		image: img3
	},
	{
		id: "ramo-soleado",
		name: "Ramo Soleado",
		description: "Mezcla cálida de girasoles y follaje para alegrar cualquier día.",
		price: 30,
		image: img4,
		tag: "Ideal para regalo"
	},
	{
		id: "arreglo-tejido",
		name: "Arreglo Tejido Artesanal",
		description: "Creación tejida a mano con flores amarillas y estilo único.",
		price: 28,
		image: img5
	}
];

export const productById = new Map(products.map((product) => [product.id, product]));