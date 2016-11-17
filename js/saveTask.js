function createTask(){
	var user = firebase.auth().currentUser;

	if(user){
		firebase.database().ref('Users/' + user.uid).child('Tasks');
		console.log(tasks);
	}

}