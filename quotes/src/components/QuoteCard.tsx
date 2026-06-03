import { CardContent, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

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
        icon={<FavoriteBorderOutlinedIcon />}
        checkedIcon={<FavoriteIcon />}
        sx={{
          color: pink[800],
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />
      <Checkbox
        className="App-like-icon"
        inputProps={{ "aria-label": "Report quote" }}
        icon = {<ReportProblemOutlinedIcon />}
        checkedIcon = {<ReportProblemIcon />}
        sx={{ color: "red" }}
        onChange={() => onSearchAuthor(author)}
      />
    </CardContent>
  );
}

export default QuoteCard;
