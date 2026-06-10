import { Card, Grid } from "@mui/material";
import "./App.css";
import useSavedQuotes from "./hooks/useSavedQuotes";

function Saved() {
  const { cards, loading } = useSavedQuotes();

  return loading ? (
      <h1 className="middle">Loading...</h1>
  ) : (
    <Grid>
      <Card
        className="App-newBackground"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          height: "100vh" /* takes up the entire screen */,
        }}
      >
        {cards}
      </Card>
    </Grid>
  );
}
export default Saved;
