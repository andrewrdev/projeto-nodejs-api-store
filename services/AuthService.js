'use strict';

const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = async (data) => {
    return jwt.sign(data, config.APP_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, config.APP_KEY);
    return data;
}

exports.authorize = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso restrito'
        });
    } else {
        jwt.verify(token, config.APP_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        })
    }
}