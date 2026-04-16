import { useState } from "react";

export default function Checkout({ producto, regresar }) {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cargando, setCargando] = useState(false);
    const [pagado, setPagado] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tarjeta, setTarjeta] = useState("");
    const [cvv, setCvv] = useState("");
    const [fecha, setFecha] = useState("");

    const simularPago = () => {
        if (!nombre || !direccion) {
            alert("Completa tus datos");
            return;
        }

        setCargando(true);

        setTimeout(() => {
            setCargando(false);
            setPagado(true);
        }, 2000);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>

            <div className="bg-white p-4 rounded shadow">
                <p className="font-bold">{producto.nombre}</p>
                <p>${producto.precio}</p>
                <p className="mt-2">Talla: {producto.talla}</p>
                <p>Color: {producto.color}</p>
            </div>

            <input
                className="border p-2 w-full mt-3 rounded"
                placeholder="Nombre"
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                className="border p-2 w-full mt-3 rounded"
                placeholder="Dirección"
                onChange={(e) => setDireccion(e.target.value)}
            />

            {/* BOTÓN DINÁMICO */}
            <button
                onClick={() => setMostrarModal(true)}
                disabled={cargando}
                className="bg-blue-500 text-white w-full mt-4 p-2 rounded"
            >
                {cargando ? "Procesando pago..." : "Pagar"}
            </button>

            {mostrarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow w-80">
                        <h3 className="text-lg font-bold mb-4 text-center">
                            Pago con tarjeta
                        </h3>

                        <input
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="Número de tarjeta"
                            maxLength={16}
                            onChange={(e) => setTarjeta(e.target.value)}
                        />

                        <input
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="Fecha (MM/YY)"
                            onChange={(e) => setFecha(e.target.value)}
                        />

                        <input
                            className="border p-2 w-full mb-2 rounded"
                            placeholder="CVV"
                            maxLength={3}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                        <button title="Puedes usar los datos demos:
                            Tarjeta: 4242424242424242<br />
                            CVV: 123<br />
                            Fecha: 12/28<br />" className="text-xs">
                            Ayuda


                        </button>
                        <p className="text-xs text-gray-500 text-center mb-2">
                            Puedes usar los datos demos:
                            Tarjeta: 4242424242424242<br />
                            CVV: 123<br />
                            Fecha: 12/28<br />

                        </p>
                        <button
                            onClick={() => {
                                if (!tarjeta || !cvv || !fecha) {
                                    alert("Completa los datos de la tarjeta");
                                    return;
                                }

                                setMostrarModal(false);
                                simularPago();
                            }}
                            className="bg-green-500 text-white w-full p-2 rounded mt-2"
                        >
                            Confirmar pago
                        </button>

                        <button
                            onClick={() => setMostrarModal(false)}
                            className="text-red-500 w-full mt-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* MENSAJE FINAL */}
            {pagado && (
                <p className="text-green-600 mt-4 text-center font-bold">
                    Pago exitoso 🎉
                </p>
            )}
            <button
                onClick={regresar}
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
            >
                ← Seguir comprando
            </button>
        </div>
    );
}