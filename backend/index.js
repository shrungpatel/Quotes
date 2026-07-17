const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.PROJECT_ID || serviceAccount.project_id
});
const db = admin.firestore();

function getFirebaseApiKey() {
    if (process.env.FIREBASE_API_KEY) {
        return process.env.FIREBASE_API_KEY;
    }

    if (process.env.VITE_FIREBASE_API_KEY) {
        return process.env.VITE_FIREBASE_API_KEY;
    }

    const envPath = path.join(__dirname, "../quotes/.env");
    if (!fs.existsSync(envPath)) {
        return "";
    }

    const envFile = fs.readFileSync(envPath, "utf8");
    const apiKeyLine = envFile
        .split(/\r?\n/)
        .find((line) => line.startsWith("VITE_FIREBASE_API_KEY="));

    return apiKeyLine?.split("=").slice(1).join("=").trim() ?? "";
}

function normalizeQuote(author, value) {
    return {
        id: typeof value.id === "string" ? value.id : "",
        author: author,
        likes: typeof value.likes === "number" ? value.likes : 0,
        message: typeof value.message === "string" ? value.message : "",
    };
}

function matchesSearchTerm(quote, searchTerm) {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
        return true;
    }

    return (
        quote.message.toLowerCase().includes(normalizedSearchTerm) ||
        quote.author.toLowerCase().includes(normalizedSearchTerm)
    );
}

app.post("/forgotPassword", async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";

    if (!email) {
        return res.status(400).json({
            error: "Email is required.",
        });
    }

    const firebaseApiKey = getFirebaseApiKey();

    if (!firebaseApiKey) {
        return res.status(500).json({
            error: "Firebase API key is not configured.",
        });
    }

    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email,
                }),
            },
        );

        const data = await response.json();

        if (!response.ok) {
            const message = data?.error?.message;

            if (message === "INVALID_EMAIL") {
                return res.status(400).json({
                    error: "Please enter a valid email address.",
                });
            }

            if (message !== "EMAIL_NOT_FOUND") {
                throw new Error(message || "Unable to send password reset email.");
            }
        }

        res.json({
            message: "If an account exists for that email, a password reset email has been sent.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to send password reset email.",
        });
    }
});

app.get("/quotes", async (req, res) => {
    try {
        const snapshot = await db.collection("Quotes").get();

        const allQuotesPool = [];

        snapshot.forEach((doc) => {
            const author = doc.id;
            const data = doc.data();

            Object.values(data).forEach((quote) => {
                if (
                    quote &&
                    typeof quote === "object" &&
                    quote.message
                ) {
                    allQuotesPool.push(normalizeQuote(author, quote));
                }
            });
        });

        if (allQuotesPool.length === 0) {
            return res.status(404).json({
                error: "No valid quotes found.",
            });
        }

        const selectedQuotes = Array.from({ length: 100 }, () =>
            allQuotesPool[Math.floor(Math.random() * allQuotesPool.length)]
        );

        res.json(selectedQuotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to fetch quotes.",
        });
    }
});

app.get("/authorQuotes", async (req, res) => {
    try {
        const author = req.query.author?.trim();

        if (!author) {
            return res.status(400).json({
                error: "Missing author.",
            });
        }

        const doc = await db.collection("Quotes").doc(author).get();

        if (!doc.exists) {
            return res.status(404).json({
                error: "Author not found.",
            });
        }

        const quotes = Object.values(doc.data())
            .filter((quote) => quote && typeof quote === "object")
            .map((quote) => normalizeQuote(author, quote));

        res.json(quotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to fetch author quotes.",
        });
    }
});

app.get("/searchQuotes", async (req, res) => {
    try {
        const searchTerm = (req.query.search ?? req.query.searchTerm ?? "").trim();
        if (!searchTerm) {
            return res.status(400).json({
                error: "Missing search term.",
            });
        }
        const snapshot = await db.collection("Quotes").get();
        const matchingQuotes = [];
        snapshot.forEach((doc) => {
            const author = doc.id;
            const data = doc.data();
            Object.values(data).forEach((quote) => {
                if (
                    quote &&
                    typeof quote === "object" &&
                    quote.message &&
                    matchesSearchTerm(normalizeQuote(author, quote), searchTerm)
                ) {
                    matchingQuotes.push(normalizeQuote(author, quote));
                }
            });
        });
        if (matchingQuotes.length === 0) {
            return res.status(404).json({
                error: "No matching quotes found.",
            });
        }
        res.json(matchingQuotes);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to search quotes.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
