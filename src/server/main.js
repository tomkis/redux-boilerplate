import sr from './staticResources'; // eslint-disable-line no-unused-vars

import express from 'express';
const server = express();

import fs from 'fs';
const indexHtml = fs.readFileSync('dist/client/index.html');

server.use('/', express.static('dist/client'));
server.get('/hello', (req, res) => res.json({hello: true}));

server.use((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(indexHtml);
  res.end();
});

server.listen(process.env.PORT || 3000);
