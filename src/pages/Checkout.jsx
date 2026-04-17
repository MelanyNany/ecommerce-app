import { useState } from "react";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../firebase/config";

export default function Checkout({ producto, regresar }) {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");

    const [cp, setCp] = useState("");
    const [estado, setEstado] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [colonias, setColonias] = useState([]);
    const [colonia, setColonia] = useState("");
    let timeout;

    const [cargando, setCargando] = useState(false);
    const [pagado, setPagado] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const [tarjeta, setTarjeta] = useState("");
    const [cvv, setCvv] = useState("");
    const [fecha, setFecha] = useState("");

    // 🔍 CONSULTA FEDEX
    const consultarCP = async (cp) => {
        try {
            const res = await fetch("http://localhost:3001/api/cp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cp }),
            });

            const data = await res.json();

            console.log("CP:", data);

            setEstado(data.estado || "");
            setMunicipio(data.municipio || "");
            setColonias(data.colonias || []);

        } catch (error) {
            console.error(error);
        }
    };


    // 💳 SIMULACIÓN DE PAGO + FIREBASE
    const simularPago = async () => {
        if (!nombre || !cp || !estado || !colonia || !direccion) {
            alert("Completa todos los datos");
            return;
        }

        setCargando(true);

        setTimeout(async () => {
            setCargando(false);
            setPagado(true);

            try {
                await addDoc(collection(db, "compra"), {
                    usuario: auth.currentUser?.email || "invitado",

                    producto: {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        talla: producto.talla,
                        color: producto.color,
                    },

                    cliente: {
                        nombre,
                    },

                    envio: {
                        cp,
                        estado,
                        municipio,
                        colonia,
                        direccion,
                    },

                    fecha: new Date(),
                });

                console.log("Compra guardada en Firebase ✅");
            } catch (error) {
                console.error("Error al guardar:", error);
            }
        }, 2000);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            {/* 🔙 */}
            <button
                onClick={regresar}
                className="mb-4 text-blue-600 hover:text-blue-800"
            >
                ← Seguir comprando
            </button>

            <h2 className="text-xl font-bold mb-4">Checkout</h2>

            {/* 🛍️ PRODUCTO */}
            <div className="bg-white p-4 rounded shadow">
                <p className="font-bold">{producto.nombre}</p>
                <p>${producto.precio}</p>
                <p>Talla: {producto.talla}</p>
                <p>Color: {producto.color}</p>
            </div>

            {/* 👤 NOMBRE */}
            <input
                className="border p-2 w-full mt-3 rounded"
                placeholder="Nombre"
                onChange={(e) => setNombre(e.target.value)}
            />

            {/* 📮 CP */}
            <input
                className="border p-2 w-full mt-3 rounded"
                placeholder="Código Postal"
                value={cp}
                onChange={(e) => {
                    const value = e.target.value;
                    setCp(value);

                    clearTimeout(timeout);

                    timeout = setTimeout(() => {
                        if (value.length === 5) {
                            consultarCP(value);
                        }
                    }, 500);
                }}
            />

            {/* 🏙️ ESTADO */}
            <input
                className="border p-2 w-full mt-2 rounded bg-gray-100"
                value={estado}
                placeholder="Estado"
                disabled
            />

            {/* 🏙️ MUNICIPIO */}
            <input
                className="border p-2 w-full mt-2 rounded bg-gray-100"
                value={municipio}
                placeholder="Municipio"
                disabled
            />

            {/* 🏘️ COLONIA */}
            <select
                className="border p-2 w-full mt-2 rounded"
                value={colonia}
                onChange={(e) => setColonia(e.target.value)}
            >
                <option value="">Selecciona colonia</option>
                {colonias.map((c, i) => (
                    <option key={i} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            {/* 🏠 CALLE */}
            <input
                className="border p-2 w-full mt-2 rounded"
                placeholder="Calle y número"
                onChange={(e) => setDireccion(e.target.value)}
            />

            {/* 💳 BOTÓN */}
            <button
                onClick={() => setMostrarModal(true)}
                disabled={cargando}
                className="bg-blue-500 text-white w-full mt-4 p-2 rounded"
            >
                {cargando ? "Procesando pago..." : "Pagar"}
            </button>

            {/* 💳 MODAL */}
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

                        <p className="text-xs text-gray-500 text-center mb-2">
                            Demo: 4242 4242 4242 4242 | 123 | 12/28
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
                            className="bg-green-500 text-white w-full p-2 rounded"
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

            {/* ✅ RESULTADO */}
            {pagado && (
                <p className="text-green-600 mt-4 text-center font-bold">
                    Pago exitoso 🎉
                </p>
            )}
        </div>
    );
}