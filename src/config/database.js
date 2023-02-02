import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
// LEMBRAR DE TROCAR PARA DATABASE_URL

const mongoClient = new MongoClient(process.env.MONGODB_LOCAL);

try {
  await mongoClient.connect();
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("drivencracy");

export const pollCollection = db.collection("poll");
export const choiceCollection = db.collection("choice");
