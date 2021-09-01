const express = require('express');
const cors = require('cors')
const http = require('http');

const app = express();
const routes = require('./routes');

const mysql = require('mysql');
const port = 5000;

app.use(cors());

app.use('/api', routes);

let server = http.createServer(app);

server.listen(port, () => {
	console.log(`Listen on port ${port}`)
})