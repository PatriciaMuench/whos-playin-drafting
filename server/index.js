// (based on https://www.twilio.com/blog/react-app-with-node-js-server-proxy)
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// const sqlite3 = require('sqlite3');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.sqlite', err => {
  if (err){
    console.log(err);
  } else {
    console.log('Success');
  }
});
// (https://discuss.codecademy.com/t/if-we-have-a-db-sqlite-file-already-in-the-directory-do-we-need-to-create-a-new-database-file/404167)


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


// should bandsRouter be a new file at some point?...
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
      -- CASE Events.datetime_string
      -- I realized the earliest event per band (Dalton) wasn't the one showing...
      CASE Min(Events.datetime_string)
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
    -- GROUP BY band_name
    -- it seems like somehow this was preventing more than one band with no events, or something...
    GROUP BY Bands.name
    -- ORDER BY event_datetime_string -- maybe this is the default?
    -- ORDER BY Events.datetime_string -- this seems wrong (?)
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

// the form for adding a new band would be a get, and the submission to create the band would be a post...
// (not sure at the moment what should be displayed upon/after submission) - maybe get bands/:name for the newly added band?

// prob won't need ajax/db for the get/form (?),
// then would need insert statement(s) for the post/submit, 
// INSERT INTO Bands (name, description, website_url, genre)
// (also will need to handle taking in the user input....)
// then maybe select afterward?

// (eventually I'll need to edit database.js...)

// I think I will def need to look back at the Express tutorial for other CRUD stuff... (?) - or React Router??

// app.post('/new-band', (req, res, next) => {
// maybe it should really be post, 'bands' ?
// (https://www.codecademy.com/courses/learn-express/lessons/learn-express-routes/exercises/creating-an-expression?action=resume_content_item)
// bandsRouter.post('/', (req, res, next) => {
  // I'm thinking req.query will/should include the key value pairs from the query string
  // console.log(req.query);
  // console.log(req.body);
  // likely use some kind of if check, and do the needed updates...
  // When updating, many servers will send back the updated resource after the updates are applied so that the client has the exact same version of the resource as the server and database.
  // res.send();
  // res.status(200).send();
  // res.render('/');
  // res.send(req.body);
  // res.send(getBands);
  // getBands();
  // getBands(req, res, next); // seems to display the query results in the browser
  // bandsRouter.get('/', getBands);
  // app.get('/bands');
  // res.send('posted');
  // this.getBands();
  // return bandsRouter.get('/', getBands);
  // res.redirect('bands');
  // res.redirect('/bands');  
  // I guess the above line works with 'bands' or '/bands' (?)
  // next();
  // next(bandsRouter.get('/'));  
  // next('/bands');
  // next(getBands);
  // next(bandsRouter.get('/', getBands));
  // res.render('bands');
  // res.render(bandsRouter.get('/', getBands));  
  // (https://www.codecademy.com/courses/learn-express/lessons/learn-express-routes/exercises/using-queries?action=resume_content_item)
// });
// }).get('/', getBands);
// haven't yet figured out how to actually forward to GET /bands after a post, but also don't know if that would be right...
// could it possibly by done with a .then() in the front end??.....

// for now, just copied the lines I was using out of the above mess and put them here:
// (then continued working on it)
bandsRouter.post('/', (req, res, next) => {
  // console.log(req.query); // this would be in the case of a GET, I believe, so it's blank here
  console.log('req.body: ', req.body);
  db.run(
    // (camel vs. snake?)
    `INSERT INTO Bands (name, description, website_url, genre) VALUES 
    ($name, $description, $websiteURL, $genre)`,
    {
      $name: req.body.name,
      $description: req.body.description,
      $websiteURL: req.body.websiteURL,
      $genre: req.body.genre
    },
    error => {
    // (error, rows) => {
    // (rows, error) => {      
      if (error) {
        // throw error;
        console.log(error);
        return; // (?)
      }
      console.log('req.body.name: ', req.body.name);
      // console.log('rows?: ', rows);
      console.log('this.lastID: ', this.lastID); // undefined - idk why..
      console.log('this?: ', this); // apparently here this logs as {data: [array of all the rows prior to this addition]} ?
      // res.on('', () => res.redirect('/bands'));
      // res.on('data', (data) => res.redirect('/bands'));      
      res.redirect('/bands'); // do I maybe want to send a status code other than 302, such as successful post?
  // res.redirect('/bands', 207); // (not sure how to use this one)
  // res.redirect('/bands', 201); // or res.redirect(201, '/bands'); // interesting, though not great.. (?)
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
    -- GROUP BY venue_name
    GROUP BY Venues.name
    ORDER BY event_datetime_string
    -- (not sure why there seem to be slight differences in how this select works vs. the one for bands..)
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

// (add a venue, based on adding a band):
venuesRouter.post('/', (req, res, next) => {
  console.log('req.body:', req.body);
  db.run(
    // (camel vs. snake?)
    `INSERT INTO Venues (name, city, state, description, website_url, type, size) VALUES
    ($name, $city, $state, $description, $websiteURL, $type, $size)`,
    {
      $name: req.body.name,
      $city: req.body.city,
      $state: req.body.state,
      $description: req.body.description,
      $websiteURL: req.body.websiteURL,
      $type: req.body.type,
      $size: req.body.size
    },
    error => {
      if (error) {
        // throw error;
        console.log(error);
        return; // (?)
      }
      // console.log('req.body.name: ', req.body.name);
      // console.log('this.lastID: ', this.lastID); // undefined - idk why..
      console.log('this?:', this); // apparently here this logs as {data: [array of all the rows prior to this addition]} ?
      // res.send('Venue created.'); // doesn't redirect
      // res.send('Venue created.').redirect('/venues'); // doesn't redirect
      // res.send('Venue created.').then(res.redirect('/venues')); // doesn't redirect
      // Error: Can't set headers after they are sent.
      // this.successMessage = 'Venue created.'; // doesn't seem to do anything
      res.redirect('/venues'); // do I maybe want to send a status code other than 302, such as successful post?
      // * or maybe work out an alert or something?
      // I wonder if the way to do that would be to send back a status or message, show an alert, then on alert close, GET /venues?
    }
  );
});

app.get('/new-event', (req, res, next) => {
  // I don't need to select the bands after selecting the venues, but I do need to send the response after selecting both, 
  // so I'm not sure if there is a better solution than db.serialize (or nesting callbacks, or w/e)...
  // actually, I don't even know if db.serialize takes a callback or if putting res.send at the end would work...
  // (I also don't know of a way to do 2 selects in one query statement when there really is no join needed..)
  // p.s. unsure where I want camel vs snake, of course..
  db.all(
    // do I need distinct?
    `SELECT DISTINCT Venues.name AS venueName FROM Venues`,
    // [],
    (error, rows) => {
      if (error) {
      //   throw error;
        console.log(error);
      }
      this.venueNames = rows;
      console.log('this.venueNames1:', this.venueNames); 
      db.all(
        `SELECT DISTINCT Bands.name AS bandName FROM Bands`,
        // [],
        (error, rows) => {
          if (error) {
          //   throw error;
            console.log(error);
          }
          this.bandNames = rows;
          console.log('this.venueNames2:', this.venueNames); // looks fine
          console.log('this.bandNames:', this.bandNames); // looks fine
          console.log('this:', this); // seems good: {venueNames: [{venueName: 'The Lansdowne'}, etc.], bandNames: [{}, ]}
          // console.log('res?:', res); // lots of junk, and I don't even see the above data
          // res.send(); // seems bad
          res.send(this); // seems fine - ya know, I'm beginning to think the async is actually wrong (but not sure if my comp is just being slow?)
          next();
        }
      );
    }
  );
});

app.post('/events', (req, res, next) => {
  console.log('req.body:', req.body);
  db.run(
    `INSERT INTO Events (venue_name, band_name, datetime_string, notes) VALUES
    ($venueName, $bandName, $datetimeString, $notes)`,
    {
      $venueName: req.body.venueName, 
      $bandName: req.body.bandName, 
      $datetimeString: req.body.datetime, 
      $notes: req.body.notes
    },
    error => {
      if (error) {
        // throw error;
        console.log(error);
        return; // (?)
      }
      console.log('this:', this);
      // res.redirect('/events'); // wait, there is no such page as events....
      res.redirect('/venues'); // I'll just do this for now I guess
    }
  );
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);