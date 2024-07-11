const router = require('express').Router();
const { faker } = require('@faker-js/faker');
const codigos = require('../models/codigo')

router.get('/codigos', async  (req, res) => {
    // await codigos.sync({ alter : true }).then(() => {
    //     console.log('Table is modified...');
    // });

    const codigos_list = await codigos.findAll();
    res.status(200).json({
        ok : true,
        status : 200,
        body : codigos_list});
    // res.send('Hello Codigos');
}); 

router.get('/codigos/:id', async (req, res) => {
    const codigo_id = req.params.id;
    const codigos_list = await codigos.findOne({
        where: {
            id_codigo : codigo_id
        }
    });
    // console.log(codigos_list);

    res.status(200).json({
        ok : true,
        status : 200,
        body : codigos_list});
    // res.send('Hello Codigos id');
}); 

router.post('/codigos', async (req, res) => {
    const dataCodigo = req.body;

    await codigos.sync();

    const createCodigo = await codigos.create({
        product_name: dataCodigo.product_name, 
        description: dataCodigo.description,
        precio: dataCodigo.precio,
        priority: 1
    });

    res.status(200); 
    // res.json(createCodigo);
    // res.send('Hello Codigos post');
}); 

router.put('/codigos/:id', async (req, res) => {
    // update data 
    const codigo_id = req.params.id;
    const dataCodigo = req.body;
    const updateCodigo = await codigos.update({
        product_name: dataCodigo.product_name, 
        description: dataCodigo.description,
        precio: dataCodigo.precio,
        priority: 2
    }, 
    {
        where: {
            id_codigo : codigo_id
        }
    });

    res.status(200).json({
        ok : true,
        status : 200,
        body : updateCodigo});
}); 

router.delete('/codigos/:id', async (req, res) => {
    const codigo_id = req.params.id;
    // const dataCodigo = req.body;
    const deleteCodigo = await codigos.destroy(
    {
        where: {
            id_codigo : codigo_id
        }
    });

    res.status(204).json({
        ok : true,
        status : 204,
        body : deleteCodigo});
            // res.send('Hello Codigos delete');
}); 

module.exports = router;