import { Router } from "express";
import { pollSchemaValidation } from "../middlewares/poll.middleware.js";
import {
  createPoll,
  listPoll,
  listResult,
} from "../controllers/poll.controller.js";

const pollRoutes = Router();

pollRoutes.post("/poll", pollSchemaValidation, createPoll);
pollRoutes.get("/poll", listPoll);
pollRoutes.get("/poll/:id/result", listResult);

export default pollRoutes;
