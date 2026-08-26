import { useEffect, useState } from "react";
import { getProductById } from "../services/products.service";

export function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      setError(null);
      setProduct(null);

      try {
        const productFromApi = await getProductById(productId);
        setProduct(productFromApi);
      } catch (requestError) {
        console.error(requestError);
        setError("No pudimos cargar el producto.");
      } finally {
        setIsLoading(false);
      }
    }

    if (productId) loadProduct();
  }, [productId]);

  return { product, isLoading, error };
}
