import app from "./app.js";
import { connectToDatabase } from "./config/database.js";

const PORT = process.env.PORT ?? 3000;

// Initialize database connection
const initializeApp = async () => {
  try {
    await connectToDatabase();
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
};

// For serverless environments (Vercel), export the app directly
export default app;

// For local development, start the server
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    await initializeApp();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  };

  startServer();
} else {
  // Initialize database connection for serverless
  initializeApp();
}
