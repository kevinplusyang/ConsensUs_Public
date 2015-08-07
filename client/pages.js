Meteor.subscribe("cells");
Meteor.subscribe("projects");
Meteor.subscribe("chatroom");
Meteor.subscribe("notes");


var cellFindOne = function(rowNo, columnNo,proID,userID){
      return Cells.findOne({isReport:false,userID: userID, row: rowNo, column:columnNo, projectID:proID});
}
var cellFindCol= function(colNo,proID,userID){
      return Cells.find({isReport:false,userID: userID,column: colNo, projectID:proID},{ sort:{row: 1 }});
}
var cellFindRow= function(rowNo,proID,userID){
      return Cells.find({isReport:false,userID: userID,row: rowNo, projectID:proID},{ sort:{column: 1 }});
}
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
var updateCandidate = function(proID){
    var candiUserCursor=Cells.find({isReport:false,row:0,projectID:proID});

    candiUserCursor.forEach(function(candiUser){
      colNo = candiUser.column;
      if(colNo>2){
        var candiReport = Cells.findOne({isReport:true,row:0,column:colNo,projectID:proID});
        Cells.update(candiUser._id,{$set: {data: candiReport.data}});       
      }
    })
}
var updateFactor = function(proID){
    var facUserCursor=Cells.find({isReport:false,column:0,projectID:proID});

    facUserCursor.forEach(function(facUser){
      rowNo = facUser.row;
      if(rowNo>0){
        var facReport = Cells.findOne({isReport:true,row:rowNo,column:0,projectID:proID});
        Cells.update(facUser._id,{$set: {data: facReport.data}});       
      }

    })

}




//var factorCo=2;
//var candidateCo=2;

// var proID='p4tETnfgHArySKLGJ';

Template.matrix.helpers({
    cell: function (currentProjectt) {
      // updateWeight(this._id,userID);
      // updateTotal(this._id,userID);
      return Cells.find({projectID: currentProjectt});
    },
    // cellthis:function(userID){
    //   return Cells.find({isReport:false,userId:userID,projectID: this._id});
    // },
    cellthis:function(userID,currentProjectt){

      // updateWeight(this._id,userID);
      // updateTotal(this._id,userID);
      return Cells.find({isReport:false,userID:userID,projectID: currentProjectt});
    },

    cellFindRow: function(rowNo,userID,currentProjectt){
      updateWeight(currentProjectt,userID);
      updateTotal(currentProjectt,userID);
      updateCandidate(currentProjectt);
      updateFactor(currentProjectt);
      // console.log("now see this:",currentProjectt);

      //return Cells.find({ row: rowNo },{ sort:{column: 1 }});
      return cellFindRow(rowNo,currentProjectt,userID);
    },
    // cellFindCol: function(colNo){
    //   //return Cells.find({ row: rowNo },{ sort:{column: 1 }});
    //   return cellFindCol(colNo,this._id);
    // },
    rowNum: function(userID,currentProjectt){
      var col0 = cellFindCol(0,currentProjectt,userID);
      
      return col0;
    },
    userToSee: function(userID){
      return Meteor.users.findOne({_id:userID}).username;
    }
    //factorCo: 2,
    //candidateCo:2
  });

Template.matBody.helpers({
    cellFindRow: function(rowNo, projectID,userID){
      // updateWeight(projectID,userID);
      // updateTotal(projectID,userID);
      console.log("here!!");
      console.log(projectID);
      console.log(userID);
      console.log(cellFindRow(rowNo,projectID,userID));
      return cellFindRow(rowNo,projectID,userID);
     }
    // userToSee: function(){
    //   return Meteor.user();
    // }
});


// Template.test.helpers({
//     project: function () {
      
//       return Projects.find();
//     }
//   });

Template.celllist.events({
   'click .delete-cell': function(event) {
 
    event.preventDefault();
    var documentID = this._id;
    Cells.remove({_id: documentID});
    }
  });




Template.adding.events({
    'submit form': function(event){
    event.preventDefault();

    var rno = Number($('[name="rowNo"]').val());
    var cno = Number($('[name="colNo"]').val());
    Cells.insert({
    data: 0,
    row: rno,
    createdAt: new Date(),
    column: cno,
    projectID:"p4tETnfgHArySKLGJ"
    });
  }
});


Template.projectList.events({
  'click .delete-project': function(event) {

   event.preventDefault();
   var documentID = this._id;
   Projects.remove({_id: documentID});
   }
 });


Template.projectList.helpers({
    'project': function(){
        var currentUser = Meteor.userId();
        return Projects.find({"users.userId" : currentUser}, {sort:{createdAt:1}});
    },

    'currentUserrr': function () {
        var currentUser = Meteor.userId();
        return currentUser
    }

});



var initialProject = function(proID,userID){
  // console.log("here");
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:0,column:3,data:'New York',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:0,column:4,data:'Hawaii',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:0,data:'Cost',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:0,data:'Safety',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:1,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:2,data:1,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:3,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:4,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:1,data:1,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:2,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:3,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:4,data:1,createdAt: new Date(),SDdata:0});

    //
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:0,column:3,data:'New York',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:0,column:4,data:'Hawaii',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:0,data:'Cost',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:0,data:'Safety',createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:1,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:2,data:1,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:3,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:4,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:1,data:1,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:2,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:3,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:4,data:1,createdAt: new Date(),SDdata:0});
    //
    

 var showCheckBox=[false,false];
 Session.set({showNotes: showCheckBox});
 updateWeight(proID);
 updateTotal(proID);
}
Template.addProject.events({
    'submit form': function(event){
        event.preventDefault();
        var projectName = $('[name=projectName]').val();
        var currentUser = Meteor.userId();
        var names = Meteor.user().username;
        Projects.insert({
            name : projectName,
            createdby: currentUser,
            columns:2,
            rows:2,
            users:[{userId:currentUser,username:names}],
            createdAt:new Date(),
            sTH:0.5
        }, function(error, result){
          console.log(result);
          initialProject(result,currentUser);
          console.log(result);
          Router.go('project', {_id: result,_uid: currentUser})
        });

        $('[name=projectName]').val('');
    }
});

Template.cellshow.helpers({
    'oi': function(UID, row, column){

        var currentUser = Meteor.userId();

        if(currentUser==UID){

            if(row==-1||column==0||row==0||column==2){
                return false
            }

            return true;
        }else{
            return false;
        }



        return false
    }
});

