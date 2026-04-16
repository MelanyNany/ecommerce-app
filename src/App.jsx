import { useState } from "react";
import Login from "./pages/Login";
import Inicio from "./pages/Index";
import Checkout from "./pages/Checkout";

function App() {
  const [Usuario, setUsuario] = useState(null);
  const [pantalla, setPantalla] = useState("inicio");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  if (!Usuario) {
    return <Login setUsuario={setUsuario} />;
  }

  if (pantalla === "checkout") {
    return <Checkout producto={productoSeleccionado} regresar={() => setPantalla("inicio")} />;
  }

  return (
    <Inicio
      goToCheckout={(producto) => {
        setProductoSeleccionado(producto);
        setPantalla("checkout");
      }}
    />
  );
}

export default App;