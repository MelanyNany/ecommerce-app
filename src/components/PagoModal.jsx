import { useState } from "react";

export default function PagoModal({ onClose, onConfirmar }) {
    const [tarjeta, setTarjeta] = useState("");
    const [cvv, setCvv] = useState("");
    const [fecha, setFecha] = useState("");



    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

            <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-2xl w-80 text-white border border-blue-500 shadow-xl">

                <h3 className="text-lg font-bold mb-4 text-center">
                    💳 Pago con tarjeta
                </h3>

                {/* 💳 TARJETA VISUAL */}
                {/* 💡 DATOS DEMO */}
                <div className="bg-black/50 border border-blue-400 p-3 rounded-xl mb-4 text-sm">

                    <p className="text-gray-300 mb-2 text-center">
                        💡 Datos de prueba
                    </p>

                    <div className="space-y-1 text-center">

                        <p className="flex justify-between items-center">
                            <span>Tarjeta:</span>
                            <button
                                onClick={() => navigator.clipboard.writeText("4242424242424242")}
                                className="text-blue-300 hover:underline"
                            >
                                4242 4242 4242 4242 📋
                            </button>
                        </p>

                        <p className="flex justify-between items-center">
                            <span>Fecha:</span>
                            <button
                                onClick={() => navigator.clipboard.writeText("12/28")}
                                className="text-blue-300 hover:underline"
                            >
                                12/28 📋
                            </button>
                        </p>

                        <p className="flex justify-between items-center">
                            <span>CVV:</span>
                            <button
                                onClick={() => navigator.clipboard.writeText("123")}
                                className="text-blue-300 hover:underline"
                            >
                                123 📋
                            </button>
                        </p>

                    </div>
                </div>

                {/* INPUTS */}
                <input
                    className="input-neon mb-2"
                    placeholder="Número de tarjeta"
                    maxLength={16}
                    value={tarjeta}
                    onChange={(e) => setTarjeta(e.target.value)}
                />

                <input
                    className="input-neon mb-2"
                    placeholder="Fecha (MM/YY)"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />

                <input
                    className="input-neon mb-2"
                    placeholder="CVV"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />

                {/* 🔥 BOTÓN DEMO */}


                {/* ACCIONES */}
                <button
                    onClick={() => {
                        if (!tarjeta || !cvv || !fecha) {
                            Swal.fire({
                                icon: "error",
                                title: "Datos incompletos",
                                text: "Ingresa los datos de la tarjeta 💳",
                                confirmButtonColor: "#2563eb",
                                background: "#0f172a",
                                color: "#fff",
                            });
                            return;
                        }
                        onConfirmar();
                    }}
                    className="btn-neon-blue w-full"
                >
                    Confirmar pago
                </button>

                <button
                    onClick={onClose}
                    className="text-red-400 w-full mt-2"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}