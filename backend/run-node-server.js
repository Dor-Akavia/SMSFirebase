const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const statusController = require('./src/controllers/status.controller');

const app = express();

const baseDir = path.resolve(__dirname, '../');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(baseDir, 'frontend')));

app.use('/api/status', statusController);

app.get('/', (req, res) => {
  res.sendFile(path.join(baseDir, 'frontend', 'index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

/* eslint-disable */
server.listen(port, () => console.log(`API running on localhost:${port}`));
/* eslint-disable */