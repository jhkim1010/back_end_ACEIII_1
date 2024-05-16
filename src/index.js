// const {sequelize} = require('../database/database.js'); 
// const { json } = require('sequelize');
const app = require('./app.js');

// app.use('./models/project');

const port = process.env.PORT || 4000;
// app.use(express.)

async function main() {
  // try {
    // await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
    app.listen(port); 
    console.log('Server on port', port);
  // }
}
  // catch (error) {
    // console.error('Unable to connect to the database:', error);
  // }

  


main();