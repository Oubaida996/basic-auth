'use strict';

const express = require('express');
const router = express.Router();
const base64 = require('base-64');
const bcrybt = require('bcrypt');

// const {Users} = require('./models/database');

const Users = require('./models/user.model');
const basicAuth = require('./middleware/basic');


// console.log(Users);
router.get('/users' ,getUsers);
router.post('/signUp', signUp);
router.post('/signIn',basicAuth ,signIn);

async function getUsers(req,res){
    let users =await Users.findAll();
    res.json(users);
}

async function signUp(req, res) {

    let { userName, pwd } = req.body;
console.log(req.body);
    try {
        let hashedPwd = await bcrybt.hash(pwd, 5);
        // console.log('before create');
        const newUser = await Users.create({
            userName: userName,
            pwd: hashedPwd
        });
        // console.log('after create');
        res.status(201).json(newUser);
    } catch (error) {
        console.log(`Error from signUp function in router file ${error}`);
    }
}


// localhost:3000/sigIn >> Authorization >> 'Basic encoded(username:password)
async function signIn(req, res) {
    //Send a basic authentication header with a properly encoded username and password combination
    let {username ,password} = req.user;

        try {
            let user = await Users.findOne({ where: { userName: username } });
            const valid = await bcrybt.compare(password, user.pwd);
            if (valid) {
                res.status(200).json({ username: username })
            } else {
                res.send('user is not valid')
            }
        } catch (error) {
            console.log(`Error from signIp function in router file ${error}`);
        }

    }








module.exports = router;




