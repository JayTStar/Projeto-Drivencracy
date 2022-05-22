import dados from "../db.js";

export async function postChoice(req,res){
    const {title, pollId} = res.locals.choice;

    try{
        await dados.collection("choice").insertOne({title:title, pollId:pollId});

        console.log("Choice cadastrada com sucesso");

        res.status(201).send("Choice cadastrada com sucesso");
    }
    catch(err){
        console.log("Erro no post da choice");
        console.log(err)
    }
}

export async function postVote(req,res){
    const {idChoice, idPoll} = res.locals.vote;

    try{
        await dados.collection("votes").insertOne({idChoice: idChoice, idPoll:idPoll});

        console.log("Vote cadastrado com sucesso");

        res.status(201).send("Vote cadastrado com sucesso");
    }
    catch(err){
        console.log("Erro no post do vote");
        console.log(err)
    }
    
}