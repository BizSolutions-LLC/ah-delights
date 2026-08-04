import type { ProductImageFocus } from "@/features/home/components/product-image";

export type { ProductImageFocus };

export type ProductItem = {
  name: string;
  description?: string;
  image: string;
  /** CSS object-position / scale to match Figma framing */
  imageFocus?: ProductImageFocus;
  /** Figma absolute crop for card backgrounds (percent strings) */
  imageCrop?: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

export const bestSellers: ProductItem[] = [
  {
    name: "Chocolate Decadent Cake",
    description:
      "A pure indulgence in its most elegant form. This cake delivers an intense, deep chocolate flavor that feels luxurious from the very first bite. The texture is incredibly soft, tender, and melt‑in‑your‑mouth with a silky-smooth chocolate ganache that glistens on top.",
    image: "/products/bestseller-chocolate.png",
    // Figma Card Image BG crop
    imageCrop: {
      left: "-27.59%",
      top: "-72.07%",
      width: "162%",
      height: "177.02%",
    },
  },
  {
    name: "Choco Caramel Decadent Cake",
    description:
      "This begins with the same rich, chocolate base you love from our signature Chocolate Decadent Cake. What makes this version truly special is the homemade caramel topping, poured generously over the cake for a buttery, golden sweetness that complements the chocolate perfectly.",
    image: "/products/bestseller-caramel.png",
    imageCrop: {
      left: "-15.25%",
      top: "0%",
      width: "130.35%",
      height: "100%",
    },
  },
];

export const homeMadePastries: ProductItem[] = [
  {
    name: "Butter Cashew Bites",
    image: "/products/product-butter-cashew.png",
    imageFocus: { position: "50% 50%", scale: 0.85 },
  },
  {
    name: "Butter Mango Squares",
    image: "/products/product-butter-mango.png",
    imageFocus: { position: "50% 50%", scale: 0.85 },
  },
  {
    name: "Calamansi Muffin Streusel",
    image: "/products/product-calamansi-muffin.png",
    // Tall photo — slight bias toward the muffins, not overly cropped in
    imageFocus: { position: "50% 58%", scale: 0.85 },
  },
  {
    name: "Choco Caramel Decadent Cake",
    image: "/products/product-choco-caramel-cake.png",
    imageFocus: { position: "50% 50%", scale: 0.85 },
  },
];

export const classicCookies: ProductItem[] = [
  {
    name: "Double Chocolate Chip Cookie",
    description:
      "This cookie is fudgy, bold, and irresistibly rich. Soft on the inside with a tender bite, it’s the perfect blend of brownie‑like decadence and classic cookie comfort.",
    image: "/products/product-double-choco-cookie.png",
    imageFocus: { position: "50% 50%", scale: 0.92 },
  },
  {
    name: "Celebration Cookie",
    description:
      "This is a fun, festive twist on a classic, soft, buttery, and studded with colorful sprinkles that make every bite feel joyful.",
    image: "/products/product-celebration-cookie.png",
    imageFocus: { position: "50% 50%", scale: 0.92 },
  },
  {
    name: "Classic Chocolate Chip Cookie",
    description:
      "This is everything a homemade cookie should be - soft, chewy, and loaded with chocolate chips. Balanced in sweetness and rich in buttery goodness, this timeless favorite is the cookie everyone reaches for first.",
    image: "/products/product-classic-choco-cookie.png",
    imageFocus: { position: "50% 50%", scale: 0.92 },
  },
];

export const classicOthers: ProductItem[] = [
  {
    name: "Choco Cupcake with Buttercream",
    description:
      "Elegant, comforting, and irresistibly chocolatey, it’s the kind of classic favorite that brings joy to any dessert table, celebration, or quiet moment at home.",
    image: "/products/product-choco-cupcake.png",
    imageFocus: { position: "48% 38%", scale: 0.81 },
  },
  {
    name: "Gourmet Brownies",
    description:
      "What makes these brownies truly special is the assortment of gourmet toppings that add layers of flavor and fun to every bite. Enjoy the crunch of chocolate beads, the refreshing hint of mint, the creamy sweetness of white chocolate, and the nutty richness of nuts. Every piece offers a unique taste experience.",
    image: "/products/product-gourmet-brownies.png",
    imageFocus: { position: "50% 50%", scale: 0.86 },
  },
];

export const ubeTreats: ProductItem[] = [
  {
    name: "Ube Cashew Squares",
    image: "/products/product-ube-cashew.png",
    imageFocus: { position: "50% 48%", scale: 0.86 },
  },
  {
    name: "Cheesy Coconut Macaroons with Ube",
    image: "/products/product-cheesy-macaroons.png",
    imageFocus: { position: "50% 45%", scale: 0.82 },
  },
];

export const flavorsOfFrance: ProductItem[] = [
  {
    name: "Chocolate Crinkles",
    description: "Bold, luxurious chocolate flavor without being overly sweet.",
    image: "/products/product-chocolate-crinkles.png",
    imageFocus: { position: "50% 50%", scale: 0.75, rotate: 0 },
  },
  {
    name: "Double Choco Cupcake",
    description:
      "Deep, velvety chocolate flavor, soft and luscious. each cupcake is topped with swirl of silky chocolate buttercream",
    // Pre-masked Figma fill — rotates with the france blob (frameLockedPhoto).
    image: "/products/product-double-choco-cupcakes-figma.png",
    imageFocus: { position: "50% 50%", scale: 0.9 },
  },
  {
    name: "Choco Decadent Cups",
    description: "Silky smooth, intense deep chocolate, sinfully decadent.",
    image: "/products/product-choco-decadent-cups.png",
    imageFocus: { position: "50% 50%", scale: 0.76, rotate: 0 },
  },
];
