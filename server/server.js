Meteor.startup(function(){

	Meteor.publish("users",function(){
		return Meteor.users.find({});
	});

	Meteor.publish("Posts",function(){
		return Posts.find({},{sort: {creationDate: -1}});
	});

	Meteor.publish("Categories",function(){
		return Categories.find({});
	});

	Meteor.publish("Comments",function(){
		return Comments.find({});
	});

	Meteor.publish("SocialIcons",function(){
		return SocialIcons.find({});
	});

	Meteor.publish("Settings",function(){
		return Settings.find({});
	});
});

Meteor.methods({

	createNewUser : function(userData){
		return Accounts.createUser({
			username : userData.username,
			email : userData.email,
			password : userData.password,
			profile : {
				authorName : userData.profile.authorName
			}
		});
	},

	createNewPost : function(postData){
		return Posts.insert({
			postAuthor : postData.postAuthor,
			postCategories : postData.postCategories,
			postTitle : postData.postTitle,
			postContent : postData.postContent,
			creationDate : new Date(),
		});
	},

	updatePost : function(id,postData){
		return Posts.update(id,{$set: {
			postCategories : postData.postCategories,
			postTitle : postData.postTitle,
			postContent : postData.postContent }
		});
	},

	createNewCategory : function(category){
		return Categories.insert({
			category : category,
		});
	},

	deleteCategory : function(category){
			return Categories.remove({
				category : category
			});
	},

	createNewComment : function(comment){
		return Comments.insert({
			name : comment.name,
			content : comment.content,
			postId : comment.postId,
			creationDate : new Date(),
		});
	},

	addSettings : function(settings){
		return Settings.insert(settings);
	},

	editSettings : function(page,settingName,setting){
		var set = {};
		var sName = settingName;
		set[sName] = setting;
		return Settings.update({name: page },
			{$set : set }
		);
	},

	addSocialIcon : function(socialIcon){
		return SocialIcons.insert({
			site : socialIcon.site,
			link : socialIcon.link
		});
	},

	updateSocialIcon : function(socialIcon){
		return SocialIcons.update(
			socialIcon.id,{$set: {
				site: socialIcon.site,
				link: socialIcon.link }
			});
	},

	/*========================
			Collection Resets
	========================*/

	removeSocialIcon : function(id){
		return SocialIcons.remove(id);
	},

	clearUsers : function(){
		return Meteor.users.remove({});
	},

	clearPosts : function(){
		return Posts.remove({});
	},

	clearSocialIcons: function(){
		return SocialIcons.remove({});
	},

	clearComments : function(){
		return Posts.remove({});
	},

	clearCategories : function(){
		return Categories.remove({});
	},
});

function getFormattedDate(){
	var d = new Date(),
			day = d.getDate(),
			month = d.getMonth(),
			year = d.getFullYear();

	return day + " . " + month + " . " + year;
}
