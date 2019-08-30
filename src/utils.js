// (I'm not positive this is set up in the right place, etc. but hopefully fine)

// export const onFilterChange = event => {
// maybe I need to look up currying again, or maybe not??
// export const onFilterChange = event => { 
//   return filterArrayName => {  

// const innerFunc = event => { 
// // const innerFunc = (filterArrayName, value) => {     
//     // let value = this.value;
//     //   console.log('genreValues1: ', this.genreValues);
//     //   let value = event.target.value;
//     //   console.log('value: ', value);
//     //   let index = this.genreValues.findIndex(genreName => genreName === value);
//       let index = this.filterArrayName.findIndex(filterOption => filterOption === value);
//     //   console.log('index: ', index);
//     //   let noneSelectedIndex = this.genreValues.findIndex(genreName => genreName === 'no selection');
//       let noneSelectedIndex = this.filterArrayName.findIndex(filterOption => filterOption === 'no selection');
//     //   console.log('noneSelectedIndex: ', noneSelectedIndex);
//       if (this.value === 'no selection') {
//         // this.genreValues = ['no selection'];
//         this.filterArrayName = ['no selection'];    
//         // console.log('genreValues1.5: ', this.genreValues);
//       } else if (index === -1) {
//         if (noneSelectedIndex !== -1) {
//         //   this.genreValues.splice(noneSelectedIndex, 1);
//           this.filterArrayName.splice(noneSelectedIndex, 1);    
//         } 
//         //   this.genreValues.push(value);
//         this.filterArrayName.push(value);    
//         //   console.log('genreValues2: ', this.genreValues);                
//       } else {
//         // this.genreValues.splice(index, 1);
//         this.filterArrayName.splice(index, 1);    
//       //   console.log('genreValues3: ', this.genreValues);                  
//       }
//     //   this.setState({genreValues: this.genreValues});
//       this.setState({filterArrayName: this.filterArrayName});
//     }

// const filterArray = ['no selection'];

// export async function onFilterChange (value, filterArrayName) {
// // export async function onFilterChange (value, filterArrayName) { return async state => {
// // export function onFilterChange (value, filterArray, filterArrayName) {
// // export function onFilterChange (value, filterArray) {
//   const filterArrayNameString = filterArrayName;  
//   console.log('filterArrayName: ', filterArrayName);
//   console.log('type of filterArrayName: ', typeof(filterArrayName));
//   // let filterArray = this.state[filterArrayName];
//   // const filterArray = this.state[filterArrayName];  
//   // const filterArray = this.state[filterArrayNameString]; 
//   // let filterArray = state[filterArrayNameString];     
//   let filterArray = this.state[filterArrayNameString];       
// // this.setState(prevState => {
// //   let filterArray = prevState[filterArrayName];  
//   console.log('filterArray1', filterArray);  
// // export const onFilterChange = event => {     
// //   let value = event.target.value;
// //   let filterArrayName = filterArrayName;
// //   return event => { 
// // //   console.log('genreValues1: ', this.genreValues);
// //   let value = event.target.value;
//   console.log('value: ', value);
// // //   let index = this.genreValues.findIndex(genreName => genreName === value);
// //   let index = this.filterArrayName.findIndex(filterOption => filterOption === value);
//   let index = filterArray.findIndex(filterOption => filterOption === value);
//   console.log('index: ', index);
// // //   let noneSelectedIndex = this.genreValues.findIndex(genreName => genreName === 'no selection');
// //   let noneSelectedIndex = this.filterArrayName.findIndex(filterOption => filterOption === 'no selection');
//   let noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection');
//   console.log('noneSelectedIndex: ', noneSelectedIndex);
//   if (value === 'no selection') {
//     // this.genreValues = ['no selection'];
//     // this.filterArrayName = ['no selection'];   
//     filterArray = ['no selection'];         
//     // filterArray = [value]; 
//     noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection'); // ???
//     console.log('noneSelectedIndex2: ', noneSelectedIndex);
//     // console.log('genreValues1.5: ', this.genreValues);
//     console.log('filterArray2', filterArray);
//     // return this.setState({'filterArrayName': await filterArray}, console.log('stateShouldBeNoSelection: ', this.state[filterArrayName])); // filterArray, or maybe even straight to 'no selection' ???
//     // return this.setState({filterArrayName: ['no selection']}, console.log('stateShouldBeNoSelection: ', this.state.filterArrayName)); // filterArray, or maybe even straight to 'no selection' ???
//   } else if (index === -1) {
//     if (noneSelectedIndex !== -1) {
//     //   this.genreValues.splice(noneSelectedIndex, 1);
//     //   this.filterArrayName.splice(noneSelectedIndex, 1);    
//       filterArray.splice(noneSelectedIndex, 1);        
//     } 
//     //   this.genreValues.push(value);
//     // this.filterArrayName.push(value); 
//     filterArray.push(value);           
//     //   console.log('genreValues2: ', this.genreValues);  
//     console.log('filterArray3', filterArray);              
//   } else {
//     // this.genreValues.splice(index, 1);
//     // this.filterArrayName.splice(index, 1);
//     filterArray.splice(index, 1);            
//   //   console.log('genreValues3: ', this.genreValues); 
//     console.log('filterArray4', filterArray);                 
//   }
// //   this.setState({genreValues: this.genreValues});
// //   this.setState({filterArrayName: this.filterArrayName});
//   console.log('filterArray5: ', filterArray);
// //   return this.setState({filterArrayName: filterArray}, console.log('filterArray6: ', filterArray, 'within state: ', this.state[filterArrayName]));
// let currentFilterArray = filterArray;
// console.log('currentFilterArray1: ', currentFilterArray);
// console.log('type of filterArrayName2: ', typeof(filterArrayName));
// // this may not be logging the updated state of the real component actually....
// // BUT idk why it seems to work with everything but no selection!
// // could it be that state is updated but target value is not???
// // return this.setState({filterArrayName: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state[filterArrayName]));
// // return this.setState({filterArrayName: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state.filterArrayName));
// // this.setState({filterArrayName: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state.filterArrayName));
// // this.setState({state[filterArrayNameString]: currentFilterArray}, console.log('currentFilterArray2: ', currentFilterArray, 'within state: ', this.state.filterArrayName));
// return currentFilterArray;
// // return {filterArrayNameString: currentFilterArray};
// // this.setState({filterArrayName: filterArray}, console.log('filterArray6: ', filterArray, 'within state: ', this.state[filterArrayName]));
// //   return {filterArrayName: filterArray}
// // }, () => console.log('filterArray5: ', filterArray, 'within state: ', this.state[filterArrayName]));
// // })
// // }
// //   innerFunc.call(this);
// }

// here, making a copy of the above function/mess to try to remove most of the b.s.:
// export async function onFilterChange (value, filterArrayName) {
//     // const filterArrayNameString = filterArrayName;  
//     // console.log('filterArrayName: ', filterArrayName);
//     // console.log('type of filterArrayName: ', typeof(filterArrayName)); 
//     // let filterArray = this.state[filterArrayNameString]; 
//     let filterArray = this.state[filterArrayName];    
//     // just curious:
//     // let filterArray = this.state.filterArrayName; // this actually doesn't work (FYI)                               
//     // console.log('filterArray1', filterArray);  
//     // console.log('value: ', value);
//     // let index = filterArray.findIndex(filterOption => filterOption === value);
//     let alreadySelectedIndex = filterArray.findIndex(filterOption => filterOption === value);
//     // console.log('index: ', index);
//     let noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection');
//     // console.log('noneSelectedIndex: ', noneSelectedIndex);
//     if (value === 'no selection') {
//       filterArray = ['no selection'];         
//       // noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection'); // ???
//       // console.log('noneSelectedIndex2: ', noneSelectedIndex);
//       // console.log('filterArray2', filterArray);
//     // } else if (index === -1) {
//     } else if (alreadySelectedIndex === -1) {      
//       if (noneSelectedIndex !== -1) {  
//         filterArray.splice(noneSelectedIndex, 1);        
//       } 
//       filterArray.push(value);           
//       // console.log('filterArray3', filterArray);              
//     } else {
//       // filterArray.splice(index, 1);     
//       filterArray.splice(alreadySelectedIndex, 1);                         
//       // console.log('filterArray4', filterArray);                 
//     }
//     // console.log('filterArray5: ', filterArray);
//   // let currentFilterArray = filterArray;
//   // console.log('currentFilterArray1: ', currentFilterArray);
//   // console.log('type of filterArrayName2: ', typeof(filterArrayName));
//   // return currentFilterArray;
//   return filterArray;
// }

// and again here, making a copy of the above function to try to clean up even more:
// const noSelection = 'no selection';
// // export async function onFilterChange (value, filterArrayName) {
// // export function onFilterChange (value, filterArrayName) {
// export function onFilterChange (value, filterArray) {      
//   // console.log('filterArrayName: ', filterArrayName);
//   // let filterArray = this.state[filterArrayName];                                
//   // console.log('filterArray1', filterArray);  
//   // console.log('value: ', value);
//   let alreadySelectedIndex = filterArray.findIndex(filterOption => filterOption === value);
//   // console.log('index: ', index);
//   // let noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === 'no selection');
//   let noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === noSelection);
//   // console.log('noneSelectedIndex: ', noneSelectedIndex);
//   // if (value === 'no selection') {
//     if (value === noSelection) {
//       // filterArray = ['no selection'];
//       filterArray = [noSelection];                        
//     // console.log('filterArray2', filterArray);
//   } else if (alreadySelectedIndex === -1) {      
//     if (noneSelectedIndex !== -1) {  
//       filterArray.splice(noneSelectedIndex, 1);        
//     } 
//     filterArray.push(value);           
//     // console.log('filterArray3', filterArray);              
//   } else {
//     filterArray.splice(alreadySelectedIndex, 1);                         
//     // console.log('filterArray4', filterArray);                 
//   }
//   // console.log('filterArray5: ', filterArray);
//   return filterArray;
// }


// aaand, again:

/** 
 * constant to minimize string typos
 */
export const noSelection = 'no selection';

/**
 * function to update (and return) the array of selected filters when a user clicks an option
 * (note that clicking a filter that is the only one currently selected, in an attempt to deselect it, does not trigger an onChange event)
 */
// (maybe should change name because it's not the entire function since setState still needs to happen onChange??)
// export function onFilterChange (value, filterArray) {  
export const onFilterChange = (value, filterArray) => {  
  // check if "--none specified--" is currently selected    
  let noneSelectedIndex = filterArray.findIndex(filterOption => filterOption === noSelection);
  // check if the option just clicked is already selected
  let alreadySelectedIndex = filterArray.findIndex(filterOption => filterOption === value);
  // if the user clicked "--none specified--", clear any other filters and make this the only one
  if (value === noSelection) {
    filterArray = [noSelection];   
  // if the user clicked a filter that is not already selected, add it to the array of selected filters, removing "none specified" if needed                     
  } else if (alreadySelectedIndex === -1) {      
    if (noneSelectedIndex !== -1) {  
      filterArray.splice(noneSelectedIndex, 1);        
    } 
    filterArray.push(value);   
  // if the user clicked a filter that is already selected, remove it from the array of selected filters        
  } else {
    filterArray.splice(alreadySelectedIndex, 1);                         
  }
  return filterArray;
}