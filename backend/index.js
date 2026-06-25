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
        id: typeof data.id === "string" ? data.id : doc.id,
        likes: typeof data.likes === "number" ? data.likes : 0,
        message: typeof data.message === "string" ? data.message : "",
    };
}

app.get("/quotes", async (req, res) => {
    try {
        const snapshot = await db.collection("Quotes").get();

        const allQuotesPool = snapshot.docs
            .map(normalizeQuote)
            .filter((quote) => quote.id.length > 0 && quote.message.length > 0);

        if (allQuotesPool.length === 0) {
            return res.status(404).json({
                error: "No valid quotes found in Firestore."
            });
        }

        const TOTAL_QUOTES_NEEDED = 1000;

        const selectedQuotes = Array.from(
            { length: TOTAL_QUOTES_NEEDED },
            () => allQuotesPool[Math.floor(Math.random() * allQuotesPool.length)]
        );

        res.json(selectedQuotes);
        console.log(res);
    } catch (error) {
        console.error("Error retrieving batch quotes:", error.message);
        res.status(500).json({
            error: "Unable to fetch quotes batch"
        });
    }
});

app.get("/authorQuotes", async (req, res) => {
    try {
        const author = typeof req.query.author === "string"
            ? req.query.author.trim()
            : "";

        if (!author) {
            return res.status(400).json({
                error: "Missing author query parameter."
            });
        }

        const doc = await db.collection("Quotes").doc(author).get();

        if (!doc.exists) {
            return res.status(404).json({
                error: "Author not found."
            });
        }

        const quote = normalizeQuote(doc);

        if (!quote.message) {
            return res.status(404).json({
                error: "No quote found for author."
            });
        }

        res.json(quote);
    } catch (error) {
        console.error("Error retrieving author quote:", error.message);
        res.status(500).json({
            error: "Unable to fetch author quote"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
