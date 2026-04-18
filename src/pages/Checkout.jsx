import { useState } from "react";
import { db, auth } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";

import CheckoutResumen from "../components/CheckoutResumen";

import ResumenProducto from "../components/ResumenProducto";
import CheckoutForm from "../components/CheckoutForm";
import PagoModal from "../components/PagoModal";

export default function Checkout({ items, regresar }) {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cp, setCp] = useState("");
    const [estado, setEstado] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [colonias, setColonias] = useState([]);
    const [colonia, setColonia] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [pagado, setPagado] = useState(false);
    const total = items.reduce((acc, p) => acc + p.precio, 0);
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
            productos: items,
            total,
            cliente: { nombre },
            envio: { cp, estado, municipio, colonia, direccion },
            fecha: new Date(),
        });

        Swal.fire({
            icon: "success",
            title: "Pago exitoso 🎉",
            text: "Tu compra ha sido registrada",
            confirmButtonColor: "#16a34a",
            background: "#0f172a",
            color: "#fff",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 p-6 text-white">

            {/* HEADER */}
            <button onClick={regresar} className="mb-6 text-blue-400">
                ← Seguir comprando
            </button>

            <h2 className="text-3xl font-bold mb-6 text-purple-400">
                💳 Checkout
            </h2>

            {/* GRID PRINCIPAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

                {/* 🧾 IZQUIERDA - FORMULARIO */}
                <div className="bg-black/40 border border-purple-500 p-6 rounded-2xl shadow-xl">

                    <h3 className="text-xl font-bold mb-4 text-purple-300">
                        📦 Datos de envío
                    </h3>

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
                        onClick={() => {
                            if (!nombre || !cp || !estado || !colonia || !direccion) {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Faltan datos",
                                    text: "Completa todos los datos de envío 📦",
                                    confirmButtonColor: "#7c3aed", // morado
                                    background: "#0f172a",
                                    color: "#fff",
                                });
                                return;
                            }

                            setMostrarModal(true);
                        }}
                        className="btn-neon-purple w-full mt-6"
                    >
                        💳 Continuar al pago
                    </button>

                </div>

                {/* 🛍️ DERECHA - RESUMEN */}
                <CheckoutResumen items={items} total={total} />

            </div>

            {/* MODAL */}
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