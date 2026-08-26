import { useEffect, useState } from "react";
import { getProducts } from "../services/products.service";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const productsFromApi = await getProducts();
        setProducts(productsFromApi);
      } catch (requestError) {
        console.error(requestError);
        setError("No pudimos cargar los productos. Intentá nuevamente.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, isLoading, error };
}
