const Sequelize = require("sequelize");

// Criar nova conexão
const connection = new Sequelize('SEU DATABASE', 'SEU USUARIO DO DB', 'SUA SENHA DO DB', {
    host: 'SEU HOST',
    dialect: 'mysql'
});

module.exports = connection;