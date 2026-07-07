import { Box, Button, Card, Grid } from "@mui/material";
import "./App.css";
import useSavedQuotes from "./hooks/useSavedQuotes";

function Saved() {
  document.title = "Saved";
  const { cards, loading, authorFilter, clearAuthorFilter } = useSavedQuotes();
  return loading ? (
      <h1 className="middle">Loading...</h1>
  ) : (
    <Box>
      <Grid className="App-newBackground">
        <div>
          <br></br>
        </div>
        <Card
          className="App-newBackground"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {authorFilter !== "" && (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="outlined" onClick={clearAuthorFilter}>
                Clear author filter
              </Button>
            </Box>
          )}
          {cards}
        </Card>
      </Grid>
    </Box>
  );
}
export default Saved;
