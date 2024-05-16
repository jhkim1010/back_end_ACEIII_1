const { Sequelize } = require('sequelize')
const database_info = require('../configs/config.js');

const sequelize = new Sequelize(
    database_info.database, database_info.username, database_info.password, 
    {
        host: 'localhost',
        dialect: 'postgres', 
        port: database_info.port
    }
); 

module.exports = { sequelize };