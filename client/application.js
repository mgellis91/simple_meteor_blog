
Meteor.subscribe("users",function(){
  if(Meteor.users.find().count() == 0){
    Router.go('/setup');
  }
});

Meteor.subscribe("Categories");
Meteor.subscribe("Comments");
Meteor.subscribe("SocialIcons");
Meteor.subscribe("Settings");
