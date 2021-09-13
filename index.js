const express = require("express");
const app = express()

// Conexão com o banco de dados
const connection = require("./databases/database")

// Tabelas
const Pergunta = require("./databases/Pergunta")
const Resposta = require("./databases/Resposta")

// Database
connection
    .authenticate() // Realizar autenticação no database
    .then(() => { // Se der certo mostre a mensagem abaixo
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErr) => { // Se der errado mostre o erro
        console.log(msgErr)
    })

app.set("view engine", "ejs"); // Dizendo  para o express usar o ejs como view engine

app.use(express.static('public')) // Pasta de arquivos css, imagens, js entre outros, public muito usada no mercada

// Capturar dados do formulário
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rota inicial
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [ // order Decrescente = DESC; Crescente = ASD
            ['id', 'DESC']
        ]
    }).then((perguntas) => {
        res.render("index", {
            perguntas: perguntas
        })
    })
    .catch((err) => {
        res.send("404 - Not Found")
    })
});

// Rota de perguntas
app.get("/perguntar", (req, res) => {
    res.render("perguntar")
});

// Rota post do formulário
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // Salvar dados dentro da tabela
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/"); // Redirecionar para a página principal
    })
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    // Buscar apenas um dado no database
    Pergunta.findOne({
        // Onde id da url == id do database
        where: {
            id: id
        }
    }).then((pergunta) => {
        if (pergunta != undefined) {            
            // Encontrando respostas para perguntas
            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [ // order Decrescente = DESC; Crescente = ASD
                    ['id', 'DESC']
                ],
            }).then((respostas)=>{
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        } else {
            res.redirect("/")
        }
    })
})

app.post("/responder", (req, res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId); // Redirecionar para a página principal
    })
})

app.use(function(req, res, next) {
    res.render("notfound")
});

app.listen(5050, () => { console.log("O app está rodadando na porta 5050..."); });