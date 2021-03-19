const { Customer, validate } = require('../models/customer')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// get request for all the  customers
router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);

});

//post request to add new customers
router.post('/', async(req, res) => {

    //validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //adding new customers
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold

    });

    customer = await customer.save();
    res.send(customer);

});

//put request
router.put('/:id', async(req, res) => {

    //validate
    const { error } = validate(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);


    //find and update
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone

    }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

//delete request

router.delete('/:id', async(req, res) => {

    //find and remove
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});


//get a single customer request with validation
router.get('/:id', async(req, res) => {

    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
});

module.exports = router;