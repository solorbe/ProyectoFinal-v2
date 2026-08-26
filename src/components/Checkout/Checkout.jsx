import { useState } from "react";
import styles from "./Checkout.module.css";
import { createSell } from "../../services/products.service";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";

const Checkout = () => {
  const [form, setForm] = useState({});
  const [created, setCreated] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart, totalPrice, clearCart } = useCart();

  const handleChange = ({ target }) =>
    setForm((current) => ({ ...current, [target.name]: target.value }));

  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const newSell = {
  //     items: cart,
  //     buyer: {
  //       name: form.name,
  //       address: {
  //         street: form.street,
  //         number: form.number,
  //         country: form.country,
  //         zip: form.zip,
  //       },
  //       identification: form.identification,
  //     },
  //     totalAmount: totalPrice,
  //     status: "APPROVE",
  //     createdAt: new Date(),
  //   };

  //   createSell(newSell)
  //     .then(() => {
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //   setError("");
  //   setCreated(null);
  //   setLoading(false);
  //   clearCart();
  //   //vaciar carrito después de crear la venta
  //   alert(
  //     "Compra realizada con éxito. Serás redirigido a la página principal.",
  //   );
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const newSell = {
      items: cart,
      buyer: {
        name: form.name,
        address: {
          street: form.street,
          number: form.number,
          country: form.country,
          zip: form.zip,
        },
        identification: form.identification,
      },
      totalAmount: totalPrice,
      status: "APPROVE",
      createdAt: new Date(),
    };

    try {
      await createSell(newSell);

      clearCart();

      alert(
        "Compra realizada con éxito. Serás redirigido a la página principal.",
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al crear la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <h2>Finaliza tu compra</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input
            name="name"
            onChange={handleChange}
            placeholder="escribi tu nombre"
            required
          />
        </label>
        <div className={styles.row}>
          <label>
            Calle
            <input
              name="street"
              onChange={handleChange}
              placeholder="escribi tu calle"
            />
          </label>
          <label>
            Numero
            <input
              name="number"
              onChange={handleChange}
              placeholder="escribi tu numero"
            />
          </label>
        </div>
        <label>
          Pais
          <input
            name="country"
            onChange={handleChange}
            placeholder="escribi tu pais"
          />
        </label>
        <label>
          Codigo postal
          <input
            name="zip"
            onChange={handleChange}
            placeholder="escribi tu codigo postal"
          />
        </label>
        <label>
          Identificacion
          <input
            name="identification"
            onChange={handleChange}
            placeholder="escribi tu identificacion"
            required
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button disabled={loading}>{loading ? "Creando..." : "Comprar"}</button>
      </form>
    </section>
  );
};
export default Checkout;
