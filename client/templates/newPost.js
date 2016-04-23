Template.newPost.rendered = function(){
	$("#newPostContent").wysihtml5();
};

Template.newPost.helpers({
	homeSettings : function(){
		return Settings.find({name: "homeSettings"}).fetch()[0];
	},

	categories : function(){
		return Categories.find({});
	},
});

Template.newPost.events({
	"submit #new-post-form" : function(e){
		e.preventDefault();

		var chosenCategories = [];
		$('#categories input[type="checkbox"]').each(function(){
			if(this.checked && $(this).val() != "on"){
				chosenCategories.push($(this).val());
			}
		});

		var post = {
			postAuthor : Meteor.user().profile.authorName,
			postCategories : chosenCategories,
			postTitle : e.target.newPostTitle.value,
			postContent : unescape(e.target.newPostContent.value)
		};

		if(!post.postTitle){
			throwError("A title for the post must be entered");
		}
		
		if(!post.postContent){
			throwError("Content for the post must be entered");
		}

		if(!chosenCategories.length){
			throwError("At least one category must be selected");
		}

		if(!Errors.find({}).count()){
			Meteor.call("createNewPost",post,function(error){
				if(error){
					console.log(error);
				}
			});
			Router.go("/");
		}

	},

	"submit #new-category-form": function(e){
		e.preventDefault();
		var category = e.target.newCategoryName.value;
		if(category === ""){
			alert("category name must be entered");
			return;
		}else{
			Meteor.call("createNewCategory",category);
		}
	},

	"submit #delete-category-form" : function(e){
		e.preventDefault();

		$('#delete-category-form input[type="checkbox"]').each(function(){
			if(this.checked){
				Meteor.call("deleteCategory",$(this).val());
			}
		});
	}

});
