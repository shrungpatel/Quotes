import { CardContent, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
import { Favorite, FavoriteBorder, ReportProblem, ReportProblemOutlined } from "@mui/icons-material";

type QuoteCardProps = {
  content: string;
  author: string;
  onLike: (content: string, author: string) => void;
  onSearchAuthor: (author: string) => void;
};

function QuoteCard({ content, author, onLike, onSearchAuthor }: QuoteCardProps) {
  // when the database is ready, change it to show the full quote when the user clicks on it
  //const displayContent =
  //  content.length < 150 ? content : `${content.substring(0, 150)}...`;
  const displayContent = content;
  const report = (content: string, author: string) => {
    console.log(`Reported quote: "${content}" by ${author}`);
  }

  return (
    <CardContent className="App-Card">
      <h4>{displayContent}</h4>
      <p onClick={() => onSearchAuthor(author)} className="App-author">
        {author}
      </p>
       <Checkbox
        className="App-like-icon"
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
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
        icon={<ReportProblemOutlined />}
        checkedIcon={<ReportProblem />}        
        sx={{ color: "red" }}
        onChange={() => report(content, author)}
        sx={{
          color: "red"
        }}
      />
    </CardContent>
  );
}

export default QuoteCard;
