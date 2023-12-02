import app from "./src/app.js";
const PORT = process.env.APP_PORT || 8081;

app.listen(PORT, () => {
  console.log(`Serve is up 🚀 at http://localhost:${PORT}`);
});
