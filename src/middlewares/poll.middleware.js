import dayjs from "dayjs";
import { pollSchema } from "../schemas/poll.schema.js";
import utc from "dayjs/plugin/utc.js";

export function pollSchemaValidation(req, res, next) {
  const { title, expireAt } = req.body;

  // if (expireAt == undefined || expireAt == null) {
  //  expireAt = dayjs().add(30, "d").format("YYYY-MM-DD");
  //  }
  dayjs.extend(utc);
  if (!expireAt)
    expireAt = dayjs.utc().local().add(30, "d").format("YYYY-MM-DD HH:mm");

  const poll = {
    title,
    expireAt,
  };

  const { error } = pollSchema.validate(poll, { abortEarly: false });

  if (error) {
    const errorMsg = error.details.map((e) => e.message);
    return res.status(422).send("invalid data  ", errorMsg);
  }

  res.locals.poll = poll;

  next();
}
