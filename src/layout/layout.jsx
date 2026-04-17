import Header from "./Header";

export default function Layout({ usuario, carrito, setPantalla, logout, children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white">

            <Header
                usuario={usuario}
                carrito={carrito}
                setPantalla={setPantalla}
                logout={logout}
            />

            <div className="p-4">
                {children}
            </div>
        </div>
    );
}