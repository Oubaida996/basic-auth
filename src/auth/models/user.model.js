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
    }



}
);


module.exports=Users();