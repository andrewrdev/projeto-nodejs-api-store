"use strict";

const Product = require("../models/ProductModel");

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.get = async (req, res, next) => 
{
    try 
    {
        const data = await Product.find({ active: true }, '_id title slug description price tags')
        res.status(200).send({ data });
    } 
    
    catch (error) 
    {
        res.status(500).send({message: 'Falha ao processar sua requisição'});
    }
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.getBySlug = async (req, res, next) => 
{
    try 
    {
        const data = await Product.findOne({ slug: req.params.slug }, '_id title description price tags')
        res.status(201).send(data)
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao listar o produto!",error: e})
    }
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.getById = async (req, res, next) => 
{
    try 
    {
        const data = await Product.findById(req.params.id, '_id title description price tags')
        res.status(201).send(data)
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao listar o produto!",error: e})
    }

}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.getByTag = async (req, res, next) => 
{

    try 
    {
        const data = await Product.find({ tags: req.params.tag, active: true }, '_id title description price tags')
        res.status(201).send(data)
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao listar o produto!",error: e})
    }
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.post = async (req, res, next) => 
{

    try 
    {
        let product = new Product();

        product.title = req.body.title;
        product.description = req.body.description;
        product.slug = req.body.slug;
        product.price = req.body.price;
        product.active = req.body.active;
        product.tags = req.body.tags;

        await product.save()
        res.status(201).send({message: "Produto cadastrado com sucesso!"})
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao cadastrar produto!",error: e})
    }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.put = async (req, res, next) => 
{

    try 
    {
        await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        })

        res.status(201).send({message: "Produto atualizdo com sucesso!"})
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao atualizar produto!",error: e})
    }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.delete = async (req, res, next) => 
{
    try 
    {
        await Product.findOneAndRemove(req.params.id)
        res.status(201).send({message: "Produto excluído com sucesso!"})
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao excluir produto!",error: e})
    }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------