const { DataTypes } = require('sequelize'); 
const {sequelize} = require('../database/database'); 

const Users = sequelize.define('users', {   
    id_user: {
        type: DataTypes.INTEGER,
        // defaultvalue: DataTypes.UUIDV4,
        primaryKey: true, 
        autoIncrement: true 
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    ref_id_company: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false , 
        allowNull: false
    }, 
    
}, {
    timestamps: true 
}); 

Users.sync(); 
// Codigo.sync({ force: false }).then(() => {
//     console.log('Table created');
// }); 

module.exports = Users;