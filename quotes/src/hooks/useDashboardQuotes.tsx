import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import QuoteCard from "../components/QuoteCard";
import useUserProfile from "./useUserProfile";

type QuoteRecord = {
  id: string;
  author: string;
  likes: number;
  message: string;
};

type AuthorQuote = QuoteRecord;

function useDashboardQuotes() {
  const { saveQuote, reportQuote } = useUserProfile();
  const [cards, setCards] = useState<JSX.Element[]>([]);

  const addQuote = useCallback(
    async (content: string, author: string) => {
      await saveQuote(content, author);
    },
    [saveQuote],
  );

  const reportQuoteRequest = useCallback(
    async (content: string, author: string) => {
      await reportQuote(content, author);
    },
    [reportQuote],
  );

  const getAuthorQuotes = useCallback(
    async (author: string) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/authorQuotes?author=${encodeURIComponent(author)}`,
        );

        const quotes = response.data as QuoteRecord[];
        
        setCards(
          quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              content={quote.message}
              author={author}
              onLike={addQuote}
              onSearchAuthor={getAuthorQuotes}
              onReportQuote={reportQuoteRequest}
            />
          ))
        );
      } catch (error) {
        console.log(error);
      }
    },
    [addQuote],
  );

  useEffect(() => {
    document.title = "Home";

    void (async () => {
      try {
        const response = await axios.get("http://localhost:5000/quotes");
        const quotes = response.data as QuoteRecord[];

        setCards(
          quotes.map((quote) => (
            <QuoteCard
              key={`${quote.id}-${Math.random()}`}
              content={quote.message}
              author={quote.author}
              onLike={addQuote}
              onSearchAuthor={getAuthorQuotes}
              onReportQuote={reportQuoteRequest}
            />
          )),
        );
      } catch (error) {
        console.log("Error fetching quotes from frontend:", error);
      }
    })();
  }, [addQuote, getAuthorQuotes]);

  return { cards, getAuthorQuotes };
}

export default useDashboardQuotes;