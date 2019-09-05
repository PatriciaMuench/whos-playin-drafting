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

/********** Bands Table ****************************************/
db.serialize(() => {
    db.run(
      'DROP TABLE IF EXISTS Bands',
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS Bands (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL, 
        description TEXT DEFAULT '', 
        website_url TEXT DEFAULT '',
        genre TEXT
      )`,
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
    db.run(
      `INSERT INTO Bands (name, description, website_url, genre) VALUES 
      ('BearFight', 'rock cover band / wedding band', 'bearfight.com', 'rock'), 
      ('Dalton', 'country cover & original solo artist', 'daltonsherrifs.com', 'country'),
      ('Legends of Summer', 'popular music cover band', 'legendsofsummer.com', 'variety')`,
    // ** error stuff??...
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
  });

  /********** Venues Table ****************************************/
  db.serialize(() => {
    db.run(
      'DROP TABLE IF EXISTS Venues',
      error => {
        if (error) {
          // throw error;
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
        website_url TEXT DEFAULT '',
        type TEXT,
        size TEXT
      )`,
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
    db.run(
      `INSERT INTO Venues (name, city, state, description, website_url, type, size) VALUES 
      ('The Lansdowne', 'Boston', 'MA', 'bar', 'lansdowne.com', 'bar', 'medium'), 
      ('The Chicken Box', 'Nantucket', 'MA', 'bar', 'chickenbox.com', 'bar', 'medium'),
      ('Lincoln Tavern', 'Boston', 'MA', 'Tavern and Restaurant', 'lincolnsouthboston.com', 'restaurant', 'medium')
      `,
      // **
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
  });

  /********** Events Table ****************************************/
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
    // for datetimes, I think my (best) options for storage are text or integer,
    // there are sqlite functions such as datetime() and strftime(),
    // also there are javascript Date objects and functions...,
    // I'm thinking maybe I want to store datetimes as variables utilizing js if necessary, then insert those into tables using sqlite,
    // and I'm thinking I can convert/format them for display or comparison using js where necessary as well
    // I'm also thinking that if it doesn't matter otherwise, it would probably be nice to store them as strings rather than integers because they will be more readable at a glance
    // but, do I need date and time to be separate for any reason, vs. can I use a combined datetime...?
      `CREATE TABLE IF NOT EXISTS Events (
        id INTEGER PRIMARY KEY, 
        venue_name TEXT NOT NULL,  
        band_name TEXT NOT NULL, 
        -- date TEXT DEFAULT '', 
        -- time TEXT DEFAULT '', 
        -- datetime TEXT,
        -- datetime TEXT DEFAULT '',
        datetime_string TEXT DEFAULT '',
        -- datetime INTEGER,
        notes TEXT DEFUALT '',
        FOREIGN KEY (venue_name) REFERENCES Venues(name),
        FOREIGN KEY (band_name) REFERENCES Bands(name)
      )`, 
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
    // not sure if this is the right place, etc
    // (but prob will be different once users can input events anyway)......
    // let lansdowneBearfight1 = new Date(2019, 7, 9, 21);
    // let lansdowneBearfight1 = new Date(2019, 7, 9, 21).toString();
    // let lansdowneBearfight1 = '2019-08-09T21:00:00.000';
    // let lansdowneBearfight1 = '2019-08-09T21:00:00';
    let lansdowneBearfight1 = '2019-08-09 21:00:00';    
    let lansdowneDalton1 = new Date(2019, 7, 10, 21).toString();
    let chickenboxDalton1 = new Date(2019, 7, 15, 22).toString();
    // the above 2 versions seem to work the same way so far, though event_datetime_string will show up in state (for example) as
    // "2019-08-09 21:00:00" vs. "Sat Aug 10 2019 21:00:00 GMT-0400 (EDT)"
    // (this means one of the options I have is even to save a string but include more in it...
    // but I think I want to nail that down more in conjunction with users being able to input events)
    db.run(
      // how to work with venue/band names vs. ids (now and/or when a user is able to add...) ?
      // `INSERT INTO Events (venue_id, band_id, date, time, notes) VALUES 
      // `INSERT INTO Events (venue_name, band_name, date, time, notes) VALUES 
      //   ('The Lansdowne', 'BearFight', '8/9/19', '9pm', 'good times'), 
      //   ('The Lansdowne', 'Dalton', '8/10/19', '9pm', 'sing along'),
      //   ('The Chicken Box', 'Dalton', '8/15/19', '10pm', 'takes requests')`,
      // **
      // `INSERT INTO Events (venue_name, band_name, datetime, notes) VALUES
      `INSERT INTO Events (venue_name, band_name, datetime_string, notes) VALUES
        ('The Lansdowne', 'BearFight', $lansdowneBearfight1, 'good times'), 
        ('The Lansdowne', 'Dalton', $lansdowneDalton1, 'sing along'),
        ('The Chicken Box', 'Dalton', $chickenboxDalton1, 'takes requests') -- ,
        -- ('The Chicken Box', 'Legends of Summer', null, 'why isnt stuff working right')
        `,
      {$lansdowneBearfight1: lansdowneBearfight1, 
      $lansdowneDalton1: lansdowneDalton1, 
      $chickenboxDalton1: chickenboxDalton1},
      error => {
        if (error) {
          // throw error;
          console.log(error);
        }
      }
    );
  });