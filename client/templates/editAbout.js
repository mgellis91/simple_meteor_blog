Template.editAbout.rendered = function(){
	$("#editAboutContent").wysihtml5();
};

Template.editAbout.events({
	"submit #edit-about-form" : function(e){
		e.preventDefault();

		var aboutInfo = $("#editAboutContent").val();
		Meteor.call("editSettings","aboutSettings","aboutInfo",aboutInfo);
		Router.go("/about");
	}
});
