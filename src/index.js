import dotenv from"dotenv";
import express, { json } from "express";;
import cors from "cors";
import chalk from "chalk";

import pollRouter from "./routers/pollsRouter.js";
import choiceRouter from "./routers/choiceRouter.js"

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.use(pollRouter);
app.use(choiceRouter);

const porta = process.env.PORT || 5000;

app.listen(porta, () => {
    console.log(chalk.blue(`Servidor criado na porta ${porta}`))
})