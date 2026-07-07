import { CardContent, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { pink } from "@mui/material/colors";
import { Favorite, FavoriteBorder, ReportProblem, ReportProblemOutlined } from "@mui/icons-material";
import { useState } from "react";

type QuoteCardProps = {
  content: string;
  author: string;
  onLike: (content: string, author: string) => void;
  onSearchAuthor: (author: string) => void;
  onReportQuote: (content: string, author: string) => void;
  defaultLiked?: boolean;
};

const REPORT_REASONS = [
  "Offensive or hateful content",
  "Spam or misleading",
  "Incorrect attribution",
  "Mistake",
  "Other",
];

function QuoteCard({
  content,
  author,
  onLike,
  onSearchAuthor,
  onReportQuote,
  defaultLiked = false,
}: QuoteCardProps) {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  // when the database is ready, change it to show the full quote when the user clicks on it
  //const displayContent =
  //  content.length < 150 ? content : `${content.substring(0, 150)}...`;
  const displayContent = content;

  const handleReportClick = () => {
    setReportDialogOpen(true);
  };

  const handleReportCancel = () => {
    setReportDialogOpen(false);
    setReportReason("");
    setReportDetails("");
  };

  const handleReportConfirm = async () => {
    await onReportQuote(content, author);
    setReportDialogOpen(false);
    setReportReason("");
    setReportDetails("");
  };

  return (
    <CardContent className="App-Card">
      <h4>{displayContent}</h4>
      <p onClick={() => onSearchAuthor(author)} className="App-author">
        {author}
      </p>
      <Checkbox
        className="App-like-icon"
        defaultChecked={defaultLiked}
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
        onChange={handleReportClick}
        sx={{
          color: "red",
          "&.Mui-checked": {
            color: "red"
          }
        }}
      />
      
      <Dialog PaperProps={{ className: "App-Report-Dialog" }} open={reportDialogOpen} onClose={handleReportCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Report Quote</DialogTitle>
        <DialogContent>
          <p>"{content}"</p>
          <p>Author: {author}</p>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Reason for reporting</InputLabel>
            <Select
              value={reportReason}
              label="Reason for reporting"
              onChange={(e) => setReportReason(e.target.value)}
            >
              {REPORT_REASONS.map((reason) => (
                <MenuItem key={reason} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Additional details (optional)"
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            placeholder="Provide any additional information about why you're reporting this quote..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportCancel}>Cancel</Button>
          <Button onClick={handleReportConfirm} variant="contained" color="error">
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </CardContent>
  );
}

export default QuoteCard;
