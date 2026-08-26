import ProductCard from "../ProductCard/ProductCard";
import styles from "./Products.module.css";

const Products = ({ products, error, isLoading }) => {
  if (isLoading) {
    return <div className={styles.message}>Cargando productos...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (products.length === 0) {
    return <div className={styles.message}>Todavía no hay productos.</div>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
