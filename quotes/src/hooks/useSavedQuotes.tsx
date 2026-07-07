import { useCallback, useMemo, useState } from "react";
import SavedQuoteCard from "../components/SavedQuoteCard";
import useUserProfile from "./useUserProfile";

function useSavedQuotes() {
  const { profile, loading: profileLoading, unlikeQuote, reportQuote } = useUserProfile();
  const [authorFilter, setAuthorFilter] = useState("");

  const handleSearchAuthor = useCallback((author: string) => {
    setAuthorFilter((currentAuthor) => (currentAuthor === author ? "" : author));
  }, []);

  const clearAuthorFilter = useCallback(() => {
    setAuthorFilter("");
  }, []);

  const cards = useMemo(() => {
    if (profileLoading) {
      return <SavedQuoteCard
        key="1"
        content="You need to be signed in to save quotes"
        author="_"
        onLike={() => {}}
        onSearchAuthor={() => {}}
        onReportQuote={() => {}}
      />
    }

    return Object.entries(profile?.quotesID ?? {})
      .filter(([, author]) => {
        if (authorFilter === "") {
          return true;
        }

        return author.toLowerCase().includes(authorFilter.toLowerCase());
      })
      .map(([content, author]) => (
        <SavedQuoteCard
          onLike={(quoteContent) => {
            void unlikeQuote(quoteContent);
          }}
          onSearchAuthor={handleSearchAuthor}
          onReportQuote={reportQuote}
          key={`${content}-${author}`}
          content={content}
          author={author}
        />
      ));
  }, [authorFilter, handleSearchAuthor, profile, profileLoading, reportQuote, unlikeQuote]);

  return { cards, loading: profileLoading, authorFilter, clearAuthorFilter };
}

export default useSavedQuotes;
