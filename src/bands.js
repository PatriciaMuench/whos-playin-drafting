import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from './android-chrome-512x512-copy.png';
import { onFilterChange } from './utils';
import './App.css';

// const onFilterChange = require('./utils');

class Bands extends Component {

  // maybe break state up into more specific pieces?
  state = {
    eventInfo: [],
    genreValues: ['no selection'] // [] // ''
  }

  // (I wonder how componentDidMount actually compares to componentWillMount, etc.?)
  componentWillMount() {
    fetch(`/bands`)
      .then(response => response.json())
      .then(response => {
        console.log(`response: \n`, response);
        // this.setState({
        //   // bands: response[0],
        //   // venues: response[1],
        //   // events: response[2]
        //   bands: response.bands,
        //   venues: response.venues,
        //   events: response.events
        // }, () => {
        this.setState({
          eventInfo: response
        }, () => {
        console.log('state, within componentWillMount: \n', this.state);
      })})
      .catch(error => console.log(error));
  }

  // onFilterChange = onFilterChange;
  // onFilterChange = require('./utils').onFilterChange;
  // onFilterChange = require('./utils').onFilterChange();   
  // onFilterChange2 = onFilterChange.bind(this);     

  // genreValues = ['no selection'];

  render() {
    return(
      // note: I don't know if forceRefresh is desirable here, but I also don't know why things weren't rerendering on link clicks
      <Router forceRefresh>
        <div className="App-header">
          <span><img src={logo} alt="logo" className="logo" height="70" width="70" /><Link to="/"><big>Who's Playin'</big></Link> &nbsp; <Link to="/venues">Venues</Link></span> 
          <h2 className="main">Bands</h2>

          <label htmlFor="genre"><small>Genre:</small></label>
          <select 
            name="genre" 
            id="genre" 
            value={this.state.genreValues} 
            // maybe pull this function into a utils file?
            // onChange={(event) => {
            //   console.log('genreValues1: ', this.genreValues);
            //   let value = event.target.value;
            //   console.log('value: ', value);
            //   let index = this.genreValues.findIndex(genreName => genreName === value);
            //   console.log('index: ', index);
            //   let noneSelectedIndex = this.genreValues.findIndex(genreName => genreName === 'no selection');
            //   console.log('noneSelectedIndex: ', noneSelectedIndex);
            //   if (value === 'no selection') {
            //     this.genreValues = ['no selection'];
            //     console.log('genreValues1.5: ', this.genreValues);
            //   }
            //   else if (index === -1) {
            //     if (noneSelectedIndex !== -1) {
            //       this.genreValues.splice(noneSelectedIndex, 1);
            //     } 
            //     this.genreValues.push(value);
            //     console.log('genreValues2: ', this.genreValues);                
            //   } else {
            //     this.genreValues.splice(index, 1);
            //     console.log('genreValues3: ', this.genreValues);                  
            //   }
            //   this.setState({genreValues: this.genreValues});
            // }} 
            // onChange={event => onFilterChange.call(this, event.target.value, 'genreValues')}            
            // onChange={event => {
            //   console.log('state1: ', this.state.genreValues);
            //   onFilterChange.call(this, event.target.value, 'genreValues');
            //   console.log('state2: ', this.state.genreValues);
            // }}  
            onChange={async event => {
              console.log('state1: ', this.state.genreValues);
              let attemptedGenreValues = await onFilterChange.call(this, event.target.value, 'genreValues');
              console.log('attemptedGenreValues: ', attemptedGenreValues);
              this.setState({genreValues: attemptedGenreValues});
              // this.setState(onFilterChange.call(this, event.target.value, 'genreValues'));
              // this.setState({genreValues: [onFilterChange.call(this, event.target.value, 'genreValues')]});
              console.log('state2: ', this.state.genreValues);
            }}          
            // onChange={event => onFilterChange.call(this, event.target.value, this.state.genreValues, 'genreValues')}
            // onChange={event => onFilterChange.call(this, event.target.value, this.state.genreValues)}            
            // onChange={event => this.onFilterChange2(event.target.value, 'genreValues')}            
            multiple
          >          
            <option value="no selection">--none specified--</option>
            <option value="country">country</option>
            <option value="rock">rock</option>
            {/* <option></option> */}
          </select>
          <br/>

          {/* <label htmlFor="genre-list"><small>Genre:</small></label> */}
          {/* <input list="genre-list" /> */}
          {/* <input list="genre-list" multiple />           */}
          {/* <datalist name="genre-list" id="genre-list">           */}
            {/* <option value="">--Select a genre--</option>
            <option value="">none</option>
            <option value="">any/all</option> */}
            {/* <option value="country">country</option> */}
            {/* <option value="rock"></option> */}
          {/* </datalist> */}
          {/* <br/>  */}

          {/* (this one isn't even right yet..) */}
          {/* <label htmlFor="genre-check"><small>Genre:</small></label> */}
          {/* <input type="checkbox" name="genre-check" id="genre-check" /> */}
          {/* <input type="checkbox" multiple />           */}
            {/* <option value="">--Select a genre--</option>
            <option value="">none</option>
            <option value="">any/all</option> */}
            {/* <option value="country">country</option> */}
            {/* <option value="rock"></option> */}
          {/* <br/>  */}

          <table>
            <tbody>
              {this.state.eventInfo && this.state.eventInfo.map((event, i) => (              
                // to do: use id for key instead of index ?
                // link using id instead of name / how to link using name ?
                // also, I am actually not sure how much info should be on this page besides the list of bands? (well, obv..)
                (this.state.genreValues.includes('no selection') || this.state.genreValues.includes(event.band_genre)) && (
                <tr key={i}>
                  <td className="main"><big><Link to={`/bands/${event.band_name}`} className="main">{event.band_name}</Link></big> <br /> <span className="description">{event.band_description}</span></td>                
                  {/* <td className="main"><small>{event.band_description}</small></td> */}
                  {event.event_date !== 'none' &&
                    <Fragment>
                      <td><small><Link to={`/venues/${event.venue_name}`}>{event.venue_name}</Link></small> <br /> <span className="description">{event.venue_description}</span></td> 
                      <td><small>{event.event_date}</small></td>      
                      <td><small>{event.event_time}</small></td>       
                    </Fragment>       
                  }                                                        
                </tr>
                ) 
              ))}
            </tbody>
          </table>

        </div>
      </Router>
    );
  }
}

export default Bands;


// a few examples/notes on <select> elements:

// (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)

// <label for="pet-select">Choose a pet:</label>
// <select id="pet-select">
//     <option value="">--Please choose an option--</option>
//     <option value="dog">Dog</option>
//     <option value="cat">Cat</option>
//     <option value="hamster">Hamster</option>
//     <option value="parrot">Parrot</option>
//     <option value="spider">Spider</option>
//     <option value="goldfish">Goldfish</option>
// </select>

// <!-- The second value will be selected initially -->
// <select name="choice">
//   <option value="first">First Value</option>
//   <option value="second" selected>Second Value</option>
//   <option value="third">Third Value</option>
// </select>

// <label>Please choose one or more pets:
//   <select name="pets" multiple size="4">
//     <optgroup label="4-legged pets">
//       <option value="dog">Dog</option>
//       <option value="cat">Cat</option>
//       <option value="hamster" disabled>Hamster</option>
//     </optgroup>
//     <optgroup label="Flying pets">
//       <option value="parrot">Parrot</option>
//       <option value="macaw">Macaw</option>
//       <option value="albatross">Albatross</option>
//     </optgroup>
//   </select>
// </label>

// (https://www.w3schools.com/html/html_form_elements.asp and https://www.w3schools.com/tags/tag_select.asp might also be helpful..)
// https://www.w3schools.com/tags/tag_input.asp, https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

// maybe try datalist, or input type=checkbox (w/ multiple), or input w/ list (and w/ multiple, and label plus placeholder..?) ?
// (actually I think it's that input w/ list goes with datalist..)

// ok idk checkboxes might be kindof annoying... (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)

// (so far, didn't fully explore checkboxes and datalists, but I guess I got the multi select essentially working...)
// (also, I didn't much look into using a library/plugin or whatever, such as maybe https://www.syncfusion.com/javascript-ui-controls/js-multiselect-dropdown or https://www.jqueryscript.net/blog/Best-Multiple-Select-jQuery-Plugins.html)