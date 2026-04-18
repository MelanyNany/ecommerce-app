export default function CheckoutForm({
    nombre, setNombre,
    cp, setCp,
    estado, municipio,
    colonias, colonia, setColonia,
    calle,
    numero,
    consultarCP
}) {
    let timeout;

    return (
        <>
            <input
                className="input-neon"
                name="full_name"
                placeholder="Nombre"
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                className="input-neon"
                name="postal_code"
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

            <input
                className="input-disabled"
                name="state"
                value={estado}
                placeholder="Estado"
                disabled
            />

            <input
                className="input-disabled"
                name="city"
                value={municipio}
                placeholder="Municipio"
                disabled
            />

            <select
                className="input-neon"
                name="neighborhood"
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
                type="text"
                name="street_address"
                placeholder="Calle"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
            />

            <input
                className="input-neon"
                type="text"
                name="house_number"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
            />
        </>
    );
}