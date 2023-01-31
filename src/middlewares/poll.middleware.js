import dayjs from "dayjs";
import { pollSchema } from "../schemas/poll.schema.js";

export function pollSchemaValidation(req, res, next) {
  const { title, expireAt } = req.body;

  if (expireAt == undefined) {
    expireAt = dayjs().add(30, "d").format("YYYY-MM-DD");
  }

  const poll = {
    title,
    expireAt,
  };

  const { error } = pollSchema.validate(poll, { abortEarly: false });

  if (error) {
    const errorMsg = error.deta.map((e) => e.message);
    return res.status(422).send("invalid data  ", errorMsg);
  }

  res.locals.poll = poll;

  next();
}
