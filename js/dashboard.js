var config = {
    apiKey: "AIzaSyC7AhLsFDaKIEQy6QrfRtQNvc5kGZ6fdCY",
    authDomain: "workinonit-619c2.firebaseapp.com",
    databaseURL: "https://workinonit-619c2.firebaseio.com",
    storageBucket: "workinonit-619c2.appspot.com",
    messagingSenderId: "753274899558"
  };
  firebase.initializeApp(config);

function loadtasks(){
console.log("tasks");
var username;
firebase.database().ref('/Users/pc8lV7QConPxgpenEkfFEo60hAE3').once('value').then(function(snapshot) {
  var username = snapshot.val().username;
  // ...
});

console.log(username);


	
}