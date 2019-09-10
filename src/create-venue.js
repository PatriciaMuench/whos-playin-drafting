// initial plan is just to add this file based on create-band.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { noSelection, venueTypeOptions, venueSizeOptions } from './utils';
import './App.css';

class CreateVenue extends Component {

  render() {
    return (
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span>
          <h2 className="main">Create a New Venue</h2>

          {/* `INSERT INTO Venues (name, city, state, description, website_url, type, size) VALUES
          ('The Lansdowne', 'Boston', 'MA', 'bar', 'lansdowne.com', 'bar', 'medium'),  */}
          <form
            action="/venues"
            method="post"
          >

            <label htmlFor="name">Venue Name:&nbsp;</label>
            <input id="name" name="name"></input>
            <br />

            <label htmlFor="city">City:&nbsp;</label>
            <input id="city" name="city"></input>
            <br />

            <label htmlFor="state">State:&nbsp;</label>
            <input id="state" name="state"></input>
            <br />

            <label htmlFor="description">Description:&nbsp;</label>
            <input id="description" name="description"></input>
            <br />

            <label htmlFor="websiteURL">Website URL:&nbsp;</label>
            <input id="websiteURL" name="websiteURL"></input>
            <br />

            <label htmlFor="type">Venue Type:&nbsp;</label>
            <select name="type" id="type">
                <option key={noSelection} value={noSelection}>--none specified--</option>
              {venueTypeOptions.map(typeOption => (
                <option key={typeOption} value={typeOption}>{typeOption}</option>
              ))}
            </select>
            <br />

            <label htmlFor="size">Size:&nbsp;</label>
            <select name="size" id="size">
                <option key={noSelection} value={noSelection}>--none specified--</option>
              {venueSizeOptions.map(sizeOption => (
                <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
              ))}
            </select>
            <br />

            <button>Add this Venue</button>

          </form>

        </div>
      </Router>
    )
  }
}

export default CreateVenue;
