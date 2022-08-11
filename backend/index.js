const express = require("express");
const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello, World!");
});

app.get("/oi", function (req, res) {
  res.send("Olá, mundo!");
});

const lista = [
  {
    id:1,
    nome:'Sergio',
    pontos: 90
  },
  {
    id:2,
    nome:'Fulano',
    pontos: 80
  },
  {
    id:3,
    nome:'Ciclano',
    pontos: 70
  }
];

app.get("/scores",  (req, res) => {
  res.send(lista);
});

app.get("/score/:id",  (req, res) => {
  const {id} = req.params;
  res.send(lista[id]);
});

app.post("/score",  (req, res) => {
  const item = req.body;
  lista.push({
    id: lista.length+1,
    nome: item.nome,
    pontos: item.pontos
  })


  res.send(item);
});


app.listen(3000);