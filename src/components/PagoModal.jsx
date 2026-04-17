import { useState } from "react";

export default function PagoModal({ onClose, onConfirmar }) {
    const [tarjeta, setTarjeta] = useState("");
    const [cvv, setCvv] = useState("");
    const [fecha, setFecha] = useState("");

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-2xl w-80 text-white border border-blue-500">

                <h3 className="text-lg font-bold mb-4 text-center">
                    💳 Pago con tarjeta
                </h3>

                <input
                    className="input-neon mb-2"
                    placeholder="Número de tarjeta"
                    maxLength={16}
                    onChange={(e) => setTarjeta(e.target.value)}
                />

                <input
                    className="input-neon mb-2"
                    placeholder="Fecha (MM/YY)"
                    onChange={(e) => setFecha(e.target.value)}
                />

                <input
                    className="input-neon mb-2"
                    placeholder="CVV"
                    maxLength={3}
                    onChange={(e) => setCvv(e.target.value)}
                />

                <button
                    onClick={() => {
                        if (!tarjeta || !cvv || !fecha) {
                            alert("Completa los datos");
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