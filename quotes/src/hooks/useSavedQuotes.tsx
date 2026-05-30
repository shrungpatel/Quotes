import { useMemo } from "react";
import SavedQuoteCard from "../components/SavedQuoteCard";
import useUserProfile from "./useUserProfile";

function useSavedQuotes() {
  const { profile, loading: profileLoading } = useUserProfile();
  const cards = useMemo(() => {
    if (profileLoading) {
      return [];
    }

    return Object.entries(profile?.quotesID ?? {}).map(
      ([content, author]) => (
        <SavedQuoteCard
          key={`${content}-${author}`}
          content={content}
          author={author}
        />
      ),
    );
  }, [profile, profileLoading]);

  return { cards, loading: profileLoading };
}

export default useSavedQuotes;
