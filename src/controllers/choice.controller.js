import { choiceCollection } from "../config/database.js";

export async function createChoice(req, res) {
  const choice = res.locals.choice;

  try {
    await choiceCollection.insertOne(choice);

    return res.status(201).send(choice);
  } catch (error) {
    console.log("pego no catch:  ", error);
    return res.sendStatus(500);
  }
}
export async function listChoices(req, res) {
  const pollId = req.params.id;

  try {
    const choices = await choiceCollection.find({ pollId: pollId }).toArray();

    if (!choices)
      return res.status(404).send("error404: poll or choices not found");

    return res.status(201).send(choices);
  } catch (error) {
    console.log("pego no catch:  ", error);
    return res.sendStatus(500);
  }
}
