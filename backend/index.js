const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/quotes', async (req, res) => {
    try {
        // call the api 5 times to get more quotes
        const responses = [];
        const NUMBER_OF_CALLS = 1;
        for (let i = 0; i < NUMBER_OF_CALLS; i++) {
            const response = await axios.get('https://zenquotes.io/api/quotes');
            responses.push(response.data);
        }
        res.json(responses[0]); // Send the first response for now
        //const combinedQuotes = [...responses[0], ...responses[1], ...responses[2], ...responses[3], ...responses[4]];
        //res.json(combinedQuotes);
        console.log("Fetched quotes successfully");
    } catch (error) {
        console.error("Error fetching quotes:", error.message);
        res.status(500).send('Unable to fetch quotes');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});