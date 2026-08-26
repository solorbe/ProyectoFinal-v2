import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";

const Header = () => {
  const { totalItems } = useCart();
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegación principal">
        <NavLink to="/" className={styles.brand}>
          Violeta - Jeans
        </NavLink>
        <div className={styles.links}>
          <NavLink to="/" end className={linkClass}>
            Inicio
          </NavLink>
          <NavLink
            to="/carrito"
            className={`${styles.link} ${styles.cart}`}
            aria-label={`Carrito con ${totalItems} productos`}
          >
            <span aria-hidden="true">🛒</span> Carrito{" "}
            <span className={styles.badge}>{totalItems}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
export default Header;
