// (based on https://www.twilio.com/blog/react-app-with-node-js-server-proxy)
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// maybe should be using camel case instead of snake
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
// const bands = {
//     'BearFight': {
//         name: 'BearFight',
//         website_url: 'bearfight.com',
//         description: 'rock cover/wedding band'
//     },
//     'Dalton': {
//         name: 'Dalton',
//         website_url: 'daltonsherrifs.com',
//         description: 'country cover & original solo artist'
//     }
// };

const bandsRouter = express.Router();
app.use('/bands', bandsRouter);

// app.get('/bands', (req, res, next) => {
bandsRouter.get('/', (req, res, next) => {
    // const bands = [
    //     {
    //         name: 'BearFight',
    //         website_url: 'bearfight.com',
    //         description: 'rock cover/wedding band'
    //     },
    //     {
    //         name: 'Dalton',
    //         website_url: 'daltonsherrifs.com',
    //         description: 'country cover & original solo artist'
    //     }
    // ];
//   req.bands = bands;
//   res.body += bands;
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify(bands));
//   res.bands = 'bands';

    const band = bands.filter(band => {
        return band.name === req.params.name;
    });
    console.log(band);
    // can I not console.log from this file?? :(

  res.send(bands);
  next();
});

// use IDs instead of names?
// app.get('/bands/:name', (req, res, next) => {
bandsRouter.get('/:name', (req, res, next) => {
    const band = bands.filter(band => {
        return band.name === req.params.name;
    });
    console.log(band);
    // console.log(bands.find(req.params.name));
    console.log(req.params.name);
    // console.log(bands[req.params.name]);
    // really I would need events.....
    // res.send(bands[req.params.name]);
    res.send(band[0]);
    // res.send(JSON.stringify(band));    
    next();
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);