import { useState } from "react";

export default function ProductoCard({ producto, agregarAlCarrito, goToCheckout }) {

    const [talla, setTalla] = useState("S");

    // 🧠 color inicial dinámico
    const [color, setColor] = useState(producto.variantes[0].color);

    // 🔍 obtener variante seleccionada
    const varianteSeleccionada = producto.variantes.find(
        (v) => v.color === color
    );

    return (
        <div className="bg-gradient-to-br from-purple-900 to-blue-900 text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 border border-purple-500">

            {/* 🖼️ IMAGEN DINÁMICA */}
            <img
                src={varianteSeleccionada?.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-contain rounded-xl mb-3 transition hover:scale-105"
            />

            {/* NOMBRE */}
            <h2 className="text-xl font-bold">{producto.nombre}</h2>

            {/* PRECIO */}
            <p className="text-blue-300 text-lg font-semibold">
                ${producto.precio}
            </p>

            {/* TALLA */}
            <select
                className="w-full mt-2 p-2 rounded bg-black/40 border border-purple-400"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
            >
                <option value="S">Talla S</option>
                <option value="M">Talla M</option>
                <option value="L">Talla L</option>
            </select>

            {/* 🎨 COLOR DINÁMICO */}
            <select
                className="w-full mt-2 p-2 rounded bg-black/40 border border-blue-400"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            >
                {producto.variantes.map((v, i) => (
                    <option key={i} value={v.color}>
                        {v.color}
                    </option>
                ))}
            </select>

            {/* BOTONES */}
            <button
                onClick={() =>
                    agregarAlCarrito({
                        ...producto,
                        talla,
                        color,
                        imagen: varianteSeleccionada.imagen, // 🔥 importante
                    })
                }
                className="w-full mt-3 bg-purple-600 hover:bg-purple-500 p-2 rounded-xl shadow-md"
            >
                🛒 Agregar al carrito
            </button>

            <button
                onClick={() =>
                    goToCheckout({
                        ...producto,
                        talla,
                        color,
                        imagen: varianteSeleccionada.imagen, // 🔥 importante
                    })
                }
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 p-2 rounded-xl shadow-md"
            >
                ⚡ Comprar ahora
            </button>
        </div>
    );
}