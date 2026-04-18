import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";

export default function RegisterModal({ onClose }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        if (!nombre || !email || !password) {
            Swal.fire("Faltan datos", "Completa todos los campos", "warning");
            return;
        }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);

            // 🔥 guardar nombre
            await updateProfile(userCred.user, {
                displayName: nombre,
            });

            Swal.fire({
                icon: "success",
                title: "Cuenta creada 🎉",
                confirmButtonColor: "#7c3aed",
                background: "#0f172a",
                color: "#fff",
            });

            onClose();
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

            <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 rounded-2xl w-80 text-white border border-purple-500 shadow-xl">

                <h3 className="text-xl font-bold mb-4 text-center">
                    📝 Crear cuenta
                </h3>

                <input
                    className="input-neon mb-2"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    className="input-neon mb-2"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="input-neon mb-3"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="btn-neon-purple w-full"
                >
                    Registrarme
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