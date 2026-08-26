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
          <p className={styles.price}>$ {product.price.toFixed(2)}</p>
          {/* <p className={styles.installments}>en 6 cuotas sin interés</p> */}
          <hr />
          <h2>Lo que tenés que saber</h2>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          {/* <ul>
            <li>
              Marca: <strong>{product.brand || "Genérica"}</strong>
            </li>
            <li>
              Categoría: <strong>{product.category}</strong>
            </li>
            <li>
              Garantía:{" "}
              <strong>
                {product.warrantyInformation || "Garantía del vendedor"}
              </strong>
            </li>
            <li>
              Envío:{" "}
              <strong>
                {product.shippingInformation || "Entrega disponible"}
              </strong>
            </li>
          </ul> */}
          {/* <p className={styles.description}>{product.description}</p> */}
        </section>
        <aside className={styles.buyBox}>
          {/* <p className={styles.free}>Envío gratis</p> */}
          {/* <strong>Recibilo entre 3 y 5 días</strong>
          <p>Stock disponible</p>
          <small>
            Podés comprar hasta {Math.min(product.stock, 10)} unidades.
          </small> */}
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          {/* <div className={styles.protection}>
            <span>✓</span>
            <p>
              <strong>Compra protegida</strong>
              <br />
              Recibí el producto que esperabas o te devolvemos tu dinero.
            </p>
          </div> */}
        </aside>
      </article>
    </>
  );
};
export default ProductDetail;
