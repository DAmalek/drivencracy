import { Router } from "express";
import { pollSchemaValidation } from "../middlewares/poll.middleware.js";
import { createPoll, listPoll } from "../controllers/poll.controller.js";

const pollRoutes = Router();

pollRoutes.post("/poll", pollSchemaValidation, createPoll);
pollRoutes.get("/poll", listPoll);

export default pollRoutes;
