import { useState } from "react";

import useAuth from "./hooks/useAuth";

import Login from "./pages/Login";
import Inicio from "./pages/Index";
import Checkout from "./pages/Checkout";
import Carrito from "./pages/Carrito";

import Layout from "./layout/layout.jsx";

function App() {
  const { usuario, logout } = useAuth();

  const [pantalla, setPantalla] = useState("inicio");
  const [carrito, setCarrito] = useState([]);
  const [itemsCheckout, setItemsCheckout] = useState([]);
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  // 🔐 LOGIN SIN HEADER
  if (!usuario) {
    return <Login />;
  }

  // 🔁 CONTROL DE PANTALLAS (SIN RETURN)
  let contenido;

  switch (pantalla) {
    case "checkout":
      contenido = (
        <Checkout
          items={itemsCheckout}
          regresar={() => setPantalla("inicio")}
        />
      );
      break;

    case "carrito":
      contenido = (
        <Carrito
          carrito={carrito}
          irAInicio={() => setPantalla("inicio")}
          irACheckout={() => {
            setItemsCheckout(carrito);
            setPantalla("checkout");
          }}
        />
      );
      break;

    default:
      contenido = (
        <Inicio
          agregarAlCarrito={agregarAlCarrito}
          irAlCarrito={() => setPantalla("carrito")}
          goToCheckout={(producto) => {
            setItemsCheckout([producto]);
            setPantalla("checkout");
          }}
        />
      );
  }

  // 🔥 AQUÍ YA TODO TIENE HEADER
  return (
    <Layout
      usuario={usuario}
      carrito={carrito}
      setPantalla={setPantalla}
      logout={logout}
    >
      {contenido}
    </Layout>
  );
}

export default App;