


function initApp1() {
var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef = storageRef.child('images/Tang.png');

firebase.auth().signInAnonymously().then(function() {

  tangRef.getDownloadURL().then(function(url)                             {
    console.log( url);
	
    
  }).catch(function(error) {
    console.error("ttt"+error);
  });
});}
