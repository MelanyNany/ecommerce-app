
import chamNegra from "../assets/img/productos/cham-bad.webp";
import chamBlanca from "../assets/img/productos/cham-blanca.webp";
import chamRoja from "../assets/img/productos/cham-roja.webp";

import pantBlanco from "../assets/img/productos/pant-blanco.webp";
import pantNegro from "../assets/img/productos/pant-negro.webp";
import pantRojo from "../assets/img/productos/pant-rojo.webp";

import playBlanca from "../assets/img/productos/play-blanca.webp";
import playNegra from "../assets/img/productos/play-negra.webp";
import playRoja from "../assets/img/productos/play-roja.webp";

export const productos = [
    {
        id: 1,
        nombre: "Chamarra",
        precio: 900,
        categoria: "chamarras",

        variantes: [
            { color: "Negro", imagen: chamNegra },
            { color: "Blanco", imagen: chamBlanca },
            { color: "Rojo", imagen: chamRoja },
        ],
    },

    {
        id: 2,
        nombre: "Pantalón",
        precio: 750,
        categoria: "pantalones",

        variantes: [
            { color: "Blanco", imagen: pantBlanco },
            { color: "Negro", imagen: pantNegro },
            { color: "Rojo", imagen: pantRojo },
        ],
    },

    {
        id: 3,
        nombre: "Playera",
        precio: 350,
        categoria: "playeras",

        variantes: [
            { color: "Blanco", imagen: playBlanca },
            { color: "Negro", imagen: playNegra },
            { color: "Rojo", imagen: playRoja },
        ],
    },
];