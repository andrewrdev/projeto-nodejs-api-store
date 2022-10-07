"use strict";

const Order = require("../models/OrderModel");
const guid = require("guid");

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.get = async (req, res, next) => 
{
    try 
    {
        const data = await Order.find({}, 'number status customer')
        .populate('customer', 'name')
        .populate('items.product', 'title')

        res.status(200).send({ data });
    } 
    
    catch (e) 
    {
        res.status(500).send({message: 'Falha ao processar sua requisição'});
    }
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

exports.post = async (req, res, next) => 
{

    try 
    {
        let order = new Order();

        order.number = guid.raw().substring(0,6);
        order.customer = req.body.customer;
        order.items = req.body.items;

        await order.save()
        res.status(201).send({message: "Pedido cadastrado com sucesso!"})
    } 
    
    catch (e) 
    {
        res.status(400).send({message: "Falha ao cadastrar pedido!",error: e})
    }
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
