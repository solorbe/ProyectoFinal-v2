import { Link } from "react-router"; //navegar entre las distintas rutas sin recargar toda la página.
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <article className={styles.card}>
      <Link to={`/productos/${product.id}`} className={styles.imageLink}>
        <img src={product.thumbnail} alt={product.title} />
      </Link>
      <div className={styles.body}>
        {/* <span className={styles.category}>{product.category}</span> */}
        <Link to={`/productos/${product.id}`} className={styles.title}>
          {product.title}
        </Link>
        <div className={styles.rating}>
          ★ {product.rating?.toFixed(1)}{" "}
          <span> Stock disponible: {product.stock}</span>
        </div>
        {/* <p className={styles.price}>$ {product.price}</p> */}
        <p className={styles.price}>
          ${" "}
          {product.price.toLocaleString("es-AR", {
            maximumFractionDigits: 0,
          })}
        </p>
        <button type="button" onClick={() => addToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
};
export default ProductCard;
