const { Sequelize } = require('sequelize')
require("dotenv").config(); 

const database =   process.env.DATABASE_NAME;  
const password =  process.env.DATABASE_PASSWORD; 
const user =      process.env.DATABASE_USER;  

const sequelize = new Sequelize(
    database, user, password, 
    {
        host :      process.env.DATABASE_HOST, 
        port :      process.env.DATABASE_PORT,
        dialect: 'postgres', 

        pool: {
            max:10, 
            min : 0, 
            acquire : 30000, 
            idle : 10000
        }
    }
); 


module.exports = { sequelize };