import app from "./app.js";
import http from "http";
import connectDB from "./database.js";

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);
    const PORT = process.env.PORT || 3001;
    
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
