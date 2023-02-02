import { choiceCollection, pollCollection } from "../config/database.js";
import { choiceSchema } from "../schemas/choice.schema.js";
import { ObjectId } from "mongodb";

export function choiceSchemaValidation(req, res, next) {
  const { title, pollId } = req.body;

  const choice = {
    title,
    pollId,
  };

  const { error } = choiceSchema.validate(choice, { abortEarly: false });

  if (error) {
    const errorMsg = error.details.map((e) => e.message);
    return res.status(422).send("invalid data  ", errorMsg);
  }

  res.locals.choice = choice;

  next();
}

export async function choiceDatabaseValidation(req, res, next) {
  const choice = res.locals.choice;

  try {
    const pollExists = await pollCollection.findOne({
      _id: ObjectId(choice.pollId),
    });

    if (!pollExists) return res.status(404).send("poll not found");

    const choiceExists = await choiceCollection.findOne({
      title: choice.title,
    });

    if (choiceExists) {
      return res.status(409).send("choice already exists");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve um problema no servidor");
  }
}
