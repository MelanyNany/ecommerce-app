require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;


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


// 📮 1️⃣ SEPOMEX (AUTOCOMPLETE DIRECCIÓN)

app.post("/api/cp", async (req, res) => {
    try {
        const response = await axios.get(
            `https://sepomex.icalialabs.com/api/v1/zip_codes?zip_code=${req.body.cp}`
        );

        const lista = response.data.zip_codes;

        if (!lista || lista.length === 0) {
            return res.json({
                estado: "",
                municipio: "",
                colonias: [],
            });
        }

        res.json({
            estado: lista[0].d_estado,
            municipio: lista[0].d_mnpio,
            colonias: lista.map((item) => item.d_asenta),
        });

    } catch (error) {
        console.error("SEPOMEX error:", error.message);
        res.status(500).json({ error: "Error CP" });
    }
});


// 🚚 2️⃣ FEDEX (VALIDAR ENVÍO)

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

        console.log("FedEx:", JSON.stringify(response.data, null, 2));

        res.json(response.data);

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Error FedEx" });
    }
});

app.listen(PORT, () => console.log("Backend en puerto " + PORT));