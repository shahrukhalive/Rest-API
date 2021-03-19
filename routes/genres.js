const { Genre, validate } = require('../models/genre')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// get request for all the  movie genres
router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);

});


//post request to add new genres
router.post('/', async(req, res) => {

    //validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //adding new genres
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);

});

//put request
router.put('/:id', async(req, res) => {

    //validate
    const { error } = validate(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);


    //find and update
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});


//delete request

router.delete('/:id', async(req, res) => {

    //find and remove
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});


//get a single genre request with validation
router.get('/:id', async(req, res) => {

    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});


module.exports = router;