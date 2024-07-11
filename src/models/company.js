const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../database/database'); 

const Company = sequelize.define('companies', {   
    id_company: {
        type: DataTypes.INTEGER,
        // defaultvalue: DataTypes.UUIDV4,
        primaryKey: true, 
        autoIncrement: true 
    },
    companyname: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    security_key: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    msg_for_client: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    num_sucursal: {
        type: DataTypes.INTEGER
    }, 
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false , 
        allowNull: false
    }
}, {
    timestamps: true 
}); 

Company.sync(); 
// Codigo.sync({ force: false }).then(() => {
//     console.log('Table created');
// }); 

module.exports = Company;