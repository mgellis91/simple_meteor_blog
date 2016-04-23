
Template.setup.events({
	"submit #initial-user": function(e){

		e.preventDefault();

		//create and sigin new user

		var user = {

			username : e.target.username.value,
			email : e.target.email.value,
			password : e.target.password.value,

			profile : {
				authorName : (e.target.authorName.value) ? e.target.authorName.value : e.target.username.value
			}

		}

		if(user.username == "" || user.email == "" || user.password == ""){
			throwError("all Feilds Must Be Entered");
			return false;
		}

		Meteor.call("createNewUser",user,function(error,result){
			if(error){
				throw new Meteor.error("User creation unsuccessful");
			}
		});

		Meteor.loginWithPassword(user.username,user.password,function(error){
			if(error){
				throw new Meteor.error("incorrect login credentials");
			}
		});

		//setup default settings
		var settings = [
			{
				name: "blogSettings",
				blogTitle: "Meteor Blog",
				previewLength: 250,
				previewLimit: 2
			},

			{
				name: "homeSettings",
				headline: "Meteor Blog",
				subHeadline: "Blogging engine built with meteor js"
			},

			{
				name: "aboutSettings",
				headline: "About me",
				subHeadline: "This is what I do",
				aboutInfo: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum molestiae debitis nobis, quod sapiente qui voluptatum, placeat magni repudiandae accusantium fugit quas labore non rerum possimus, corrupti enim modi! Et.</p>"
			},

			{
				name: "contactSettings",
				headline: "Contact me",
				subHeadline: "Have question? I have answers(maybe)",
				contactInfo: "Want to get in touch with me? Fill out the form below to send me a message and I will try to get back to you within 24 hours!"
			}
		];

		for(var i = 0; i < settings.length; i++){
			Meteor.call("addSettings",settings[i]);
		}

		//setup default categories
		var categories = ["design","code","opinions"];
		for(var i = 0; i < categories.length; i++){
			Meteor.call("createNewCategory",categories[i]);
		}

		//setup default SocialIcons
		var socialIcons = [
			{
				site: "facebook",
				link: "#"
			},
			{
				site: "twitter",
				link: "#"
			},
			{
				site: "github",
				link: "#"
			},
			{
				site: "codepen",
				link: "#"
			}
		];

		for(var i = 0; i < socialIcons.length; i++){
			Meteor.call("addSocialIcon",socialIcons[i]);
		}

		Router.go("/");
	}

});
