import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import axios from 'axios';
import https from 'https';

dotenv.config()
const app = express();
app.use(express.json());

const globalAgent = new https.Agent({ keepAlive: true, keepAliveMsecs: 15000 });
axios.defaults.httpsAgent = globalAgent;

const corsOptions = {
    origin: ['http://localhost:5173', 'https://aconews-8ea9b.web.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};


app.use(cors(corsOptions));

const PORT = process.env.PORT;
const searchUrl = process.env.API_URL_SEARCH;
const topUrl = process.env.API_URL_TOP;
const api_key = process.env.API_KEY;

app.post("/api/acoserver/search", async (req, res) => {
    const { query, country, language } = req.body;
    const url = `${searchUrl}?q=${query}&max=${30}&lang=${language}&country=${country}&apikey=${api_key}`;
    try {
        console.log("Received search request. Fetching news");
        const response = await axios.get(url, {
            timeout: 15000
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get news" });
    }
})

app.post("/api/acoserver/topheadlines", async (req, res) => {
    const { country, language, category } = req.body;
    const url = `${topUrl}?category=${category}&max=${30}&lang=${language}&country=${country}&apikey=${api_key}`;
    try {
        console.log("Received top headline request. Fetching news");
        const response = await axios.get(url, {
            timeout: 15000
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get news" });
    }
})

app.options('*', cors(corsOptions));

app.listen(PORT, () => {
    console.log("Listening at port ", PORT);
})