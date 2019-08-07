// (based on https://www.twilio.com/blog/react-app-with-node-js-server-proxy)
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/bands', (req, res, next) => {
    const bands = [
        {
            name: 'BearFight',
            website_url: 'bearfight.com',
            description: 'rock cover/wedding band'
        },
        {
            name: 'Dalton',
            website_url: 'daltonsherrifs.com',
            description: 'country cover & original solo artist'
        }
    ];
//   req.bands = bands;
//   res.body += bands;
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify(bands));
//   res.bands = 'bands';
  res.send(bands);
  next();
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);