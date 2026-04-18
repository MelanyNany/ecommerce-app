import ResumenProducto from "./ResumenProducto";
export default function CheckoutResumen({ items, total }) {
    return (
        <div className="bg-black/40 border border-blue-500 p-6 rounded-2xl shadow-xl h-fit">

            <h3 className="text-xl font-bold mb-4 text-blue-300">
                🛒 Resumen del pedido
            </h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {items.map((p, i) => (
                    <ResumenProducto key={i} producto={p} />
                ))}
            </div>

            <div className="border-t border-gray-600 my-4"></div>

            <div className="flex justify-between text-lg">
                <span>Total:</span>
                <span className="text-green-400 font-bold text-xl">
                    ${total}
                </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
                Envío calculado automáticamente 🚚
            </p>
        </div>
    );
}