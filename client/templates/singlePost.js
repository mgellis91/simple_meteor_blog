Template.singlePost.helpers({
  comments : function(){
    return Comments.find({postId : this._id},{sort: {creationDate: -1}});
  },
  formattedDate : function(){
		var monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
		var dateString = monthNames[this.creationDate.getMonth()] + " " + this.creationDate.getDate() + " " + this.creationDate.getFullYear();
		return dateString;
	},
  commentsCount : function(){
    return Comments.find({postId : this._id}).count();
  }
});
Template.singlePost.events({
    "submit #comment-form" : function(e){
      e.preventDefault();

      var commentName = e.target.newCommentName.value,
          commentContent = e.target.newCommentContent.value;

      if(!commentName){
        commentName = "Anonymous";
      }

      var comment = {
        name : commentName,
        content : commentContent,
        postId : this._id,
      }

      if(comment.content){
        Meteor.call("createNewComment",comment,function(error){
          if(error){
            console.log("error");
          }
        });
      }else{
        throwError("comment field cannot be left blank");
      }

    }
});
