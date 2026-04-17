export default function ResumenProducto({ producto }) {
    return (
        <div className="bg-black/40 border border-purple-500 p-4 rounded-xl text-white">
            <p className="font-bold text-lg">{producto.nombre}</p>
            <p className="text-blue-300">${producto.precio}</p>
            <p className="text-sm">Talla: {producto.talla}</p>
            <p className="text-sm">Color: {producto.color}</p>
        </div>
    );
}