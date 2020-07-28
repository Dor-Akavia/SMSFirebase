const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const data = require('./scripts/data');
const paths = data.paths

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(paths.baseDir)));


// serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(paths.frontEndDir, 'index.html'));
});

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

/* eslint-disable */
server.listen(port, () => console.log(`API running on localhost:${port}`));
/* eslint-disable */