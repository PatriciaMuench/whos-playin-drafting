// initial plan is to add this file based on create-venue/create-band and edit so it makes sense for an event...

import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { noSelection } from './utils';
import './App.css';

class CreateEvent extends Component {

  state = {
    venueNames: [], // array?
    bandNames: []
  }

  componentWillMount() {
    fetch('/new-event')
    .then(response => response.json())
    .then(response => {
      console.log('response:', response);
      // (I'm sure there are alternative ways to do this..)
      const venueNamesArray = response.venueNames.map(venueNameObject => venueNameObject.venueName);
      const bandNamesArray = response.bandNames.map(bandNameObject => bandNameObject.bandName);
      console.log('bandNamesArray:', bandNamesArray);
      this.setState({venueNames: venueNamesArray, bandNames: bandNamesArray});
      console.log('state:', this.state);
    })
    .catch(error => console.log(error)); // (did I try throw error yet or anything?)
  }

  render() {
    return (
      <Router forceRefresh>
        {/* <div className="App-header"> */}
        <div className="App">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span>
          <h2 className="main">Create a New Event</h2>

          {/* `INSERT INTO Events (venue_name, band_name, datetime_string, notes) VALUES
          ('The Lansdowne', 'BearFight', $lansdowneBearfight1, 'good times'),  */}
          {/* let lansdowneBearfight1 = '2019-08-09 21:00:00';
          let lansdowneDalton1 = new Date(2019, 7, 10, 21).toString(); */}
          <form
            action="/events" // uh oh, idk
            method="post"
          >

            {/* this will prob need some sort of check that the venue exists.... */}
            {/* one option is prob to use a dropdown of the existent venues - so prob need a server endpoint for GET /new-event (or w/e) */}
            <label htmlFor="venueName">Venue Name:&nbsp;</label>
            {/* <input id="venueName" name="venueName"></input>
            <br /> */}
            <select name="venueName" id="venueName">
                <option key={noSelection} value={noSelection}>--none specified--</option>
              {this.state.venueNames.map(venueName => (
                <option key={venueName} value={venueName}>{venueName}</option>
              ))}
            </select>
            <br />

            {/* this will prob need some sort of check that the band exists.... */}
            <label htmlFor="bandName">Band Name:&nbsp;</label>
            {/* <input id="bandName" name="bandName"></input> */}
            <select name="bandName" id="bandName">
                <option key={noSelection} value={noSelection}>--none specified--</option>
              {this.state.bandNames.map(bandName => (
                <option key={bandName} value={bandName}>{bandName}</option>
              ))}
            </select>
            <br />

            {/* not sure if a datepicker is what we want or what... */}
            {/* prob one option is to take in inputs, with validations/instructions (?) */}
            {/* also they could each be dropdowns maybe (?) */}
            {/* I should prob check if there is some default datetime input, as I believe I remember that there are multiple open source plugins or whatever.. */}
            {/* <label htmlFor="datetime"> :&nbsp;</label>
            <input id="datetime" name="datetime"></input>
            <br /> */}
            {/* <label htmlFor="date">Date:&nbsp;</label>
            <input id="date" name="date"></input>
            <br />
            <label htmlFor="time">Time:&nbsp;</label>
            <input id="time" name="time"></input>
            <br /> */}
            <label htmlFor="datetime">Date and Time:&nbsp;</label>
            <input type="datetime-local" id="datetime" name="datetime"></input>
            <br />


            {/* (I'm not even displaying this anyplace yet....) */}
            <label htmlFor="notes">Notes:&nbsp;</label>
            <input id="notes" name="notes"></input>
            <br />

            <button>Add this Event</button>

          </form>

        </div>
      </Router>
    )
  }
}

export default CreateEvent;
