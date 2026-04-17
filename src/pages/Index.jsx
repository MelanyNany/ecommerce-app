import { useState } from "react";

export default function Index({ goToCheckout, agregarAlCarrito, irAlCarrito }) {
    const productos = [
        { id: 1, nombre: "Playera", precio: 300 },
        { id: 2, nombre: "Pantalon", precio: 800 },
        { id: 3, nombre: "Chamarra", precio: 600 },
    ];

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {productos.map((p) => {
                const [talla, setTalla] = useState("S");
                const [color, setColor] = useState("Rojo");

                return (
                    <div key={p.id} className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-lg font-bold">{p.nombre}</h2>
                        <p className="text-gray-600">${p.precio}</p>

                        {/* TALLA */}
                        <select
                            className="w-full mt-2 border p-2 rounded"
                            onChange={(e) => setTalla(e.target.value)}
                        >
                            <option value="S">Talla S</option>
                            <option value="M">Talla M</option>
                            <option value="L">Talla L</option>
                        </select>

                        {/* COLOR */}
                        <select
                            className="w-full mt-2 border p-2 rounded"
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                        </select>
                        <button
                            onClick={() =>
                                agregarAlCarrito({
                                    ...p,
                                    talla,
                                    color,
                                })
                            }
                            className="bg-yellow-500 text-white w-full mt-2 p-2 rounded"
                        >
                            Agregar al carrito
                        </button>
                        {/* 🔥 ENVIAMOS TODO */}
                        <button
                            onClick={() =>
                                goToCheckout({
                                    ...p,
                                    talla,
                                    color,
                                })
                            }
                            className="bg-green-500 text-white w-full mt-3 p-2 rounded"
                        >
                            Comprar
                        </button>
                        <button
                            onClick={irAlCarrito}
                            className="bg-black text-white p-2 rounded mb-4"
                        >
                            Ver carrito
                        </button>
                    </div>
                );
            })}
        </div>
    );
}