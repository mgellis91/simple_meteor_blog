Template.layout.rendered = function(){

			var MQL = 1170;
			//primary navigation slide-in effect
			if ($(window).width() > MQL) {
					var headerHeight = $('.navbar-custom').height();
					$(window).on('scroll', {
									previousTop: 0
							},
							function() {
									var currentTop = $(window).scrollTop();
									//check if user is scrolling up
									if (currentTop < this.previousTop) {
											//if scrolling up...
											if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
													$('.navbar-custom').addClass('is-visible');
											} else {
													$('.navbar-custom').removeClass('is-visible is-fixed');
											}
									} else {
											//if scrolling down...
											$('.navbar-custom').removeClass('is-visible');
											if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
									}
									this.previousTop = currentTop;
							});
			}
}

Template.layout.helpers({
	isSinglePost : function(){
		if(Router.current().route.getName() === "singlePost") return true;
		return false;
	},
	socialIcons : function(){
    return SocialIcons.find({}).fetch();
  },
});

Template.layout.events({

	"submit #signin-form": function(e){

		e.preventDefault();

		var user = {
			username : e.target.signinUsername.value,
			password : e.target.signinPassword.value
		}

		if(user.username == "" || user.password == ""){
			throwError("all Feilds Must Be Entered");
			return false;
		}

		Meteor.loginWithPassword(user.username,user.password,function(error){
			if(error){
				throw new Meteor.error("incorrect login credentials");
				throwError("user credentials incorrect");
			}else{
				$("#signin-modal").modal("toggle");
			}

		});
	}

});
