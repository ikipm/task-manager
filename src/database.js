import { connect } from "mongoose";

// Connects with localhost mongodb, to the crud-mongo db. When the connection is finished continues running the code.
const db = await connect("mongodb://localhost/crud-mongo");
console.log("DB connection established to", db.connection.name);
