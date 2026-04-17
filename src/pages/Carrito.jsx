export default function Carrito({ carrito, irAInicio, irACheckout }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Carrito</h2>

            {carrito.length === 0 ? (
                <p>No hay productos</p>
            ) : (
                carrito.map((item, i) => (
                    <div key={i} className="border p-2 mb-2">
                        <p>{item.nombre}</p>
                        <p>${item.precio}</p>
                        <p>Talla: {item.talla}</p>
                        <p>Color: {item.color}</p>
                    </div>
                ))
            )}

            <button
                onClick={irAInicio}
                className="bg-gray-500 text-white p-2 mt-2"
            >
                Seguir comprando
            </button>

            <button
                onClick={irACheckout}
                className="bg-green-500 text-white p-2 mt-2 ml-2"
            >
                Ir a pagar
            </button>
        </div>
    );
}