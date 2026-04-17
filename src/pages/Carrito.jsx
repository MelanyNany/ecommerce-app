export default function Carrito({ carrito, irAInicio, irACheckout }) {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 p-6 text-white">

            {/* HEADER */}
            <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center">
                🛒 Tu Carrito
            </h2>

            {/* CONTENIDO */}
            <div className="max-w-md mx-auto space-y-4">

                {carrito.length === 0 ? (
                    <div className="text-center bg-black/40 border border-purple-500 p-6 rounded-xl">
                        <p className="text-gray-300">Tu carrito está vacío</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Agrega productos para comenzar
                        </p>
                    </div>
                ) : (
                    carrito.map((item, i) => (
                        <div
                            key={i}
                            className="bg-black/40 border border-blue-500 p-4 rounded-xl shadow-lg hover:scale-[1.02] transition"
                        >
                            <p className="font-bold text-lg">{item.nombre}</p>
                            <p className="text-blue-300">${item.precio}</p>

                            <div className="text-sm text-gray-300 mt-1">
                                <p>Talla: {item.talla}</p>
                                <p>Color: {item.color}</p>
                            </div>
                        </div>
                    ))
                )}

                {/* TOTAL */}
                {carrito.length > 0 && (
                    <div className="bg-black/50 border border-purple-400 p-4 rounded-xl text-center">
                        <p className="text-lg">Total:</p>
                        <p className="text-2xl font-bold text-green-400">
                            ${total}
                        </p>
                    </div>
                )}

                {/* BOTONES */}
                <div className="flex gap-3">
                    <button
                        onClick={irAInicio}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-xl transition"
                    >
                        ← Seguir comprando
                    </button>

                    <button
                        onClick={irACheckout}
                        disabled={carrito.length === 0}
                        className={`flex-1 p-3 rounded-xl font-semibold transition ${carrito.length === 0
                                ? "bg-gray-500"
                                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105"
                            }`}
                    >
                        💳 Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}