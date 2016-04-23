
Template.blogList.rendered = function(){

	var previewLength = this.data.previewLength;
	var previewLimit = this.data.previewLimit;

	$(".post-content").each(function(){

		console.log(previewLength);
		console.log(previewLimit);
		
		var postContent = $(this).html();

		if(postContent.length > previewLength) {

			var previewContent = postContent.substr(0,previewLength);
			$(this).html(previewContent + '...');
		}

	});

	$(".post-preview").slice(0,previewLimit).show();

	if(Posts.find({}).count() <= previewLimit){
		$("#older-posts").hide();
	}else{
		$("#older-posts").on("click",function(e){
			e.preventDefault();
			$(".post-preview:hidden").slice(0,previewLimit).slideDown();
			if( $(".post-preview:hidden").length == 0 ){
				$("#older-posts").fadeOut("slow");
			}
		});
	}
}

Template.blogList.helpers({

	homeHeadlines : function(){
		return Settings.find({name: "homeSettings"}).fetch()[0];
	},

	posts : function(){
		return Posts.find({});
	},

	noPosts : function(){
		if(Posts.find({}).count()){
			return false;
		}
		return true;
	},

	formattedDate : function(){
		var monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
		var dateString = monthNames[this.creationDate.getMonth()] + " " + this.creationDate.getDate() + " " + this.creationDate.getFullYear();
		return dateString;
	},
	commentsCount : function(){
		return Comments.find({postId:this._id}).count();
	}

});
