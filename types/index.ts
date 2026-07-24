export interface Product {
  id: number;
  title: string;
  price: number;
  category: "electronics" | "clothing" | "home";
  brand: string;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filters {
  brand: any;
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}
