import { Router } from "express";
import { pollValidation, findPoll } from "../middlewares/pollsMiddleware.js";
import { addPoll, getPoll, getPollChoices, getResults } from "../controllers/pollsController.js";

const pollRouter = Router();

pollRouter.post("/poll",pollValidation,addPoll);
pollRouter.get("/poll", getPoll);
pollRouter.get("/poll/:id/choice", findPoll, getPollChoices);
pollRouter.get("/poll/:id/result", findPoll, getResults);

export default pollRouter;