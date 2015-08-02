// Accounts.ui.config({
//     passwordSignupFields: "USERNAME_ONLY"
//   });
Template.register.events({
    'submit form': function(){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            password: password
        });
        Router.go('user');
    }
});
Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    }
});
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(username, password);
        Router.go('user');
    }
});