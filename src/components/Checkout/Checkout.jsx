import { useState } from "react";
import styles from "./Checkout.module.css";
import { createSell } from "../../services/products.service";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";

const Checkout = () => {
  const [form, setForm] = useState();
  const [created, setCreated] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { cart, totalPrice } = useCart();

  const handleChange = ({ target }) =>
    setForm((current) => ({ ...current, [target.name]: target.value }));

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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

    createSell(newSell)
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });

    setError("");
    setCreated(null);
    setLoading(false);
  };
  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <span>Finaliza tu compra</span>
        {/* <h1>Finaliza tu compra</h1> */}
        {/* <div>
          <strong>💡 Importante</strong>
          <p>Asegurate completar todos tus datos</p>
        </div> */}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input
            name="name"
            onChange={handleChange}
            placeholder="Peter Parker"
            required
          />
        </label>
        <div className={styles.row}>
          <label>
            Calle
            <input
              name="street"
              onChange={handleChange}
              placeholder="Calle Falsa"
            />
          </label>
          <label>
            Numero
            <input name="number" onChange={handleChange} placeholder="1234" />
          </label>
        </div>
        <label>
          Pais
          <input
            name="country"
            onChange={handleChange}
            placeholder="Argentina"
          />
        </label>
        <label>
          Codigo postal
          <input name="zip" onChange={handleChange} placeholder="ABC1234" />
        </label>
        <label>
          Identificacion
          <input
            name="identification"
            onChange={handleChange}
            placeholder="123456789"
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button disabled={loading}>{loading ? "Creando..." : "Comprar"}</button>
        {created && (
          <div className={styles.success}>
            <strong>✓ Compra creada correctamente</strong>
          </div>
        )}
      </form>
    </section>
  );
};
export default Checkout;
