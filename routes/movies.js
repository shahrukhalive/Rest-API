const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre'); //we only require genre here, not validator
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// get request for all the  movie genres
router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);

});

//post request to add new movies
router.post('/', async(req, res) => {

    //validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // genre validation
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre...');

    //adding new movies
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);

});

//put request
router.put('/:id', async(req, res) => {

    //validate
    const { error } = validate(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);

    // genre validation
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre...');

    //find and update
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

//delete request

router.delete('/:id', async(req, res) => {

    //find and remove
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

//get a single customer request with validation
router.get('/:id', async(req, res) => {

    const movie = await Movie.findById(req.params.id)

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});


module.exports = router;