// currently uncertain if I even want this to be a separate file (and if I like this name, etc), of course...

import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
// import { onFilterChange, noSelection, genreOptions } from './utils';
import { noSelection, genreOptions } from './utils';
import './App.css';

// should it be a class??.....

class CreateBand extends Component {

  render() {
    return (
      <Router forceRefresh>
        {/* <div className="App-header"> */}
        <div className="App">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/bands">Bands</Link> &nbsp; <Link to="/venues">Venues</Link></span>
          <h2 className="main">Create a New Band</h2>
          
          {/* // INSERT INTO Bands (name, description, website_url, genre) */}
          {/* ok yeah I also need to look back at the input stuff... */}
          {/* (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) */}
          <form
            // action="" // (?)
            // action="../server/index.js" // ?
            action="/bands" // ?
            method="post"
            // method="get"
          >

            {/* cool, but I might not need it.. */}
            {/* <fieldset> */}
            {/* <legend>legend?</legend> */}

            <label htmlFor="name">Band Name:&nbsp;</label>
            <input 
              id="name"
              name="name"
            //   label="name"
            //   placeholder="name"
            //   value=""
            >
            </input>
            <br />
            <label htmlFor="description">Description:&nbsp;</label>
            <input 
              id="description"
              name="description"
            >
            </input>
            <br />
            <label htmlFor="websiteURL">Website URL:&nbsp;</label>
            <input 
              id="websiteURL"
              name="websiteURL"
            >
            </input>
            <br />
            {/* <label htmlFor="genre">Genre:&nbsp;</label>
            <input 
              id="genre"
            //   name="genre"
            >
            </input> */}

            <label htmlFor="genre">Genre:&nbsp;</label>
            <select 
                name="genre" 
                id="genre" 
                // value={this.state.selectedGenres}             
                // onChange={ event => {            
                // let selectedGenres = onFilterChange(event.target.value, this.state.selectedGenres);              
                // // (currently not sure whether it will ever matter if I have the return)
                // return this.setState({selectedGenres});
                // // FYI, actually this does seem to work too, but I'm thinking I like it less:
                // // this.setState({genreValues: onFilterChange(event.target.value, this.state.genreValues)});
                // }}     
                // multiple
            >
            {/* Genre: rock, country, alternative, hip hop, DJ, orchestra ...idk, look up a list */}
                {/* <option value={noSelection}>--none specified--</option>             */}
                {/* for this one, don't know if I need a key, and also not sure how I want to handle it exactly, as far as importing/standardizing, value vs. text, etc... */}
                <option key={noSelection} value={noSelection}>--none specified--</option>            
                {/* <option value="country">country</option>
                <option value="rock">rock</option>
                <option value="pop">pop</option>
                <option value="variety">variety</option>
                <option value="alternative">alternative</option>
                <option value="hip-hop">hip-hop</option>
                <option value="dj">DJ</option>
                <option value="orchestra">orchestra</option>
                <option value="acoustic">acoustic</option>
                <option value="other">other</option> */}
                {genreOptions.map(genreOption => (
                  <option key={genreOption} value={genreOption}>{genreOption}</option>
                ))}
            </select>

            <br />

            {/* currently these all seem the same, although the text on the third one looks a tad larger */}
            {/* <button>Add this Band</button> */}
            {/* <button type="submit">Add this Band</button> */}
            {/* <input type="submit" value="Add this Band" /> */}
            {/* it looks like submit is the default type anyway, and I'm not sure if it is related in any good or bad way to an onclick handler... */}
            {/* (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) */}
            <button
            //   onClick={fetch(`bands?`)} // , {method: 'POST'})}
            >
              Add this Band
            </button>

            {/* </fieldset> */}
          </form>

        </div>
      </Router>
    )
  }

}

export default CreateBand;

// maybe will need to write onClick for submit button, maybe something like https://www.codecademy.com/practice/projects/quote-api add-quote.js
// but, currently not sure how that would fit in with react router...
// (also want to look at form element stuff for this...)