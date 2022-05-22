import Joi from "joi";
import chalk from "chalk";
import { stripHtml } from "string-strip-html";
import dados from "../db.js";
import { ObjectId } from "mongodb";

export async function pollValidation(req, res, next){
    const pool = req.body;

    const poolSchema = Joi.object({
        title: Joi.string().required(),
        expireAt: Joi.string().min(0)
    })

    const validation = poolSchema.validate(pool);
    if (validation.error) return res.status(422).send(validation.error);

    const sanitizedPoll = {
        ...pool,
        title: stripHtml(pool.title).result,
        expireAt: stripHtml(pool.expireAt).result
    } 

    res.locals.pool = sanitizedPoll;

    next();
}

export async function findPoll(req, res, next){
    const id = req.params.id;

    try{
        const poll = await dados.collection("polls").findOne({_id: ObjectId(id)});

        if(!poll){
            res.status(404).send("Poll não cadastrada");
        }
        else{
            next();
        }
    }
    catch(err){
        console.log("Erro ao procurar poll");
        console.log(err);
    }

}