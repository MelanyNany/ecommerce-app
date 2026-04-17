export default function CheckoutForm({
    nombre, setNombre,
    cp, setCp,
    estado, municipio,
    colonias, colonia, setColonia,
    direccion, setDireccion,
    consultarCP
}) {
    let timeout;

    return (
        <>
            <input
                className="input-neon"
                placeholder="Nombre"
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                className="input-neon"
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

            <input className="input-disabled" value={estado} placeholder="Estado" disabled />
            <input className="input-disabled" value={municipio} placeholder="Municipio" disabled />

            <select
                className="input-neon"
                value={colonia}
                onChange={(e) => setColonia(e.target.value)}
            >
                <option value="">Selecciona colonia</option>
                {colonias.map((c, i) => (
                    <option key={i}>{c}</option>
                ))}
            </select>

            <input
                className="input-neon"
                placeholder="Calle y número"
                onChange={(e) => setDireccion(e.target.value)}
            />
        </>
    );
}