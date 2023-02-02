import joi from "joi";

export const pollSchema = joi.object({
  title: joi.string().min(2).required(),
  expireAt: joi.string(),
});
//joi.date().greater(now)
