import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import QuoteCard from "../components/QuoteCard";
import useUserProfile from "./useUserProfile";

type QuoteRecord = {
  id: string;
  author: string;
  likes: number;
  message: string;
};

function useDashboardQuotes() {
  const { saveQuote, reportQuote } = useUserProfile();
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim() ?? "";

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
          )),
        );
      } catch (error) {
        console.log(error);
      }
    },
    [addQuote, reportQuoteRequest],
  );

  const renderQuoteCards = useCallback(
    (quotes: QuoteRecord[]) => {
      setCards(
        quotes.map((quote) => (
          <QuoteCard
            key={`${quote.id}-${quote.message}`}
            content={quote.message}
            author={quote.author}
            onLike={addQuote}
            onSearchAuthor={getAuthorQuotes}
            onReportQuote={reportQuoteRequest}
          />
        )),
      );
    },
    [addQuote, getAuthorQuotes, reportQuoteRequest],
  );

  const loadDashboardQuotes = useCallback(
    async (query: string) => {
      try {
        const endpoint =
          query.length > 0
            ? `http://localhost:5000/searchQuotes?search=${encodeURIComponent(query)}`
            : "http://localhost:5000/quotes";
        const response = await axios.get(endpoint);
        renderQuoteCards(response.data as QuoteRecord[]);
      } catch (error) {
        setCards([<p style={{ color: "red" }}>Error fetching quotes</p>]);
      }
    },
    [renderQuoteCards],
  );

  useEffect(() => {
    document.title = "Home";
    void loadDashboardQuotes(searchTerm);
  }, [loadDashboardQuotes, searchTerm]);

  return { cards, getAuthorQuotes, searchTerm };
}

export default useDashboardQuotes;
