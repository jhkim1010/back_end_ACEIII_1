const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../database/database'); 

const Venta = sequelize.define('ventas', {   
    id_venta: {
        type: DataTypes.INTEGER,
        // defaultvalue: DataTypes.UUIDV4,
        primaryKey: true, 
        autoIncrement: true 
    },
    vcode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientenombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tpago : {
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