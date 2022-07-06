import { connect } from "mongoose";
import { MONGODB_URL } from "./config";

// Create a lambda function to use async/await
(async () => {
  try {
    // Connects with localhost mongodb, to the crud-mongo db. When the connection is finished continues running the code.
    const db = await connect(MONGODB_URL);
    console.log("DB connection established to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
