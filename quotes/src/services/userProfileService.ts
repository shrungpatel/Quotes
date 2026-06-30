import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  type DocumentReference,
} from "firebase/firestore";
import { db } from "../Firebase";

export type UserProfileRecord = {
  uid: string;
  email: string;
  name?: string;
  quotesID: Record<string, string>;
  reportedQuotes: Record<string, string>;
};

type UserProfileDocument = {
  ref: DocumentReference;
  profile: UserProfileRecord;
};

async function getUserProfileDocumentByEmail(
  email: string,
): Promise<UserProfileDocument | null> {
  const q = query(collection(db, "Users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];

  if (doc == null) {
    return null;
  }

  const data = doc.data() as Omit<UserProfileRecord, "quotesID"> & {
    quotesID?: Record<string, string>;
  };

  return {
    ref: doc.ref,
    profile: {
      uid: data.uid,
      email: data.email,
      name: data.name,
      quotesID: data.quotesID ?? {},
      reportedQuotes: data.reportedQuotes ?? {}
    },
  };
}

export async function getUserProfileByEmail(
  email: string,
): Promise<UserProfileRecord | null> {
  const document = await getUserProfileDocumentByEmail(email);
  return document?.profile ?? null;
}

export async function saveQuoteForUser(
  email: string,
  content: string,
  author: string,
): Promise<void> {
  const document = await getUserProfileDocumentByEmail(email);

  if (document == null) {
    return;
  }

  const nextQuotes = new Map(Object.entries(document.profile.quotesID));
  nextQuotes.set(content, author);

  await updateDoc(document.ref, {
    quotesID: Object.fromEntries(nextQuotes),
  });
}

export async function reportQuoteForUser(
  email: string,
  content: string,
  author: string,
): Promise<void> {
  const document = await getUserProfileDocumentByEmail(email);

  if (document == null) {
    return;
  }

  const quotesReported = new Map(Object.entries(document.profile.reportedQuotes));
  quotesReported.set(content, author);

  await updateDoc(document.ref, {
    reportedQuotes: Object.fromEntries(quotesReported),
  });
}

export async function createUserProfile(
  uid: string,
  email: string,
  name: string,
): Promise<void> {
  await setDoc(doc(db, "Users", email), {
    uid,
    email,
    name,
    quotesID: {},
  });
}
