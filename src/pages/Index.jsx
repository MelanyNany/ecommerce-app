import ProductoCard from "../components/ProductoCard";
import { productos } from "../data/productos";

export default function Index({ goToCheckout, agregarAlCarrito, irAlCarrito }) {

    return (
        <div className="h-auto bg-black p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-purple-400">
                    🛍️ Productos
                </h1>

                <button
                    onClick={irAlCarrito}
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl"
                >
                    🛒 Ver carrito
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productos.map((producto) => (
                    <ProductoCard
                        key={producto.id}
                        producto={producto}
                        agregarAlCarrito={agregarAlCarrito}
                        goToCheckout={goToCheckout}
                    />
                ))}
            </div>
        </div>
    );
}