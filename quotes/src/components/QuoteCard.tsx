import { CardContent, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";

type QuoteCardProps = {
  content: string;
  author: string;
  onLike: (content: string, author: string) => void;
  onSearchAuthor: (author: string) => void;
};

function QuoteCard({ content, author, onLike, onSearchAuthor }: QuoteCardProps) {
  const displayContent =
    content.length < 150 ? content : `${content.substring(0, 150)}...`;

  return (
    <CardContent className="App-Card">
      <h4>{displayContent}</h4>
      <p>{author}</p>
      <Checkbox
        className="App-like-icon"
        inputProps={{ "aria-label": "Save quote" }}
        onChange={() => onLike(content, author)}
        sx={{
          color: pink[800],
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />
      <Checkbox
        className="App-like-icon"
        inputProps={{ "aria-label": "Search by author" }}
        sx={{ color: "black" }}
        onChange={() => onSearchAuthor(author)}
      />
    </CardContent>
  );
}

export default QuoteCard;
