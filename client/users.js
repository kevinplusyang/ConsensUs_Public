// Accounts.ui.config({
//     passwordSignupFields: "USERNAME_ONLY"
//   });
// var projAddUser=function(cuserID,userName,proID){

// 	return Projects.update(proID,{$push: {users: {userID:cuserID,username:userName}}});
// };

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
 			// projAddUser(currentUserID,username,proID);
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

var updateWeight = function(proID,userID){
      var weightArray = cellFindCol(1,proID,userID);
      var sum = 0;
      weightArray.forEach(function(cell){
        sum =sum + Number(cell.data);
      });
      cellFindCol(2,proID,userID).forEach(function(cell){
        Cells.update(cell._id,{$set: {data: cellFindOne(cell.row, 1,proID,userID).data/sum}});
      });
      // norWeightArray.forEach(function(cell){
      //   cell.data=Number(cell.data)/sum;
      // });
}
var updateTotal = function(proID,userID){
      var totalArray = cellFindRow(-1,proID,userID);

      totalArray.forEach(function(cell){
        var sum = 0;
        Col=cell.column;
        var scoreCol = cellFindCol(Col,proID,userID);
        scoreCol.forEach(function(cellInside){
          if (Number(cellInside.row)>= 1) {
            sum =sum + Number(cellFindOne(cellInside.row,2,proID,userID).data ) * Number(cellInside.data) ;
          };
        });
        Cells.update(cell._id,{$set: {data: sum}});
     });
}
var initialPageforInv = function(proID,userID){

 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:0,column:3,data:'New York',createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:0,column:4,data:'Hawaii',createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:0,data:'Cost',createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:0,data:'Safety',createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:1,data:3,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:2,data:1,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:3,data:2,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:4,data:3,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:1,data:1,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:2,data:2,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:3,data:3,createdAt: new Date()});
 Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:4,data:1,createdAt: new Date()});

 updateWeight(proID,userID);
 updateTotal(proID,userID);
}

Template.joinProject.events({
    'submit form': function(event){
        event.preventDefault();
        var name = Meteor.user().username;
        console.log(name);
        var currentUser = Meteor.userId();
        var joinproject = $('[name=joinproject]').val();
        $('[name=joinproject]').val('');

        Projects.update({_id:joinproject},{$push: {users: {userId:currentUser,username:name}}});
        initialPageforInv(joinproject,currentUser);

    }
});


