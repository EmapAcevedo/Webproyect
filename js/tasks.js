var config = {
    apiKey: "AIzaSyC7AhLsFDaKIEQy6QrfRtQNvc5kGZ6fdCY",
    authDomain: "workinonit-619c2.firebaseapp.com",
    databaseURL: "https://workinonit-619c2.firebaseio.com",
    storageBucket: "workinonit-619c2.appspot.com",
    messagingSenderId: "753274899558"
};
firebase.initializeApp(config);

var title;
var description;
var date;
var titulo;
var fecha;
var desc;
var noteTitle;
var noteDescription;
var noteDate;
var userId;
var userTask;
var setTasks;
var firebaseRef;

const save = document.getElementById('btnSave');

save.addEventListener('click', e =>{
	
	firebaseRef = firebase.database().ref('Users/'+userId).child('tasks');
	title = document.getElementById('uTitle').value;
	description = document.getElementById('uDescription').value;
	date = document.getElementById('uDate').value;

	firebaseRef.push({
		title:title,
		description:description,
		date:date
	});
	console.log(title);
	console.log(description);
	console.log(date);
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
    	userId = firebaseUser.uid;
       	console.log(userId);
  

		
		var firebaseHName = firebase.database().ref('Users').child(userId).child('tasks');
		firebaseHName.on('value', function(datasnapshot){
			datasnapshot.forEach(function (subSnap){
				subSnap.key;
				console.log(subSnap.key);

				titulo = subSnap.child('title').val();
				desc = subSnap.child('description').val();
				fecha = subSnap.child('date').val();
				console.log(titulo);
				console.log(desc);
				console.log(fecha);

				noteTitle = document.getElementById('noteTitle');
				noteDescription = document.getElementById('noteDescription');
				noteDate = document.getElementById('noteDate');

				noteTitle.innerText = titulo;
				noteDescription.innerText = desc;
				noteDate.innerText = fecha;
				console.log("este es el noteTitle:"+noteTitle.innerText);
			});
			/*noteTitle = document.getElementById('noteTitle');
			noteDescription = document.getElementById('noteDescription');
			noteDate = document.getElementById('noteDate');*/
		});
   	}
	else{
		console.log('Not Logged in');
	}
});