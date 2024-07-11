// import React from 'react'
const { sign, verify} = require('jsonwebtoken');

const createToken = (user) => {
    // console.log(user.username, user.id_user)
    const accessToken = sign({ username: user.username, id: user.id_user },
        process.env.JWT_SECRET_KEY);
    return accessToken;
}

function validateToken(req, res, next)  {
    const token = req.cookies['access-token'];
    console.log(token)

    if(!token) {
        return res.status(401).json({ message: 'No token provided' });
    } else {
        const validToken = verify(token, process.env.JWT_SECRET_KEY); 
        console.log(validToken); 
        if(validToken) {
            req.authentificated = true;
            return next();
        } else {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}

module.exports = { createToken, validateToken };

