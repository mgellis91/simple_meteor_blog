Router.configure({
	layoutTemplate: "layout",
});

Router.map(function(){

	this.route("setup",{
		path: "/setup",
		layoutTemplate: null,
		onBeforeAction: function () {

			if(Meteor.users.find().count() > 0){
				Router.go("/");
			}else{
				this.next();
			}
		}
	});

	this.route("blogList",{
		path: "/",
		data : function(){
			return Settings.findOne({name:"blogSettings"});
		},
		waitOn : function(){
			return Meteor.subscribe("Posts");
		}
	});

	this.route("singlePost",{
		template : "singlePost",
		path: "/post/:_id",
		data : function(){
			return Posts.findOne({_id: this.params._id});
		},
		waitOn : function(){
			return Meteor.subscribe("Posts",this.params._id);
		},
	});

	this.route("newPost",{
		path: "/newPost",
	});

	this.route("about",{
		path: "/about",
	});

	this.route("editAbout",{
		path: "/editAbout",
		data: function(){
			return Settings.findOne({name: "aboutSettings"});
		}
	});

	this.route("contact",{
		path: "/contact"
	});

	this.route("settings",{
		path: "/settings"
	});

	this.route("editSettings",{
		path: "/editSettings"
	});

	this.route("editPost",{
		path: "/editPost/:_id",
		data : function(){
			return Posts.findOne({_id: this.params._id});
		},
		waitOn : function(){
			return Meteor.subscribe("Posts",this.params._id);
		},
	});

});
