"use strict";

const Customer = require("../models/CustomerModel");
const md5 = require("md5");
const config = require("../config");
const authService = require("../services/AuthService");

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.get = async (req, res, next) => {
    try {
        const data = await Customer.find({})
        res.status(200).send({ data });
    }

    catch (error) {
        res.status(500).send({ message: 'Falha ao processar sua requisição' });
    }
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.post = async (req, res, next) => {

    try {
        let customer = new Customer();

        customer.name = req.body.name;
        customer.email = req.body.email;
        customer.password = md5(req.body.password + config.APP_KEY);

        await customer.save()
        res.status(201).send({ message: "Cliente cadastrado com sucesso!" })
    }

    catch (e) {
        res.status(400).send({ message: "Falha ao cadastrar cliente!", error: e })
    }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.authenticate = async (req, res) => {

    let customerAuth = await Customer.findOne({
        email: req.body.email,
        password: md5(req.body.password + config.APP_KEY)
    });

    if(!customerAuth)
    {
        res.status(404).json({
            message: "Usuário ou senha inválidos!"
        })

        return;

    }

    const token = await authService.generateToken({
        email: customerAuth.email, 
        name: customerAuth.password
    });

    res.status(201).json({
        token: token,
        data: {
            email: customerAuth.email,
            name: customerAuth.name
        }
    })


};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
