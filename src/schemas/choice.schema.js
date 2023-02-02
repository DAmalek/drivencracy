import joi from "joi";

export const choiceSchema = joi.object({
  title: joi.string().min(2).required(),
  pollId: joi.string().required(),
});
