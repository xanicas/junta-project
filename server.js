require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const routes = require('./routes');

const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));
app.use('/api', routes);

app.use(express.static(path.join(__dirname, '/client/build'))).listen(port, () => console.log(`Listening on ${port}`));