import dayjs from "dayjs";
import { pollSchema } from "../schemas/poll.schema.js";
import utc from "dayjs/plugin/utc.js";

export function pollSchemaValidation(req, res, next) {
  const { title, expireAt } = req.body;
  const data = new Date();
  const dataAtual = new Date();
  //const data = new Date(data.setHours(data.getHours() - 3));
  const dataFormat = new Date(expireAt);
  const trintadias = new Date(dataAtual.setDate(dataAtual.getDate() + 30));
  let poll;

  if (dataFormat < data) {
    return res.status(406).send("date not acceptable");
  }
  //perguntar uma forma melhor de fazer essa condição
  if (expireAt === "") {
    poll = {
      title,
      expireAt: trintadias,
    };
  } else {
    poll = {
      title,
      expireAt,
    };
  }

  const { error } = pollSchema.validate(poll, { abortEarly: false });

  if (error) {
    const errorMsg = error.details.map((e) => e.message);
    return res.status(422).send(`invalid data ${errorMsg}`);
  }

  res.locals.poll = poll;

  next();
}
