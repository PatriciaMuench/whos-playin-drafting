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


// maybe should be using camel case instead of snake?

// (prob IDs instead of names...)

// (date/time format?)

// note: * will prob need to update which items are required, for all tables... (in data definitions..)

// (is this note also in database.js?...)
// how to work with venue/band names vs. ids (now and/or when a user is able to add...) ?

// * how to use foreign keys? (instead of joins??)

// * clean up my console logs, and make the ones I still want more specific... (also clean up my files in general...)


// should bandsRouter be a new file at some point?
const bandsRouter = express.Router();
app.use('/bands', bandsRouter);

const venuesRouter = express.Router();
app.use('/venues', venuesRouter);

// app.get('/bands', (req, res, next) => {
bandsRouter.get('/', (req, res, next) => {  
  db.all(
    `SELECT 
      Bands.name AS band_name,
      Bands.description AS band_description,
      Bands.genre AS band_genre,
      CASE Events.datetime_string
        WHEN Events.datetime_string THEN Events.datetime_string
        ELSE 'none'
      END event_datetime_string,
      Venues.name AS venue_name,
      Venues.description AS venue_description
    FROM Bands
    LEFT JOIN Events
      ON Events.band_name = Bands.name
    LEFT JOIN Venues
      ON Venues.name = Events.venue_name
    GROUP BY band_name
    ORDER BY event_datetime_string
    `,
    [],
    (error, rows) => {
      if (error) {
      //   throw error;
        console.log(error);
      }
      this.data = rows; 
      console.log(rows);
      res.send(this.data);
      next();
    }
  );
});

// use IDs instead of names?
// or possibly algorithm to remove spaces for urls at some point?
bandsRouter.get('/:name', (req, res, next) => {
  const bandName = req.params.name;
  console.log('bandName: ', bandName);
  db.all(
    `SELECT 
      Bands.name AS band_name,
      Bands.description AS band_description,
      Bands.website_url AS band_website_url,
      CASE Events.datetime_string
        WHEN Events.datetime_string THEN Events.datetime_string
        ELSE 'none'
      END event_datetime_string,
      Venues.name AS venue_name,
      Venues.description AS venue_description
    FROM Bands
    LEFT JOIN Events
      ON Events.band_name = Bands.name
    LEFT JOIN Venues
      ON Venues.name = Events.venue_name
    -- WHERE band_name = $bandName
    -- I think this may have been the reason for returning no results when band was not in Events!
    WHERE Bands.name = $bandName
    ORDER BY event_datetime_string
    `,
    // hey, I wonder if one option could be to automatically make an empty entry in the Events table when a Band is created??
    [bandName],
    (error, rows) => {
      if (error) {
      //   throw error;
        console.log(error);
      }
      this.data = rows; 
      console.log(rows);
      res.send(this.data);
      next();
    }
  );
});

venuesRouter.get('/', (req, res, next) => {
  db.all(
    `SELECT 
      Venues.name AS venue_name,
      Venues.description AS venue_description,
      Venues.type AS venue_type,
      Venues.size AS venue_size,
      -- Max(Events.date) AS event_date
      CASE Events.datetime_string
        WHEN Events.datetime_string THEN Events.datetime_string
        ELSE 'none'
      END event_datetime_string,
      Bands.name AS band_name,
      Bands.description AS band_description
    FROM Venues
    LEFT JOIN Events
      ON Events.venue_name = Venues.name
    LEFT JOIN Bands
      ON Bands.name = Events.band_name
    GROUP BY venue_name
    ORDER BY event_datetime_string
    `,
    [],
    (error, rows) => {
      if (error) {
      //   throw error;
        console.log(error);
      }
      this.data = rows; 
      // console.log(`within db.all within get '/venues': \n`, this.data);
      res.send(this.data);
      next();
    }
  );
});

venuesRouter.get('/:name', (req, res, next) => {
  const venueName = req.params.name;
  db.all(
    `SELECT 
      Venues.name AS venue_name,
      Venues.description AS venue_description,
      Venues.city AS venue_city,      
      Venues.state AS venue_state,      
      Venues.website_url AS venue_website_url,
      CASE Events.datetime_string
        WHEN Events.datetime_string THEN Events.datetime_string
        ELSE 'none'
      END event_datetime_string,
      Bands.name AS band_name,
      Bands.description AS band_description,
      Bands.website_url AS band_website_url
    FROM Venues
    LEFT JOIN Events
      ON Events.venue_name = Venues.name
    LEFT JOIN Bands
      ON Bands.name = Events.band_name
    WHERE Venues.name = $venueName
    ORDER BY event_datetime_string
    `,
    [venueName],
    (error, rows) => {
      if (error) {
      //   throw error;
        console.log(error);
      }
      this.data = rows; 
      // console.log(rows);
      res.send(this.data);
      next();
    }
  );
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);