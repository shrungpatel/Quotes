import { useEffect } from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import "./App.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

function Explore() {
  useEffect(() => {
    document.title = "Explore";
  }, []);

  return (
    <Box className="App-newBackground explore-page">
      <Stack spacing={2} className="explore-page-content">
        <Typography variant="h4" component="h1">
          Explore authors around the world
        </Typography>
        <Typography variant="body1">
          See where the authors in our collection are from.
        </Typography>
        <Card className="explore-map-card">
          <iframe
            className="explore-map"
            title="Authors by country map"
            src={`${backendUrl}/authors-map`}
          />
        </Card>
      </Stack>
    </Box>
  );
}

export default Explore;
