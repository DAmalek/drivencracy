import { pollCollection } from "../config/database.js";

export async function createPoll(req, res) {
  const poll = res.locals.poll;

  try {
    await pollCollection.insertOne(poll);

    res.send(poll).status(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
