'use strict';

const base64 = require('base-64');
const bcrybt = require('bcrypt');

const basicAuth = (req, res, next) => {
    if (req.headers['authorization']) {
        let basicHeaderParts = req.headers.authorization.split(' ');
        console.log('basicHeaderParts >>> ', basicHeaderParts);
        let encodedPart = basicHeaderParts.pop();//encoded(username:password)
        console.log('encodedPart >>> ', encodedPart);
        let decoded = base64.decode(encodedPart);
        console.log('decoded >>> ', decoded);
        let [username, password] = decoded.split(':');//[username: password]
        req.user ={username :username ,password :password};
        next();
    } else {
        next('username and password in not correct ');
    }
}


module.exports = basicAuth;