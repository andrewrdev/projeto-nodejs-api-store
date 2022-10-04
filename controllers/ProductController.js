"use strict";

const Product = require("../models/ProductModel");

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.get = (req, res, next) => {
    Product.find({active: true}, '_id title slug description price tags')
    
    .then((data) => {
        res.status(201).send({
            data 
        })
    }).catch((e) => {
        res.status(400).send({
            message: "Falha ao listar os produtos!",
            error: e
        })
    });
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.getBySlug = (req, res, next) => {
    Product.findOne({slug: req.params.slug}, '_id title description price tags')
    
    .then((data) => {
        res.status(201).send(data)
    }).catch((e) => {
        res.status(400).send({
            message: "Falha ao listar o produto!",
            error: e
        })
    });
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.getById = (req, res, next) => {
    Product.findById(req.params.id, '_id title description price tags').then((data) => {
        res.status(201).send(data)
    }).catch((e) => {
        res.status(400).send({
            message: "Falha ao listar o produto!",
            error: e
        })
    });
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.getByTag = (req, res, next) => {
    Product.find({tags: req.params.tag, active: true}, '_id title description price tags')
    
    .then((data) => {
        res.status(201).send(data)
    }).catch((e) => {
        res.status(400).send({
            message: "Falha ao listar o produto!",
            error: e
        })
    });
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.post = (req, res, next) => {
    let product = new Product();

    product.title = req.body.title;
    product.description = req.body.description;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.active = req.body.active;
    product.tags = req.body.tags;

    product.save().then((x) => {
        res.status(201).send({
            message: "Produto cadastrado com sucesso!" 
        })
    }).catch((e) => {
        res.status(400).send({
            message: "Falha ao cadastrar produto!",
            error: e
        })
    });
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send({ id: id, item: req.body });
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send({ id: id, item: req.body });
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------