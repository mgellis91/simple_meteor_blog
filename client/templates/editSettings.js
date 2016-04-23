
Template.editSettings.helpers({

  //Account Info
  username : function(){
    return Meteor.user().username;
  },

  authorName : function(){
    return Meteor.user().profile.authorName;
  },

  //Blog Info
  blogSettings : function(){
    return Settings.find({name:"blogSettings"}).fetch()[0];
  },

  //Headlines
  homeSettings : function(){
    return Settings.find({name:"homeSettings"}).fetch()[0];
  },
  aboutSettings : function(){
    return Settings.find({name:"aboutSettings"}).fetch()[0];
  },

  contactSettings : function(){
    return Settings.find({name:"contactSettings"}).fetch()[0];
  },

  //Social Links
  socialIcons : function(){
    return SocialIcons.find({}).fetch();
  },

  //Contact info
  email : function(){
    return Meteor.user().emails[0].address;
  }
});


Handlebars.registerHelper('siteSelection', function(site){

  var socialMediaSites = ["facebook","twitter","github","codepen"];
  var select = "<select>";

  for(var i = 0; i < socialMediaSites.length; i++){
    select += '<option value="' + socialMediaSites[i] + '"';

    if(site == socialMediaSites[i]){
      select += 'class="selected" selected';
    }

    select += '>'+ socialMediaSites[i]+ '</option>';
  }

  select += "</select>"
  return select;
});


Template.editSettings.events({

  "click #newSocialLink": function(e){

    var socialIcon = {
      site: "facebook",
      link: "#"
    };

    Meteor.call("addSocialIcon",socialIcon);
  },

  "submit #editSettings": function(e){

    e.preventDefault();

    //Update Account Settings

    //console.log($(usernameSetting).val());
    //console.log($(authorNameSetting).val());

    //Update Blog Settings
    var blogSettings = {

    };

    //Update Home Settings
    var homeSettings = {

    };

    //Update About Settings
    var aboutSettings = {

    };

    //Update Contact Settings
    var contactSettings = {

    };

    //Update Social Icons
    $(".socialInfo").each(function(){

      var socialIconLink = {
        site : $(this).find("select").val(),
        link : $(this).find(".socialLink").val(),
        id : $(this).find("span").attr("id")
      }

      Meteor.call("updateSocialIcon",socialIconLink);

    });

    Router.go("/settings");
  },

  "click .deleteSocialLink": function(e){
    e.preventDefault();
    Meteor.call("removeSocialIcon",this._id);
  }

});
