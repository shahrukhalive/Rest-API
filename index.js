const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api/genres', genres);


//setting port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`litening on port ${port}...`));