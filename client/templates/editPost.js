Template.editPost.rendered = function(){

	var postCategories = this.data.postCategories;
	$('input[type="checkbox"]').each(function(){

		if(postCategories.indexOf($(this).val()) > -1){
			$(this).prop('checked',true);
		}
	});

	Session.set("postId",this.data._id);
};

Template.editPost.helpers({
	categories : function(){
		return Categories.find({});
	},
});

Template.editPost.events({
	"submit #edit-post-form" : function(e){

		e.preventDefault();

		var chosenCategories = [];
		$('input[type="checkbox"]:checked').each(function(){
			chosenCategories.push($(this).val());
		});

		var post = {
			postCategories : chosenCategories,
			postTitle : e.target.editPostTitle.value,
			postContent : unescape(e.target.editPostContent.value)
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
			Meteor.call("updatePost",this._id,post,function(error){
				if(error){
					console.log(error);
				}
			});
		}

		Router.go("/post/"+Session.get("postId"));

	}
});
