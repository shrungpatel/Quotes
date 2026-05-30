import { Box, CircularProgress, Stack, Typography } from "@mui/material";

function RouteLoader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.2), transparent 45%), linear-gradient(135deg, #141414 0%, #252525 100%)",
        color: "white",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress color="inherit" />
        <Typography variant="body1">Loading route...</Typography>
      </Stack>
    </Box>
  );
}

export default RouteLoader;
