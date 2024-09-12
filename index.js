import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import axios from 'axios';

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const searchUrl = process.env.API_URL_SEARCH;
const topUrl = process.env.API_URL_TOP;
const api_key = process.env.API_KEY;

app.post("/api/acoserver/search", async (req, res) => {
    const { query, country, language } = req.body;
    const url = `${searchUrl}?q=${query}&max=${30}&lang=${language}&country=${country}&apikey=${api_key}`;
    try {
        const response = await axios.get(url);
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
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get news" });
    }
})


app.listen(PORT, () => {
    console.log("Listening at port ", PORT);
})