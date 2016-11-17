var config = {
    apiKey: "AIzaSyC7AhLsFDaKIEQy6QrfRtQNvc5kGZ6fdCY",
    authDomain: "workinonit-619c2.firebaseapp.com",
    databaseURL: "https://workinonit-619c2.firebaseio.com",
    storageBucket: "workinonit-619c2.appspot.com",
    messagingSenderId: "753274899558"
};
firebase.initializeApp(config);

var userId;
var hName;
var pEmail;
var userObject;

const logout = document.getElementById('btnLogOut');

logout.addEventListener('click', e => {
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
    	userId = firebaseUser.uid;
       	console.log(userId);
		
		var firebaseHName = firebase.database().ref('Users').child(userId).child("username");
		firebaseHName.on('value', function(datasnapshot){
			hName = document.getElementById('name');

			hName.innerText = datasnapshot.val();
			console.log(hName.innerText);
		});

		var firebaseHName = firebase.database().ref('Users').child(userId).child("email");
		firebaseHName.on('value', function(datasnapshot){
			pEmail = document.getElementById('email');

			pEmail.innerText = datasnapshot.val();
			console.log(pEmail.innerText);
		});

   }
	else{
		console.log('Not Logged in');
	}
});