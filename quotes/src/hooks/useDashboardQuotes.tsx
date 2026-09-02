import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import QuoteCard from "../components/QuoteCard";
import useAuthUser from "./useAuthUser";
import useUserProfile from "./useUserProfile";
import { incrementQuoteLikes } from "../services/userProfileService";

type QuoteRecord = {
  id: string;
  author: string;
  likes: number;
  message: string;
};

// Module-level caches survive Dashboard being unmounted when the user visits
// another route, but are cleared when the page is refreshed.
const dashboardQuotesCache = new Map<string, QuoteRecord[]>();
const dashboardQuotesRequests = new Map<string, Promise<QuoteRecord[]>>();
const authorQuotesCache = new Map<string, QuoteRecord[]>();
const authorQuotesRequests = new Map<string, Promise<QuoteRecord[]>>();

function getDashboardQuotes(query: string, forceRefresh = false) {
  if (!forceRefresh) {
    const cachedQuotes = dashboardQuotesCache.get(query);
    if (cachedQuotes) {
      return Promise.resolve(cachedQuotes);
    }
  }

  const existingRequest = dashboardQuotesRequests.get(query);
  if (existingRequest) {
    return existingRequest;
  }

  const endpoint =
    query.length > 0
      ? `http://localhost:5000/searchQuotes?search=${encodeURIComponent(query)}`
      : "http://localhost:5000/quotes";
  const request = axios.get(endpoint).then((response) => {
    const quotes = response.data as QuoteRecord[];
    dashboardQuotesCache.set(query, quotes);
    dashboardQuotesRequests.delete(query);
    return quotes;
  }).catch((error) => {
    dashboardQuotesRequests.delete(query);
    throw error;
  });

  dashboardQuotesRequests.set(query, request);
  return request;
}

function useDashboardQuotes() {
  const { user, loading: authLoading } = useAuthUser();
  const { profile, loading: profileLoading, saveQuote, reportQuote } = useUserProfile();
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim() ?? "";

  const filterUserQuotes = useCallback(
    (quotes: QuoteRecord[]) => {
      const userProfile = profile;

      if (authLoading) {
        return [];
      }

      if (user == null) {
        return quotes;
      }

      if (profileLoading || userProfile == null) {
        return [];
      }

      return quotes.filter(
        (quote) =>
          !(quote.message in userProfile.quotesID) &&
          !(quote.message in userProfile.reportedQuotes),
      );
    },
    [authLoading, profile, profileLoading, user],
  );

  const addQuote = useCallback(
    async (content: string, author: string) => {
      await saveQuote(content, author);
      await incrementQuoteLikes(author, content);
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
        let quotes = authorQuotesCache.get(author);
        if (!quotes) {
          let request = authorQuotesRequests.get(author);
          if (!request) {
            request = axios
              .get(
                `http://localhost:5000/authorQuotes?author=${encodeURIComponent(author)}`,
              )
              .then((response) => response.data as QuoteRecord[])
              .catch((error) => {
                authorQuotesRequests.delete(author);
                throw error;
              });
            authorQuotesRequests.set(author, request);
          }
          quotes = await request;
          authorQuotesCache.set(author, quotes);
          authorQuotesRequests.delete(author);
        }

        setCards(
          filterUserQuotes(quotes).map((quote) => (
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
    [addQuote, filterUserQuotes, reportQuoteRequest],
  );

  const renderQuoteCards = useCallback(
    (quotes: QuoteRecord[]) => {
      setCards(
        filterUserQuotes(quotes).map((quote) => (
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
    [addQuote, filterUserQuotes, getAuthorQuotes, reportQuoteRequest],
  );

  const loadDashboardQuotes = useCallback(
    async (query: string, append = false) => {
      try {
        const quotes = await getDashboardQuotes(query, append);
        if (append) {
          setCards((currentCards) => [
            ...currentCards,
            ...filterUserQuotes(quotes).map((quote, index) => (
              <QuoteCard
                key={`${quote.id}-${quote.message}-${currentCards.length + index}`}
                content={quote.message}
                author={quote.author}
                onLike={addQuote}
                onSearchAuthor={getAuthorQuotes}
                onReportQuote={reportQuoteRequest}
              />
            )),
          ]);
        } else {
          renderQuoteCards(quotes);
        }
      } catch {
        if (!append) {
          setCards([<p style={{ color: "red" }}>Error fetching quotes</p>]);
        }
      }
    },
    [addQuote, filterUserQuotes, getAuthorQuotes, renderQuoteCards, reportQuoteRequest],
  );

  const loadingMoreQuotes = useRef(false);

  const loadMoreQuotes = useCallback(() => {
    if (searchTerm || loadingMoreQuotes.current) {
      return;
    }

    const documentHeight = document.documentElement.scrollHeight;
    const scrollableHeight = documentHeight - window.innerHeight;
    const scrollPercentage =
      scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

    if (scrollPercentage < 0.85) {
      return;
    }

    loadingMoreQuotes.current = true;
    void loadDashboardQuotes(searchTerm, true).finally(() => {
      loadingMoreQuotes.current = false;
    });
  }, [loadDashboardQuotes, searchTerm]);

  useEffect(() => {
    document.title = "Home";

    const loadTimeout = window.setTimeout(() => {
      void loadDashboardQuotes(searchTerm);
    }, 0);

    return () => {
      window.clearTimeout(loadTimeout);
    };
  }, [loadDashboardQuotes, searchTerm]);

  useEffect(() => {
    window.addEventListener("scroll", loadMoreQuotes, { passive: true });

    return () => {
      window.removeEventListener("scroll", loadMoreQuotes);
    };
  }, [loadMoreQuotes]);

  return { cards, getAuthorQuotes, searchTerm };
}

export default useDashboardQuotes;
