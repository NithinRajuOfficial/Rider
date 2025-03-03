import app from "./app.js";
import http from "http";
import connectDB from "./database.js";

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    const PORT = process.env.PORT;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle server shutdown gracefully
    process.on("SIGINT", () => {
      console.log("Shutting down server gracefully...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });

    // Handle errors like EADDRINUSE
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Trying a different port...`
        );
        setTimeout(() => {
          server.close();
          server.listen(PORT + 1);
        }, 1000);
      } else {
        console.error("Server error:", error);
      }
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
