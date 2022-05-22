import Joi from "joi";
import dados from "../db.js";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";

export async function validateChoices(req, res, next){
    const choice = req.body;

    const choiceSchema = Joi.object({
        title: Joi.string().required() ,
        pollId: Joi.string().required()
    })

    const validation = choiceSchema.validate(choice);
    if (validation.error) return res.status(422).send(validation.error);

    const sanitizedChoice = {
        ...choice,
        title: stripHtml(choice.title).result,
        pollId: stripHtml(choice.pollId).result
    }

    res.locals.choice = sanitizedChoice;

    try{
        const pollValidation = await dados.collection("polls").findOne({_id: ObjectId(sanitizedChoice.pollId)});

        if(!pollValidation){
            console.log("Poll não encontrado");

            res.status(404).send("Poll não encontrada");
        }

        const choiceValidation = await dados.collection("choice").findOne({title: sanitizedChoice.title, pollId: sanitizedChoice.pollId});

        if(!choiceValidation){
            next();
        }
        else{
            res.status(409).send("Choice já cadastrada");
        }
    }
    catch(err){
        console.log(err)
    }
}

export async function findChoice(req, res, next){
    const id = req.params.id;

    console.log(id);

    try{
        const choice = await dados.collection("choice").findOne({_id: ObjectId(id)});

        if(!choice){
            res.status(404).send("Choice não encontrada");
        }
        else{
            res.locals.vote = {
                idChoice: id,
                idPoll: choice.pollId
            }

            next();
        }
    }
    catch(err){
        console.log("Erro ao procurar choice");
        console.log(err);
    }
}