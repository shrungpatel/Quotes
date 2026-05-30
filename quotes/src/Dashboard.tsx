import { Box, Card, Grid } from "@mui/material";
import "./App.css";
import useDashboardQuotes from "./hooks/useDashboardQuotes";

function Dashboard() {
  const { cards } = useDashboardQuotes();

  return (
    <Box>
      <title>Home</title>
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

export default Dashboard;
