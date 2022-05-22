import { Router } from "express";

import { validateChoices, findChoice } from "../middlewares/choicesMiddleware.js";
import { postChoice, postVote } from "../controllers/choicesController.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validateChoices, postChoice);
choiceRouter.post("/choice/:id/vote", findChoice, postVote);

export default choiceRouter;