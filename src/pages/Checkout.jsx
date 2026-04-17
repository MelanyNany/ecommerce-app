import { useState } from "react";
import { db, auth } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

import ResumenProducto from "../components/ResumenProducto";
import CheckoutForm from "../components/CheckoutForm";
import PagoModal from "../components/PagoModal";

export default function Checkout({ producto, regresar }) {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cp, setCp] = useState("");
    const [estado, setEstado] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [colonias, setColonias] = useState([]);
    const [colonia, setColonia] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [pagado, setPagado] = useState(false);

    const consultarCP = async (cp) => {
        try {
            const res = await fetch("http://localhost:3001/api/cp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cp }),
            });

            const data = await res.json();

            setEstado(data.estado || "");
            setMunicipio(data.municipio || "");
            setColonias(data.colonias || []);
        } catch (error) {
            console.error(error);
        }
    };

    const simularPago = async () => {
        await addDoc(collection(db, "compra"), {
            usuario: auth.currentUser?.email || "invitado",
            producto,
            cliente: { nombre },
            envio: { cp, estado, municipio, colonia, direccion },
            fecha: new Date(),
        });

        setPagado(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 p-6 text-white">

            <button onClick={regresar} className="mb-4 text-blue-400">
                ← Seguir comprando
            </button>

            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <div className="space-y-4 max-w-md mx-auto">
                <ResumenProducto producto={producto} />

                <CheckoutForm
                    {...{
                        nombre, setNombre,
                        cp, setCp,
                        estado, municipio,
                        colonias, colonia, setColonia,
                        direccion, setDireccion,
                        consultarCP
                    }}
                />

                <button
                    onClick={() => setMostrarModal(true)}
                    className="btn-neon-purple w-full"
                >
                    Pagar
                </button>

                {pagado && (
                    <p className="text-green-400 text-center font-bold">
                        Pago exitoso 🎉
                    </p>
                )}
            </div>

            {mostrarModal && (
                <PagoModal
                    onClose={() => setMostrarModal(false)}
                    onConfirmar={() => {
                        setMostrarModal(false);
                        simularPago();
                    }}
                />
            )}
        </div>
    );
}