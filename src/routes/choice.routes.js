import { Router } from "express";
import { createChoice, listChoices } from "../controllers/choice.controller.js";
import {
  choiceDatabaseValidation,
  choiceSchemaValidation,
} from "../middlewares/choice.middleware.js";
import { choiceSchema } from "../schemas/choice.schema.js";

const choiceRoutes = Router();

choiceRoutes.post(
  "/choice",
  choiceSchemaValidation,
  choiceDatabaseValidation,
  createChoice
);
choiceRoutes.get("/poll/:id/choice", listChoices);

export default choiceRoutes;
