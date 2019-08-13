// to begin with, I am not really sure how this file is supposed to be named and where it is supposed to be located...

// I already used db.sqlite instead of this file after I originally created it, I guess,
// but I wonder if I could possibly use it to run create table scripts and then have the data be accessible from select statements elsewhere??...

// although, maybe the tables already are existing for the time being because I had run these scripts in server/index.js ?
// but I'm thinking I could logically put them here instead and then when I make changes re-run from here?

// oh and I also don't even know if this is being re-run every time I reload... - I guess I'd have to try making changes through the UI to see??

// oh yeah, it is important to try to see if this helps with everything being undefined every single first reload....I think - apparently not so far :(
// p.s. apparently changing this file is enough to cause that, and so that could potentially mean this scripts keep on being re-run anyway (though I'm not sure)...

// so, maybe the undefined on initial load has to do with some async nonsense; 
// but I think I at least feel better about separating out these create statements somehow...

// but, is there a chance the failure on initial load has to do with my dev environment setup??


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

// let db = './db.sqlite';
// let db = sqlite3.Database('./db.sqlite', err => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log('Success');
//   }
// });

db.serialize(() => {
    db.run(
      'DROP TABLE IF EXISTS Bands',
      error => {
        // throw error;
        if (error) {
          console.log(error);
        }
      }
    );
    db.run(
      'CREATE TABLE IF NOT EXISTS Bands (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT DEFAULT \'\', website_url TEXT DEFAULT \'\')',
      error => {
        // throw error;
        if (error) {
          console.log(error);
        }
      }
    );
    db.run(
    //   "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com')"
      "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com'), ('Dalton', 'country cover & original solo artist', 'daltonsherrifs.com')"
    // ** error stuff??...

    );
    // db.all(
    //   'SELECT * FROM Bands',
    //   [],
    //   (error, rows) => {
    //     if (error) {
    //     //   throw error;
    //       console.log(error);
    //     }
    //     // console.log(rows);
    //     // wait, I bet I can't even get it to log to console from here... :/
    //     // return rows;
    //     rows.forEach(row => {
    //       console.log('within db function');
    //       console.log(row);
    //     });
    //     this.bands = rows; 
    //     // const bands = rows;
    //   }
    // );
  });

  db.serialize(() => {
    db.run(
      'DROP TABLE IF EXISTS Venues',
      error => {
        // throw error;
        if (error) {
          console.log(error);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS Venues (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL, 
        city TEXT DEFAULT '', 
        state TEXT DEFAULT '', 
        description TEXT DEFAULT '', 
        website_url TEXT DEFAULT ''
      )`,
      error => {
        // throw error;
        if (error) {
          console.log(error);
        }
      }
    );
    db.run(
    //   "INSERT INTO Bands (name, description, website_url) VALUES ('BearFight', 'rock cover/wedding band', 'bearfight.com')"
      `INSERT INTO Venues (name, city, state, description, website_url) VALUES 
      ('The Lansdowne', 'Boston', 'MA', 'bar', 'lansdowne.com'), 
      ('The Chicken Box', 'Nantucket', 'MA', 'bar', 'chickenbox.com')`
      // **

    );
    // db.all(
    //   'SELECT * FROM Venues',
    //   [],
    //   (error, rows) => {
    //     if (error) {
    //     //   throw error;
    //       console.log(error);
    //     }
    //     // console.log(rows);
    //     // wait, I bet I can't even get it to log to console from here... :/
    //     // return rows;
    //     rows.forEach(row => {
    //       console.log('within db function');
    //       console.log(row);
    //     });
    //     this.venues = rows; 
    //     // const bands = rows;
    //   }
    // );
  });

  db.serialize(() => {
    db.run(
      'DROP TABLE IF EXISTS Events',
      error => {
        // throw error;
        if (error) {
          console.log(error);
        }
      }
    );
    db.run(
      // not sure of the proper/best order for column vs foreign key definitions (or w/e)..
      // (date/time format?)
      // note: * will prob need to update which items are required, for all tables...
    //   `CREATE TABLE IF NOT EXISTS Events (
    //     id INTEGER PRIMARY KEY, 
    //     venue_id INTEGER,  
    //     band_id INTEGER, 
    //     date TEXT DEFAULT '', 
    //     time TEXT DEFAULT '', 
    //     notes TEXT DEFUALT '',
    //     FOREIGN KEY (venue_id) REFERENCES Venues(id),
    //     FOREIGN KEY (band_id) REFERENCES Bands(id)
    //   )`,
      `CREATE TABLE IF NOT EXISTS Events (
        id INTEGER PRIMARY KEY, 
        venue_name TEXT NOT NULL,  
        band_name TEXT NOT NULL, 
        date TEXT DEFAULT '', 
        time TEXT DEFAULT '', 
        notes TEXT DEFUALT '',
        FOREIGN KEY (venue_name) REFERENCES Venues(name),
        FOREIGN KEY (band_name) REFERENCES Bands(name)
      )`, 
      error => {
        // throw error;
        if (error) {
          console.log(error);
        }
      }
    );
    db.run(
      // how to work with venue/band names vs. ids (now and/or when a user is able to add...) ?
      // `INSERT INTO Events (venue_id, band_id, date, time, notes) VALUES 
      `INSERT INTO Events (venue_name, band_name, date, time, notes) VALUES 
        ('The Lansdowne', 'BearFight', '8/9/19', '9pm', 'good times'), 
        ('The Lansdowne', 'Dalton', '8/10/19', '9pm', 'sing along')`
        // **

    );
    // db.all(
    //   'SELECT * FROM Events',
    //   [],
    //   (error, rows) => {
    //     if (error) {
    //     //   throw error;
    //       console.log(error);
    //     }
    //     // console.log(rows);
    //     // wait, I bet I can't even get it to log to console from here... :/
    //     // return rows;
    //     rows.forEach(row => {
    //       console.log('within db function');
    //       console.log(row);
    //     });
    //     this.events = rows; 
    //     // const bands = rows;
    //   }
    // );
  });