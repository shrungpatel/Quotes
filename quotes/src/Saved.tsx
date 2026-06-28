import { Box, Card, Grid } from "@mui/material";
import "./App.css";
import useSavedQuotes from "./hooks/useSavedQuotes";

function Saved() {
  const { cards, loading } = useSavedQuotes();

  return loading ? (
      <h1 className="middle">Loading...</h1>
  ) : (
    <Box>
      <title>Saved</title>
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
          {cards}
        </Card>
      </Grid>
    </Box>
  );
}
export default Saved;
