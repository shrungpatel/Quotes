const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.PROJECT_ID || serviceAccount.project_id
});
const db = admin.firestore();

function normalizeQuote(doc) {
    const data = doc.data() || {};

    return {
        id: doc.id,
        author: typeof data.author === "string" ? data.author : "",
        likes: typeof data.likes === "number" ? data.likes : 0,
        message: typeof data.message === "string" ? data.message : "",
    };
}

app.get("/quotes", async (req, res) => {
    try {
        const snapshot = await db.collection("Quotes").get();
        const allQuotesPool = snapshot.docs
            .map(normalizeQuote)
            .filter((quote) => quote.author.length > 0 && quote.message.length > 0);

        if (allQuotesPool.length === 0) {
            return res.status(404).json({ error: "No valid quotes found in Firestore." });
        }

        const TOTAL_QUOTES_NEEDED = 1000;
        const selectedQuotes = Array.from({ length: TOTAL_QUOTES_NEEDED }, () => {
            return allQuotesPool[Math.floor(Math.random() * allQuotesPool.length)];
        });

        res.json(selectedQuotes);
    } catch (error) {
        console.error("Error retrieving batch quotes:", error.message);
        res.status(500).json({ error: "Unable to fetch quotes batch" });
    }
});

app.get("/authorQuotes", async (req, res) => {
    try {
        const author = typeof req.query.author === "string" ? req.query.author.trim() : "";

        if (!author) {
            return res.status(400).json({ error: "Missing author query parameter." });
        }

        const snapshot = await db.collection("Quotes").where("author", "==", author).get();
        const quotes = snapshot.docs
            .map(normalizeQuote)
            .filter((quote) => quote.message.length > 0);

        res.json(quotes);
    } catch (error) {
        console.error("Error retrieving author quotes:", error.message);
        res.status(500).json({ error: "Unable to fetch author quotes" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
