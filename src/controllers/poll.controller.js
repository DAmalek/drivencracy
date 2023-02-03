import { ObjectId } from "mongodb";
import {
  choiceCollection,
  pollCollection,
  voteCollection,
} from "../config/database.js";

export async function createPoll(req, res) {
  const poll = res.locals.poll;

  try {
    await pollCollection.insertOne(poll);

    return res.status(201).send(poll);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function listPoll(req, res) {
  try {
    const polls = await pollCollection.find({}).toArray();

    return res.status(200).send(polls);
  } catch (error) {
    console.log("pego no catch:  ", error);
    return res.sendStatus(500);
  }
}

export async function listResult(req, res) {
  const pollIdParams = req.params.id;

  try {
    const pollExists = await pollCollection.findOne({
      _id: ObjectId(pollIdParams),
    });

    if (!pollExists) return res.status(404).send("poll not found");

    const choiceExists = await choiceCollection
      .find({
        pollId: pollIdParams,
      })
      .toArray();

    if (!choiceExists) return res.status(404).send("choices not found");

    const votes = await Promise.all(
      choiceExists.map(async (i) => {
        console.log(ObjectId(i._id).toString(), "  ", choiceExists);

        return await voteCollection
          .find({ choiceId: ObjectId(i._id).toString() })
          .toArray();
      })
    );

    const result = {
      _id: pollExists._id,
      title: pollExists.title,
      expireAt: pollExists.expireAt,
      result: {
        title: choiceExists.title,
        votes: 487,
      },
    };
    return res.status(200).send(votes);
  } catch (error) {
    console.log("pego no catch:  ", error);
    return res.sendStatus(500);
  }
}
