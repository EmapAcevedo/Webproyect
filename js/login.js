
  	// Initialize Firebase
 var config = {
    apiKey: "AIzaSyC7AhLsFDaKIEQy6QrfRtQNvc5kGZ6fdCY",
    authDomain: "workinonit-619c2.firebaseapp.com",
    databaseURL: "https://workinonit-619c2.firebaseio.com",
    storageBucket: "workinonit-619c2.appspot.com",
    messagingSenderId: "753274899558"
  };
  firebase.initializeApp(config);
	
  var signup = function(email,password,name){
	console.log(name);
	console.log(email);
	console.log(password);
	var flag;
  firebase.auth().createUserWithEmailAndPassword(""+email,""+password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  //
  alert(errorMessage);
  flag=true;


});

if(flag!=true){
firebase.auth().onAuthStateChanged(function(bleh) {
 if(email===bleh.email){
 var user = bleh;   //firebase.auth().currentUser;
 console.log(user);
}
	var uid;
	flag=true;
if (user != null) {
  uid = user.uid;
    firebase.database().ref('Users/' + uid).set({
    username:name ,
    email: email,
    password: password,
    tasks:{
   		task0:""
    }

  }); 
    firebase.database().ref('Users/' + uid).on('child_added', function(data) {
  		indow.open('dashboard.html','_blank');

});

   } else {
    // No user is signed in.
  }
});
}

};	
function signargs() {
 var name = document.getElementById("uname").value;		
 var email = document.getElementById("umail").value;
 var password= document.getElementById("psw").value;
 var confirm= document.getElementById("psw2").value;

if(password===confirm){
signup(email,password,name);
}
else{
alert("Passwords not match");
}

}

function logargs() {
 	
 var email = document.getElementById("lmail").value;
 var password= document.getElementById("lpsw").value;
 console.log(email);
 console.log(password);
 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  alert(errorMessage);

});

firebase.auth().onAuthStateChanged(firebaseUser =>{
	if(email==firebaseUser.email){
	if(firebaseUser){
	alert("Logged in");
	window.open('dashboard.html','_blank');
	}
	else{
	alert("notlogin");
	}
	}
  // ...
});
}


/*
*/

