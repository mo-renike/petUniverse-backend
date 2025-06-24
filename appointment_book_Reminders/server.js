import app from "./app.js";
import { db_connection } from "./config/db.db.js"; //Import your database

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await db_connection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}✅`);
    });
  } catch (error) {
    console.error("Error check starting server:", error);
    process.exit(1);
  }
};

startServer();
