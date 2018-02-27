// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAA91J4yMEH1-WVybJxE41k4nXSk95--f8",
    authDomain: "test-a05c3.firebaseapp.com",
    databaseURL: "https://test-a05c3.firebaseio.com",
    projectId: "test-a05c3",
    storageBucket: "",
    messagingSenderId: "488638001974"
  };
  firebase.initializeApp(config);
  
  // Get a reference to the database service
  var database = firebase.database().ref("employees");
  
	$('#add').click( function(e) {e.preventDefault(); 
      database.set({
	      	user_id: "mustermann50",
		    name: 'Mustermann',
    		age: 40,
	      	joined: "2012-12-12"
  		});
  return false; } );
	
database.orderByChild('name').equalTo('Cimen').on('child_added', function(snapshot) {
    console.log(snapshot.key);
});
  
 var updatedVals = firebase.database().ref('users/');
	updatedVals.on('value', function(snapshot) {
  	console.log('updated values',  snapshot.val())
    $('#data').append(JSON.stringify(snapshot.val()))
});
