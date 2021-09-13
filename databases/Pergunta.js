const Sequelize = require("sequelize");
const connection = require("./database.js");

const Pergunta = connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING, // Textos curtos
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT, // Textos longos
        allowNull: false
    }
});

Pergunta.sync({ force: false }).then(()=>{}); // Se não existir, criar. Se existir não fazer nada

module.exports = Pergunta;