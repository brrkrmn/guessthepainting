const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const paintingsRouter = require('./controllers/paintings');
const middleware = require('./utils/middleware');
const fetchArtworks = require('./utils/fetchArtworks');

require('express-async-errors');
require('./utils/cronJobs');

mongoose.set('strictQuery', false);
console.log('Connecting to MONGODB...');

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('Connected to MongoDB')
        fetchArtworks().then(() => {
            console.log('Artwork fetching completed')
        }).catch(error => {
            console.log('Error during artwork fetching:', error)
        })
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    });

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use('/api/paintings', paintingsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app