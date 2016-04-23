Template.about.helpers({
	aboutSettings : function(){
		return Settings.find({name: "aboutSettings"}).fetch()[0];
	}
});
