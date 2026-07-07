import { useCallback, useEffect, useState } from "react";
import useAuthUser from "./useAuthUser";
import {
  getUserProfileByEmail,
  removeSavedQuoteForUser,
  reportQuoteForUser,
  saveQuoteForUser,
  type UserProfileRecord,
} from "../services/userProfileService";

function useUserProfile() {
  const { email, loading: authLoading } = useAuthUser();
  const [profile, setProfile] = useState<UserProfileRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      if (authLoading) {
        return;
      }

      setLoading(true);

      if (email == null) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setProfile(await getUserProfileByEmail(email));
      } catch (error) {
        console.log("Error loading user profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, email]);

  const saveQuote = useCallback(
    async (content: string, author: string) => {
      if (email == null) {
        return;
      }

      await saveQuoteForUser(email, content, author);
    },
    [email],
  );

  const unlikeQuote = useCallback(
    async (content: string) => {
      if (email == null) {
        return;
      }

      await removeSavedQuoteForUser(email, content);
    },
    [email],
  );

  const reportQuote = useCallback(
    async (content: string, author: string) => {
      if (email == null) {
        return;
      }

      await reportQuoteForUser(email, content, author);
    },
    [email],
  );

  return {
    profile,
    loading,
    saveQuote,
    unlikeQuote,
    reportQuote
  };
}

export default useUserProfile;
