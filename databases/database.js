const Sequelize = require("sequelize");

// Criar nova conexão
const connection = new Sequelize('guiaperguntas', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;