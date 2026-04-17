import ProductoCard from "../components/ProductoCard";

export default function Index({ goToCheckout, agregarAlCarrito, irAlCarrito }) {
    const productos = [
        {
            id: 1,
            nombre: "Playera",
            precio: 300,
            imagen: "https://via.placeholder.com/300x200?text=Playera",
        },
        {
            id: 2,
            nombre: "Pantalón",
            precio: 800,
            imagen: "https://via.placeholder.com/300x200?text=Pantalon",
        },
        {
            id: 3,
            nombre: "Chamarra",
            precio: 600,
            imagen: "https://via.placeholder.com/300x200?text=Chamarra",
        },
    ];

    return (
        <div className="min-h-screen bg-black p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-purple-400">
                    🛍️ Tienda Neon
                </h1>

                <button
                    onClick={irAlCarrito}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl"
                >
                    Ver carrito
                </button>
            </div>

            {/* GRID */}
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