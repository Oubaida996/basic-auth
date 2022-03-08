'use strict';

const {db ,DataTypes} =require('./database')

const Users = () => db.define('users',

{
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pwd: {
        type: DataTypes.STRING,
        allowNull: false
    }



}
);


module.exports=Users();