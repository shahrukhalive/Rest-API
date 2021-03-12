const express = require('express');
const router = express.Router();


const genres = [
    { "id": 1, "genre": "comedy" },
    { "id": 2, "genre": "action" },
    { "id": 3, "genre": "animation" },
    { "id": 4, "genre": "Drama" },
    { "id": 5, "genre": "Crime", },
    { "id": 6, "genre": "Musical", },
    { "id": 7, "genre": "Horror", },
    { "id": 8, "genre": "Adventure", },
    { "id": 9, "genre": "Fantasy" },
    { "id": 10, "genre": "Thriller" },
];


// get request for all the  movie genres
router.get('/', (req, res) => {

    res.send(genres);

});


//post request to add new genres
router.post('/', (req, res) => {

    //validation
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //adding new genres
    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    };
    genres.push(genre);
    res.send(genre);

});

//put request
router.put('/:id', (req, res) => {
    //find courses
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    //validate
    const { error } = validateGenre(req.body); //result.error
    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre);
});


//delete request
router.delete('/:id', (req, res) => {
    //find genre
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    //deleting index
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


//get a single genre request with validation
router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

//validater function
function validateGenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);

}

module.exports = router;