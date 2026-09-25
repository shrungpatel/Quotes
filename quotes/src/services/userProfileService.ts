import {
  doc,
  FieldPath,
  getDoc,
  increment,
  setDoc,
  updateDoc,
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

async function getQuoteField(
  author: string,
  content: string,
): Promise<{ ref: DocumentReference; field: string; id: string } | null> {
  const quoteRef = doc(db, "Quotes", author);
  const quoteDoc = await getDoc(quoteRef);

  if (!quoteDoc.exists()) {
    return null;
  }

  const matchingQuote = Object.entries(quoteDoc.data()).find(([, quote]) => {
    const quoteRecord = quote as QuoteRecord;
    return quoteRecord?.message === content && typeof quoteRecord.id === "string";
  });

  return matchingQuote == null
    ? null
    : {
        ref: quoteRef,
        field: matchingQuote[0],
        id: (matchingQuote[1] as QuoteRecord).id as string,
      };
}

async function getQuoteId(author: string, content: string): Promise<string | null> {
  const quote = await getQuoteField(author, content);

  if (quote == null) {
    return null;
  }

  return quote.id;
}

async function getUserProfileDocumentByUid(
  uid: string,
): Promise<UserProfileDocument | null> {
  const profileRef = doc(db, "Users", uid);
  const profileDoc = await getDoc(profileRef);

  if (!profileDoc.exists()) {
    return null;
  }

  const data = profileDoc.data() as Omit<UserProfileRecord, "quotesID"> & {
    quotesID?: Record<string, string>;
  };

  return {
    ref: profileDoc.ref,
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
  uid: string,
): Promise<UserProfileRecord | null> {
  const document = await getUserProfileDocumentByUid(uid);
  return document?.profile ?? null;
}

export async function saveQuoteForUser(
  uid: string,
  content: string,
  author: string,
): Promise<void> {
  const document = await getUserProfileDocumentByUid(uid);

  if (document == null) {
    return;
  }

  const nextQuotes = new Map(Object.entries(document.profile.quotesID));
  nextQuotes.set(content, author);

  await updateDoc(document.ref, {
    quotesID: Object.fromEntries(nextQuotes),
  });
}

export async function incrementQuoteLikes(
  author: string,
  content: string,
): Promise<void> {
  const quote = await getQuoteField(author, content);

  if (quote == null) {
    return;
  }

  await updateDoc(quote.ref, new FieldPath(quote.field, "likes"), increment(1));
}

export async function removeSavedQuoteForUser(
  uid: string,
  content: string,
): Promise<void> {
  const document = await getUserProfileDocumentByUid(uid);

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
  uid: string,
  content: string,
  author: string,
): Promise<void> {
  const document = await getUserProfileDocumentByUid(uid);

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
    const nextReportedBy = reportedBy.includes(uid)
      ? reportedBy
      : [...reportedBy, uid];

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
    reportedBy: [uid],
    reportCount: 1,
  });
}

export async function createUserProfile(
  uid: string,
  email: string,
  name: string,
): Promise<void> {
  await setDoc(doc(db, "Users", uid), {
    uid,
    email,
    name,
    quotesID: {},
    reportedQuotes: {},
  });
}
