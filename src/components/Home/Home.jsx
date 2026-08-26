import Products from "../Products/Products";
import { useProducts } from "../../hooks/useProducts";
import styles from "./Home.module.css";

const Home = () => {
  const { products, isLoading, error } = useProducts();

  return (
    <>
      <div>
        <h1>Productos disponibles</h1>
      </div>
      <section id="productos" className={styles.catalog}>
        <Products products={products} isLoading={isLoading} error={error} />
      </section>
    </>
  );
};

export default Home;
