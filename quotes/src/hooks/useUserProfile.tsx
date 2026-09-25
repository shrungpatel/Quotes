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
  const { user, loading: authLoading } = useAuthUser();
  const [profile, setProfile] = useState<UserProfileRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      if (authLoading) {
        return;
      }

      setLoading(true);

      if (user == null) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        setProfile(await getUserProfileByEmail(user.uid));
      } catch (error) {
        console.log("Error loading user profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading, user]);

  const saveQuote = useCallback(
    async (content: string, author: string) => {
      if (user == null) {
        return;
      }

      await saveQuoteForUser(user.uid, content, author);
    },
    [user],
  );

  const unlikeQuote = useCallback(
    async (content: string) => {
      if (user == null) {
        return;
      }

      await removeSavedQuoteForUser(user.uid, content);
    },
    [user],
  );

  const reportQuote = useCallback(
    async (content: string, author: string) => {
      if (user == null) {
        return;
      }

      await reportQuoteForUser(user.uid, content, author);
    },
    [user],
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
