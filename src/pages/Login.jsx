import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Correo o contraseña incorrectos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-blue-900">

            <form
                onSubmit={handleSubmit}
                className="bg-black/40 backdrop-blur-md border border-purple-500 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white"
            >
                {/* TITULO */}
                <h2 className="text-3xl mb-6 font-bold text-center text-purple-400">
                    🔐 Iniciar Sesión
                </h2>

                {/* ERROR */}
                {error && (
                    <p className="bg-red-500/20 border border-red-400 text-red-300 p-2 mb-4 rounded text-sm text-center">
                        {error}
                    </p>
                )}

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-black/50 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-black/50 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* BOTON */}
                <button
                    disabled={loading}
                    className={`w-full p-3 rounded-lg font-semibold transition-all ${loading
                            ? "bg-gray-600"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105"
                        }`}
                >
                    {loading ? "Cargando..." : "Entrar"}
                </button>

                {/* EXTRA */}
                <p className="text-center text-sm text-gray-400 mt-4">
                    ¿No tienes cuenta?{" "}
                    <span className="text-blue-400 cursor-pointer hover:underline">
                        Regístrate
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;