// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/quotes', async (req, res) => {
    try {
        const response = await axios.get('https://zenquotes.io/api/quotes');
        res.json(response.data);
        console.log("Fetched quotes successfully");
    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        res.status(500).send('Unable to fetch quotes');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});