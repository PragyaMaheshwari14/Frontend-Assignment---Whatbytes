import { Filters, Product } from "@/types";

export function filterProducts(products: Product[], filters: Filters): Product[] {
  const search = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false;
    }

    if (search) {
      const haystack = `${product.title} ${product.description}`.toLowerCase();
      if (!haystack.includes(search)) {
        return false;
      }
    }

    return true;
  });
}