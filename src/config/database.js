import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("drivencracy");

export const pollCollection = db.collection("poll");
