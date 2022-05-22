import dados from "../db.js";
import chalk from "chalk";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function addPoll(req, res){
    const dia = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');

    const {title, expireAt} = res.locals.pool
    
    try{
        if(!expireAt){
            await dados.collection("polls").insertOne({ title:title, expireAt:dia});

            res.status(201).send("Poll criado com sucesso");
        }
        else{
            await dados.collection("polls").insertOne({ title:title, expireAt:expireAt})

            res.status(201).send("Poll criado com sucesso");
        }
    }
    catch(err){
        console.log(chalk.red("Falha no cadastro do poll"));
        console.log(err)
    }
}

export async function getPoll(req, res){
    try{
        const polls = await dados.collection("polls").find().toArray();

        res.status(200).send(polls)
    }
    catch(err){
        console.log(chalk.red("Falha na busca dos polls"));
    }
}

export async function getPollChoices(req, res){
    const id = req.params.id;

    try{
        const pollChoices = await dados.collection("choice").find({pollId: id}).toArray();

        res.status(200).send(pollChoices);
    }
    catch(err){
        console.log("Erro ao buscar Choices");
        console.log(err);
    }
}

export async function getResults(req, res){
    const id = req.params.id;

    const choicesVote = []

    try{
        const poll = await dados.collection("polls").findOne({_id: ObjectId(id)})

        const choices = await dados.collection("votes").distinct('idChoice', {idPoll: id});

        const todosVotos = choices.map(async element => {
            const votos = await dados.collection('votes').countDocuments({idChoice: element});
            console.log(votos)
            choicesVote.push({id: element, votos: votos});
        })

        await Promise.all(todosVotos);

        const maiorVoto = choicesVote.reduce(function(a, b) {
            return Math.max(a.votos, b.votos);
        });

        const choiceMaisVotada = choicesVote.find(element => element.votos === maiorVoto);

        const resposta = {
            _id: id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: choiceMaisVotada
        }

        console.log(choiceMaisVotada)
        res.status(200).send(resposta);
    }
    catch(err){
        console.log("Erro ao buscar resultados");
        console.log(err);
    }
}