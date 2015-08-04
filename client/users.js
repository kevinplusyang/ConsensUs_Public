// Accounts.ui.config({
//     passwordSignupFields: "USERNAME_ONLY"
//   });
var projAddUser=function(cuserID,userName,proID){

	return Projects.update(proID,{$push: {users: {userID:cuserID,username:userName}}});
};

Template.register.events({
    'submit form': function(){
        event.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            username: username,
            password: password},
            function(err){
        	if(err)
        		console.log(err);
        	else
        	{
        	var proID = "rSHZHEsh6Zs6eDgT9";
        	var currentUserID = Meteor.userId();
        //console.log(Meteor.userId());
        	console.log(currentUserID);
 			projAddUser(currentUserID,username,proID);
        	}
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
        var username = $('#username').val();
        var password = $('#password').val();
        Meteor.loginWithPassword(username, password,function(err){
        	if(err){
        		console.log(err);
        	}
        });
        Router.go('user');
    }
});



