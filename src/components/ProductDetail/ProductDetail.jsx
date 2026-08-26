import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./ProductDetail.module.css";
import { useProduct } from "../../hooks/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { product, isLoading, error } = useProduct(productId);
  if (isLoading) {
    return <div className={styles.state}>Cargando detalle...</div>;
  }

  if (error || !product) {
    return (
      <div className={styles.state}>
        {error || "No encontramos el producto."}{" "}
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.breadcrumbs}>
        <Link to="/">Inicio</Link>
        {/* <span>/</span> */}
        {/* <span>{product.category}</span> */}
        <span>/</span>
        <strong>{product.title}</strong>
      </div>
      <article className={styles.detail}>
        <section className={styles.gallery}>
          {/* <span className={styles.discount}>
            -{Math.round(product.discountPercentage)}%
          </span> */}
          <img src={product.thumbnail} alt={product.title} />
        </section>
        <section className={styles.info}>
          <span className={styles.condition}>
            Podés comprar hasta {Math.min(product.stock, 10)} unidades.
          </span>
          <h1>{product.title}</h1>
          <div className={styles.rating}>
            <span>{product.rating?.toFixed(1)}</span> ★★★★★
          </div>
          <p className={styles.price}>
            ${" "}
            {product.price.toLocaleString("es-AR", {
              maximumFractionDigits: 0,
            })}
          </p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </section>
        {/* <aside className={styles.buyBox}>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </aside> */}
      </article>
    </>
  );
};
export default ProductDetail;
