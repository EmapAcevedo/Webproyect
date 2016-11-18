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
var idTask;
var firebaseRef;
var Xpos;
var Ypos;

const save = document.getElementById('btnSave');


save.addEventListener('click', e =>{
	
	firebaseRef = firebase.database().ref('Users/'+userId).child('tasks');
	title = document.getElementById('uTitle').value;
	description = document.getElementById('uDescription').value;
	date = document.getElementById('uDate').value;

	firebaseRef.push({
		title:title,
		description:description,
		date:date,
		x:70,
		y:70
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
		firebaseHName.once('value').then(function(datasnapshot){
			datasnapshot.forEach(function (subSnap){
				subSnap.key;
				console.log(subSnap.key);

				titulo = subSnap.child('title').val();
				desc = subSnap.child('description').val();
				fecha = subSnap.child('date').val();
				Xpos = subSnap.child('x').val();
				Ypos = subSnap.child('y').val();

				idTask = subSnap.key;

				console.log(titulo);
				console.log(desc);
				console.log(fecha);
		
				document.getElementById('Canvas').innerHTML +=   	'<div class="w3-card-4 w3-container note"id="'+idTask+'"ondblclick="editnote('+"'"+idTask+"'"+
																	')"draggable="true" ondrag="move(this)" style=" position: absolute; left:'+Xpos+'px; top:'+Ypos+'px;" >'
																    +'<h2>'+titulo+'</h2>'
																    +'<ul class="w3-ul w3-margin-bottom note">'
																      +'<li></li>'
																      +'<li>Description:'+desc +' </li>'
																      +'<li>Date:'+fecha+'</li>'
																      +'<li></li>'
																   +' </ul>'
																   +' <button type="button" class="cancelbtn" onclick="deletenote('+"'"+idTask+"'"+')" >Delete</button>'
																  +'</div>';




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


function deletenote(id) {
    
	console.log("entre al delete")
	var parent = document.getElementById("Canvas");
	var child = document.getElementById(id);
	parent.removeChild(child);	

	console.log("child:"+id);
	var firebaseTasks = firebase.database().ref('Users').child(userId).child('tasks').child(id);
	firebaseTasks.remove();
};

function editnote(id){

 console.log(id);
 document.getElementById("id02").style.display="block";
 firebase.database().ref('Users').child(userId).child('tasks').child(id).once('value').then(function(snapshot) {	
 document.getElementById('tTitle').value= snapshot.child('title').val();
 document.getElementById('tDescription').value=snapshot.child('description').val();
 document.getElementById('tDate').value=snapshot.child('date').val();
 document.getElementById("btnEdit").setAttribute("onclick", "editbase('"+id+"')");
 });
};

function editbase(id){
	firebaseRef = firebase.database().ref('Users/'+userId).child('tasks').child(id);
	title = document.getElementById('tTitle').value;
	description = document.getElementById('tDescription').value;
	date = document.getElementById('tDate').value;
	firebaseRef.update({
		title:title,
		description:description,
		date:date
	});

};

var dragX,dragY;

document.addEventListener("dragover", function(e){
    e = e || window.event;
    dragX = e.pageX, dragY = e.pageY;

    console.log("X: "+dragX+" Y: "+dragY);
}, false);

function move(note){

	firebaseRef = firebase.database().ref('Users/'+userId).child('tasks').child(note.getAttribute('id'));
	firebaseRef.update({
		x:dragX,
		y:dragY,
	});
	note.style.left = dragX + "px";
	note.style.top = dragY + "px";




}

