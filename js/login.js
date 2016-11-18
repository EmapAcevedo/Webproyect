

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7AhLsFDaKIEQy6QrfRtQNvc5kGZ6fdCY",
    authDomain: "workinonit-619c2.firebaseapp.com",
    databaseURL: "https://workinonit-619c2.firebaseio.com",
    storageBucket: "workinonit-619c2.appspot.com",
    messagingSenderId: "753274899558"
  };
  firebase.initializeApp(config);

var name;
var email;
var password;
var password2;
var auth;

//log in
var mail;
var pass;

function login() {
  //Add login event 
    //Get email and password
    mail = document.getElementById('lmail').value;
    pass = document.getElementById('lpsw').value;
    console.log(email);
    console.log(password);
    auth = firebase.auth();

    //Log in
    const promise = auth.signInWithEmailAndPassword(mail, pass);
    promise.catch(e => window.alert(e.message));
}

function signin(){
     auth = firebase.auth();
    name = document.getElementById('uname').value;
    email = document.getElementById('umail').value;
    password = document.getElementById('psw').value;
    password2 = document.getElementById('psw2').value;

    if(password == password2){
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
    }else{
      window.alert("passwords don't match");
    }
}


      //Add a real time listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        const userId = firebaseUser.uid;
        console.log(userId);
          window.location = "dashboard.html";
          firebase.database().ref('Users/'+userId).set({
            username:name ,
            email: email,
            password: password,
            tasks:""
          });

          //window.location = "index.html";

      }
      else{
        console.log('Not Logged in');
      }
    });

