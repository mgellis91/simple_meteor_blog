Template.settings.helpers({

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

Template.settings.events({
  "click #settings-container span": function(e){
      e.preventDefault();
      Router.go("/editSettings");
  }
});
