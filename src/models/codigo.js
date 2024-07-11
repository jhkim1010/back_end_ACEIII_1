const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../database/database'); 

const Codigo = sequelize.define('codigos', {   
    id_codigo: {
        type: DataTypes.INTEGER,
        // defaultvalue: DataTypes.UUIDV4,
        primaryKey: true, 
        autoIncrement: true 
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio : {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false, 
        defaultValue: 0.0
    }, 
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true 
}); 

Codigo.sync(); 
// Codigo.sync({ force: false }).then(() => {
//     console.log('Table created');
// }); 

module.exports = Codigo;