const configuredBackendUrl =
  import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_BACKEND_URL;

export const backendUrl = (
  configuredBackendUrl || "http://localhost:5000"
).replace(/\/+$/, "");
// localhost is for local dev so keeping it here for now