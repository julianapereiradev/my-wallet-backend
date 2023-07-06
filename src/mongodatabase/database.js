
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
  db = mongoClient.db();
} catch (err) {
  (err) => console.log(err.message);
}

export default db;
