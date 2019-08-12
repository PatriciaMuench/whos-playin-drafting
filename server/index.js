// (based on https://www.twilio.com/blog/react-app-with-node-js-server-proxy)
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);


// ...unsure how to set up the db stuff properly...
// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();
// import sqlite3 from 'sqlite3';
// const db = new sqlite3.Database('./db.sqlite');
let db = new sqlite3.Database('./db.sqlite', err => {
  if (err){
    console.log(err);
  } else {
    console.log('Success');
  }
});

// some notes from codecademy:
// db.all() - fetch all the data we have that meets certain criteria
// db.get() - fetch a single row from a database
// db.run() - To perform SQL commands that do not return rows
// db.each() - will enable us to process every row returned from a database query, 
// additionally takes an optional second callback function, which will be called when all of the queries are completed and processed
// db.serialize() - 

// db.serialize(() => {
//   db.run(
//     'CREATE TABLE Bands (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT DEFAULT \'\'), website_url TEXT DEFAULT \'\'',
//     error => {
//       throw error;
//       // console.log(error);
//     }
//   );
//   db.run(
//     "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com')"
//   );
//   db.all(
//     'SELECT * FROM Bands',
//     (error, rows) => {
//       if (error) {
//         throw error;
//         // console.log(error);
//       }
//       console.log(rows);
//       // wait, I bet I can't even get it to log to console from here... :/
//     }
//   );
// });

// it is good practice to close a database connection when you are done with it (?)
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });


// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

// maybe should be using camel case instead of snake
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
// const bands = db.all(
//   'SELECT * FROM Bands',
//   (error, rows) => {
//     if (error) {
//       throw error;
//       // console.log(error);
//     }
//     //console.log(rows);
//     // wait, I bet I can't even get it to log to console from here... :/
//     return rows;
//   }
// );

const getBands = () => {
    db.serialize(() => {
        db.run(
          'DROP TABLE IF EXISTS Bands',
          error => {
            // throw error;
            console.log(error);
          }
        );
        db.run(
          'CREATE TABLE IF NOT EXISTS Bands (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT DEFAULT \'\', website_url TEXT DEFAULT \'\')',
          error => {
            // throw error;
            console.log(error);
          }
        );
        db.run(
        //   "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com')"
          "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com'), ('Dalton', 'country cover & original solo artist', 'daltonsherrifs.com')"
        );
        db.all(
          'SELECT * FROM Bands',
          [],
          (error, rows) => {
            if (error) {
            //   throw error;
              console.log(error);
            }
            // console.log(rows);
            // wait, I bet I can't even get it to log to console from here... :/
            // return rows;
            rows.forEach(row => {
              console.log('within db function');
              console.log(row);
            });
            this.bands = rows; 
            // const bands = rows;
          }
        );
      });
      return this.bands;
};

// Basic: name, city, state, website url, one descriptor (?)
// Or maybe just start with Name, for bare bones...
const venues = [
    {
        name: 'The Lansdowne',
        city: 'Boston',
        state: 'MA',
        website_url: 'lansdowne.com',
        description: 'bar'
    },
    {
        name: 'The Chicken Box',
        city: 'Nantucket',
        state: 'MA',
        website_url: 'chickenbox.com',
        description: 'bar'
    }
];

// Basic: venue (foreign key or w/e), band (foreign key or w/e), date, time, ... (?)
// Additional: (maybe notes such as whether ticket or cover would be required?, maybe optional name for the event such as a concert with a tour name?) … (?)
const events = [
    {
        // (prob IDs instead of names...)
        venue_name: 'The Lansdowne',
        band_name: 'BearFight',
        // (date/time format?)
        date: '8/9/19',
        time: '9pm',
        notes: 'good times'
    },
    {
        venue_name: 'The Lansdowne',
        band_name: 'Dalton',
        date: '8/10/19',
        time: '9pm',
        notes: 'sing along'
    }
];

const bandsRouter = express.Router();
app.use('/bands', bandsRouter);

const venuesRouter = express.Router();
app.use('/venues', venuesRouter);

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

    // const band = bands.filter(band => {
    //     return band.name === req.params.name;
    // });
    // console.log(band);
    // can I not console.log from this file?? :(


        // const bands = db.serialize(() => {
        //   db.serialize(() => {
        //     db.run(
        //       'DROP TABLE IF EXISTS Bands',
        //       error => {
        //         // throw error;
        //         console.log(error);
        //       }
        //     );
        //     db.run(
        //       'CREATE TABLE IF NOT EXISTS Bands (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT DEFAULT \'\', website_url TEXT DEFAULT \'\')',
        //       error => {
        //         // throw error;
        //         console.log(error);
        //       }
        //     );
        //     db.run(
        //     //   "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com')"
        //       "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com'), ('Dalton', 'country cover & original solo artist', 'daltonsherrifs.com')"
        //     );
        //     db.all(
        //       'SELECT * FROM Bands',
        //       [],
        //       (error, rows) => {
        //         if (error) {
        //         //   throw error;
        //           console.log(error);
        //         }
        //         // console.log(rows);
        //         // wait, I bet I can't even get it to log to console from here... :/
        //         // return rows;
        //         rows.forEach(row => {
        //           console.log('within db function');
        //           console.log(row);
        //         });
        //         this.bands = rows; 
        //       }
        //     );
        //   });
  const bands = getBands();
  console.log('within server function');
  console.log(bands);
//   console.log(this.bands);
  res.send(bands);
//   res.send(this.bands);
  next();
});

// use IDs instead of names?
// app.get('/bands/:name', (req, res, next) => {
bandsRouter.get('/:name', (req, res, next) => {
    const bands = getBands();
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

venuesRouter.get('/', (req, res, next) => {
  res.send(venues);
  next();
});

// use IDs instead of names?
venuesRouter.get('/:name', (req, res, next) => {
    const venue = venues.filter(venue => {
        return venue.name === req.params.name;
    });
    // really I would need events.....
    res.send(venue[0]);
    next();
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);