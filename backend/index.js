const express = require("express");
const { MongoClient } = require('mongodb');

//const url = 'mongodb://localhost:27017';
const url = 'mongodb+srv://admin:MvLwgOCXOsXNUy3r@cluster0.i7gbpuf.mongodb.net/';
const dbName = 'db-nss';

async function main(){
  console.log('Conectando com Banco de Dados...');
  const dbClient = await MongoClient.connect(url);
  const db = dbClient.db(dbName);
  const cll = db.collection('cll-scores');
  console.log('Conexão com Banco de Dados Realizada com Sucesso');

  const app = express();
  app.use(express.json());

  //PAGINA INICIAL
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  //LISTAR TODOS OS REGISTROS
  app.get("/scores",  async (req, res) => {
    const itens = await cll.find().toArray();
    res.send(itens);
  });

  //LISTAR 10 REGISTROS (DECRESCENTE)
  app.get("/scores10",  async (req, res) => {
    const itens = await cll
      .find()
      .sort({ pontos: -1 })
      .limit(10)
      .toArray();
    res.send(itens);
  });

  //ADICIONAR REGISTRO
  app.post("/score", async (req, res) => {
    const item = req.body;
    await cll.insertOne(item);
    res.send(item);
  });

  /*app.get("/score/:id",  (req, res) => {
    const {id} = req.params;
    res.send(lista[id]);
  });*/

  app.listen(process.env.PORT || 3000);
}

main();