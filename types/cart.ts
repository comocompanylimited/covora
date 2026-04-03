export interface CartItem {
  id: string; // unique key: productId-variationId or productId
  productId: number;
  variationId?: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
  selectedAttributes: Record<string, string>; // e.g. { Size: "M", Colour: "Black" }
  sku: string;
  maxQuantity: number | null;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
