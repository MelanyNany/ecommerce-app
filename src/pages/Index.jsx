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
        <div className="h-auto bg-black p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-purple-400">
                    🛍️ Productos
                </h1>


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