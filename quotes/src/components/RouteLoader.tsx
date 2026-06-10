import { Box, CircularProgress, Stack, Typography } from "@mui/material";

function RouteLoader() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D) center/cover no-repeat",
        //  "radial-gradient(circle at top, rgba(255,255,255,0.2), transparent 45%), linear-gradient(135deg, #141414 0%, #252525 100%)",
        color: "white",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress color="inherit" />
        <Typography variant="body1">Loading...</Typography>
      </Stack>
    </Box>
  );
}

export default RouteLoader;
