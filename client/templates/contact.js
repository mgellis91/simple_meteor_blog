Template.contact.helpers({
	contactSettings : function(){
		return Settings.find({name:"contactSettings"}).fetch()[0];
	}
});

Template.contact.events({
	"submit form" : function(e){

		e.preventDefault();

		var submission = {
			name : e.target.name.value,
			email : e.target.email.value,
			message : e.target.message.value
		};

		if(!submission.name || !submission.email || !submission.message){
			throwError("All fields must be entered");
		}

		if(!validateEmail(submission.email)){
			throwError("A valid email must be entered");
		}

		//validate email
		function validateEmail(email) {
	    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    return re.test(email);
		}

	}
});
