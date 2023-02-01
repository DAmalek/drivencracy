import { pollCollection } from "../config/database.js";

export async function createPoll(req, res) {
  const poll = res.locals.poll;

  try {
    await pollCollection.insertOne(poll);

    res.status(201).send(poll);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function listPoll(req, res) {
  try {
    const polls = await pollCollection.find({}).toArray();

    res.status(201).send(polls);
  } catch (error) {
    console.log("pego no catch:  ", error);
    res.sendStatus(500);
  }
}
