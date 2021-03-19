const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies')

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('connected to mongodb...'))
    .catch(err => console.error('could not connect to mongodb...', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);




//setting port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`litening on port ${port}...`));