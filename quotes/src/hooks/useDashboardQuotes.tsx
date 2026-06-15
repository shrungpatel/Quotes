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

type AuthorQuote = {
  id: string;
  author: string;
  likes: number;
  message: string;
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
              key={quote.id}
              content={quote.message}
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
        const quotes = response.data as QuoteRecord[];

        setCards(
          quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              content={quote.message}
              author={quote.author}
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
