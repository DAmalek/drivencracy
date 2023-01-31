import { Router } from "express";
import { pollSchemaValidation } from "../middlewares/poll.middleware.js";
import { createPoll } from "../controllers/poll.controller.js";

const pollRoutes = Router();

pollRoutes.post("/poll", pollSchemaValidation, createPoll);

export default pollRoutes;
