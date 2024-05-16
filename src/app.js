const express = require('express');
const router  = require('../routers/codigosRouter');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  app.use(__dirname, express.static('public'));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.use('/api/v1', router);

module.exports = app;
// export default app;
