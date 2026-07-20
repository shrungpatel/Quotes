import {
  collection,
  doc,
  getDoc,
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

type ReportedQuoteRecord = {
  id?: string;
  content: string;
  author: string;
  reportedBy: string[];
  reportCount: number;
};

type QuoteRecord = {
  id?: string;
  message?: string;
};

async function getQuoteId(author: string, content: string): Promise<string | null> {
  const quoteDoc = await getDoc(doc(db, "Quotes", author));

  if (!quoteDoc.exists()) {
    return null;
  }

  const quotes = Object.values(quoteDoc.data()) as QuoteRecord[];
  const matchingQuote = quotes.find(
    (quote) => quote?.message === content && typeof quote.id === "string",
  );

  return matchingQuote?.id ?? null;
}

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

export async function removeSavedQuoteForUser(
  email: string,
  content: string,
): Promise<void> {
  const document = await getUserProfileDocumentByEmail(email);

  if (document == null) {
    return;
  }

  const nextQuotes = new Map(Object.entries(document.profile.quotesID));
  nextQuotes.delete(content);

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

  const reportDocId = `${author}::${encodeURIComponent(content)}`;
  const reportDocRef = doc(db, "Reported", reportDocId);
  const [quoteId, reportDoc] = await Promise.all([
    getQuoteId(author, content),
    getDoc(reportDocRef),
  ]);

  if (reportDoc.exists()) {
    const existingReport = reportDoc.data() as ReportedQuoteRecord;
    const reportedBy = existingReport.reportedBy ?? [];
    const nextReportedBy = reportedBy.includes(email)
      ? reportedBy
      : [...reportedBy, email];

    await updateDoc(reportDocRef, {
      ...(quoteId == null ? {} : { id: quoteId }),
      reportedBy: nextReportedBy,
      reportCount: nextReportedBy.length,
    });
    return;
  }

  await setDoc(reportDocRef, {
    ...(quoteId == null ? {} : { id: quoteId }),
    content,
    author,
    reportedBy: [email],
    reportCount: 1,
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
    reportedQuotes: {},
  });
}
