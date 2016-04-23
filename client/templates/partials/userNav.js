Template.userNav.helpers({
	blogTitle : function(){
		return Settings.find({name: "blogSettings"}).fetch()[0].blogTitle;
	},
	loggedOut : function(){ if(!Meteor.user()) return true; }
});

Template.userNav.events({
	"click #logout" : function(e){

		e.preventDefault();
		Meteor.logout(function(error){
			if(error){
				alert("unable to logout");
			}
		});

	}
});
