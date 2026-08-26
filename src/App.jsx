import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="productos/:productId" element={<ProductDetail />} />
      <Route path="carrito" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
export default App;
