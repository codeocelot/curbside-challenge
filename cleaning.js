var res = require('./traversal_results.js');
// var res = [
//   {secret:'a',history:'0200'},
//   {secret:'b',history:'0001'},
//   {secret:'c',history:'0000'},
//   {secret:'d',history:'0010'},
//   {secret:'e',history:'2000'},
//   {secret:'f',history:'1200'}
//
//
// ]

var sorted = res.sort((a,b)=>{
  a = a.history;
  b = b.history;
  if(a.length !== 4 || b.length !== 4) console.log('err')
  // console.log('comparing',parseInt(a),parseInt(b),parseInt(a) < parseInt(b))
  return parseInt(a,10) - parseInt(b,10);
})

// var sorted = res.sort((a,b)=>{
//   var aVal = a.history.split('');
//   var bVal = b.history.split('');
//   var res;
//   for(var i = 0; i< a.length; i++){
//     if(aVal[i] < bVal[i]) {
//       res = true;
//       break;
//     }
//     else if(aVal[i] > bVal[i])
//     {
//       res = false;
//       break;
//     }
//   }
//   console.log(res);
// });
//
// function areEqual(a,b){
//   return a === b;
// }
//
// console.log(sorted)

// console.log(sorted);
// sorted.forEach((el)=>{console.log(el.history,el.secret)})

console.log(sorted)

sorted.forEach(v=>console.log(v.history,v.secret))
