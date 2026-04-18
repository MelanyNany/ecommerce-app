export default function ResumenProducto({ producto }) {
    return (
        <div className="flex gap-3 items-center bg-black/50 border border-purple-400 p-3 rounded-xl">

            {/* 🖼️ IMAGEN */}
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-16 h-16 object-cover rounded-lg border border-blue-400"
            />

            {/* 📦 INFO */}
            <div className="flex-1">
                <p className="font-bold text-sm">{producto.nombre}</p>
                <p className="text-blue-300 text-sm">${producto.precio}</p>

                <div className="text-xs text-gray-400">
                    <p>Talla: {producto.talla}</p>
                    <p>Color: {producto.color}</p>
                </div>
            </div>

        </div>
    );
}