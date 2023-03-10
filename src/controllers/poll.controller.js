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
        return await voteCollection
          .find({ choiceId: ObjectId(i._id).toString() })
          .toArray();
      })
    );
    let aux = {
      choiceId: "",
      votes: 0,
    };
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].length > aux.votes) {
        aux.choiceId = votes[i][0].choiceId;
        aux.votes = votes[i].length;
      }
    }
    const choiceTitle = await choiceCollection.findOne({
      _id: ObjectId(aux.choiceId),
    });
    console.log(aux);

    const result = {
      _id: pollExists._id,
      title: pollExists.title,
      expireAt: pollExists.expireAt,
      result: {
        title: choiceTitle.title,
        votes: aux.votes,
      },
    };
    return res.status(200).send(result);
  } catch (error) {
    console.log("pego no catch:  ", error);
    return res.sendStatus(500);
  }
}
