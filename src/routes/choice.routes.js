import { Router } from "express";
import {
  createChoice,
  listChoices,
  makeVote,
} from "../controllers/choice.controller.js";
import {
  choiceDatabaseValidation,
  choiceSchemaValidation,
  voteValidation,
} from "../middlewares/choice.middleware.js";

const choiceRoutes = Router();

choiceRoutes.post(
  "/choice",
  choiceSchemaValidation,
  choiceDatabaseValidation,
  createChoice
);
choiceRoutes.get("/poll/:id/choice", listChoices);
choiceRoutes.post("/choice/:id/vote", voteValidation, makeVote);

export default choiceRoutes;
