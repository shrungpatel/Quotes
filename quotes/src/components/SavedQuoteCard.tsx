import { CardContent, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

type SavedQuoteCardProps = {
  content: string;
  author: string;
};

function SavedQuoteCard({ content, author }: SavedQuoteCardProps) {
  const displayContent =
    content.length < 150 ? content : `${content.substring(0, 150)}...`;

  return (
    <CardContent className="App-Card" key={`${content}-${author}`}>
      <h4>{displayContent}</h4>
      <p>{author}</p>
      <Checkbox
        className="App-like-icon"
        defaultChecked
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        sx={{
          color: pink[800],
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />
    </CardContent>
  );
}

export default SavedQuoteCard;
