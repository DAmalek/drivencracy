import dayjs from "dayjs";
import { pollSchema } from "../schemas/poll.schema.js";
import utc from "dayjs/plugin/utc.js";

export function pollSchemaValidation(req, res, next) {
  const { title, expireAt } = req.body;
  const dataAtual = new Date();
  const dataFormat = new Date(expireAt);
  if (expireAt == "") {
    const trintadias = new Date(dataAtual.setDate(dataAtual.getDate() + 30));
    expireAt = trintadias;
  }
  if (dataFormat < dataAtual) {
    return res.status(406).send("date not acceptable");
  }

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
