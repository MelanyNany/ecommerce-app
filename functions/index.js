require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*", // luego puedes cambiarlo a tu dominio Firebase
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;


// 🔐 TOKEN FEDEX
const getToken = async () => {
    const res = await axios.post(
        "https://apis-sandbox.fedex.com/oauth/token",
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.FEDEX_CLIENT_ID,
            client_secret: process.env.FEDEX_CLIENT_SECRET,
        })
    );
    return res.data.access_token;
};


// 📮 CP (SEPOMEX)
app.post("/api/cp", async (req, res) => {
    try {
        const response = await axios.get(
            `https://sepomex.icalialabs.com/api/v1/zip_codes?zip_code=${req.body.cp}`
        );

        const lista = response.data.zip_codes;

        if (!lista?.length) {
            return res.json({
                estado: "",
                municipio: "",
                colonias: [],
            });
        }

        res.json({
            estado: lista[0].d_estado,
            municipio: lista[0].d_mnpio,
            colonias: lista.map((i) => i.d_asenta),
        });

    } catch (error) {
        res.status(500).json({ error: "Error CP" });
    }
});


// 🚚 FEDEX
app.post("/api/fedex-validate", async (req, res) => {
    try {
        const token = await getToken();

        const response = await axios.post(
            "https://apis-sandbox.fedex.com/country/v1/postal/validate",
            {
                validatePostalInput: [
                    {
                        postalCode: req.body.cp,
                        countryCode: "MX",
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: "Error FedEx" });
    }
});

app.listen(PORT, () => {
    console.log("Backend en puerto " + PORT);
});