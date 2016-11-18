var config = {
    apiKey: "AIzaSyC7AhLsFDaKIEQy6QrfRtQNvc5kGZ6fdCY",
    authDomain: "workinonit-619c2.firebaseapp.com",
    databaseURL: "https://workinonit-619c2.firebaseio.com",
    storageBucket: "workinonit-619c2.appspot.com",
    messagingSenderId: "753274899558"
};
firebase.initializeApp(config);



firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
    	userId = firebaseUser.uid;
       	console.log(userId);
  

		
		var firebaseHName = firebase.database().ref('Users').child(userId).child('tasks');
		firebaseHName.once('value').then(function(datasnapshot){
			datasnapshot.forEach(function (subSnap){
				var id= subSnap.key;
				console.log(subSnap.key);

				var titulo = subSnap.child('title').val();
				var desc = subSnap.child('description').val();
				var fecha = subSnap.child('date').val();

				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
	


				if(fecha==yyyy+"-"+mm+"-"+dd){
				document.getElementById('list').innerHTML += '<button onclick="myAccFunc('+"'"+id+"'"+')" class="w3-padding-16 w3-hover-dark-grey w3-btn-block w3-left-align">'+titulo+'</button>'
  																+'<div id="'+id+'" class="w3-accordion-content">'
    															+'<div class="w3-container">Description:'+desc+' <br/>'
    															+'</div>'
    															+'</div>'	

    			}
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