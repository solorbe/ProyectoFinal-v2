import { Outlet } from "react-router"; //donde se renderizarán las rutas hijas
import Header from "../Header/Header";
import styles from "./Layout.module.css";

const Layout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
export default Layout;
