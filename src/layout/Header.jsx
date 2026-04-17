export default function Header({ usuario, carrito, setPantalla, logout }) {
    return (
        <div className="flex justify-between items-center p-4 border-b border-purple-500 bg-black/30 backdrop-blur-md">

            <h1 className="text-xl font-bold text-purple-400">
                🛍️ Eccomerce App
            </h1>

            <div className="flex items-center gap-4">

                <span className="text-sm text-gray-300 hidden md:block">
                    {usuario?.email}
                </span>

                <button
                    onClick={() => setPantalla("carrito")}
                    className="relative bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-xl"
                >
                    🛒
                    {carrito.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-2 rounded-full">
                            {carrito.length}
                        </span>
                    )}
                </button>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-500 px-3 py-2 rounded-xl text-sm"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}