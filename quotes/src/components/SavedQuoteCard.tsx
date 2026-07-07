import QuoteCard from "./QuoteCard";

type SavedQuoteCardProps = {
  content: string;
  author: string;
  onLike: (content: string, author: string) => void;
  onSearchAuthor: (author: string) => void;
  onReportQuote: (content: string, author: string) => void;
};

function SavedQuoteCard({
  content,
  author,
  onLike,
  onSearchAuthor,
  onReportQuote,
}: SavedQuoteCardProps) {
  return (
    <QuoteCard
      content={content}
      author={author}
      onLike={onLike}
      onSearchAuthor={onSearchAuthor}
      onReportQuote={onReportQuote}
      defaultLiked
    />
  );
}

export default SavedQuoteCard;
