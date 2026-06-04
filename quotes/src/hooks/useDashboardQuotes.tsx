import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import QuoteCard from "../components/QuoteCard";
import { buildQuoteKey } from "../utils/quoteKey";
import useUserProfile from "./useUserProfile";

type HomeQuote = {
  q: string;
  a: string;
};

type AuthorQuote = {
  content: string;
  author: string;
  _id: string;
};

function useDashboardQuotes() {
  const { saveQuote } = useUserProfile();
  const [cards, setCards] = useState<JSX.Element[]>([]);

  const addQuote = useCallback(
    async (content: string, author: string) => {
      await saveQuote(content, author);
    },
    [saveQuote],
  );

  const getAuthorQuotes = useCallback(
    async (author: string) => {
      const url = "http://localhost:5000/authorQuotes?author=" + author;
      try {
        const response = await axios.get(url);
        const quotes = response.data as AuthorQuote[];

        setCards(
          quotes.map((quote) => (
            <QuoteCard
              key={quote._id}
              content={quote.content}
              author={quote.author}
              onLike={addQuote}
              onSearchAuthor={getAuthorQuotes}
            />
          )),
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
        const quotes = response.data as HomeQuote[];

        setCards(
          quotes.map((quote) => (
            <QuoteCard
              //key={buildQuoteKey(quote.q, quote.a)}
              content={quote.q}
              author={quote.a}
              onLike={addQuote}
              onSearchAuthor={getAuthorQuotes}
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
