import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let dados = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  dados = mongoClient.db(process.env.BANCO);
  console.log(chalk.green("Conexão com o banco dados MongoDB estabelecida!"));
} catch(e) {
  console.log(chalk.red("Erro ao se conectar ao banco de dados!"), e);
}

export default dados;