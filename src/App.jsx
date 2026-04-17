import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./pages/Login";
import Inicio from "./pages/Index";
import Checkout from "./pages/Checkout";
import Carrito from "./pages/Carrito";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [pantalla, setPantalla] = useState("inicio");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);


  const logout = async () => {
    await signOut(auth);
  };

  if (!usuario) {
    return <Login />;
  }

  if (pantalla === "checkout") {
    return (
      <Checkout
        producto={productoSeleccionado}
        regresar={() => setPantalla("inicio")}
      />
    );
  }
  if (pantalla === "carrito") {
    return (
      <Carrito
        carrito={carrito}
        irAInicio={() => setPantalla("inicio")}
        irACheckout={() => setPantalla("checkout")}
      />
    );
  }

  return (
    <>
      {/* 🔴 BOTÓN LOGOUT */}
      <div className="p-2 flex justify-end">
        <button
          onClick={logout}
          className="text-red-500 font-bold"
        >
          Cerrar sesión
        </button>
      </div>

      <Inicio
        agregarAlCarrito={agregarAlCarrito}
        irAlCarrito={() => setPantalla("carrito")}
        goToCheckout={(producto) => {
          setProductoSeleccionado(producto);
          setPantalla("checkout");
        }}
      />
    </>
  );
}

export default App;