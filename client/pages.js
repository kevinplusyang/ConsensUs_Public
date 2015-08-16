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
        var val=cellFindOne(cell.row, 1,proID,userID).data/sum;

      //   var nWCell=Cells.findOne({//normalized weight cell
      //   projectID:proID,
      //   row:cell.row,
      //   column:1,
      //   isReport:false,
      //   userID:userID
      // });
     // console.log(this);
     Cells.update(cell._id,{$set: {data: val.toFixed(3) }});
       // slider.val(val.toFixed(3));
      });
      var slider=$(".sliderrr");//$( ".noUi-origin" );
        //console.log(slider[0].val());
        //console.log(slider);
      //  console.log(slider[0].vGet());
      slider.each(function(){
        //console.log($(this).css("left"));
       // console.log("fsf:",$(this).val());
        //console.log('dfdsds:',$(this)[0]);

      })
      // norWeightArray.forEach(function(cell){
      //   cell.data=Number(cell.data)/sum;
      // });
      
      // console.log("@@@@@@");
      // console.log(slider);
      //slider.val(val.toFixed(3));
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
        Cells.update(cell._id,{$set: {data: sum.toFixed(3)}});
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
var showCheckBox=[false,false];
Session.setDefault({showNotes: showCheckBox});
Template.matBody.helpers({
    cellFindRow: function(rowNo, projectID,userID){
      // updateWeight(projectID,userID);
      // updateTotal(projectID,userID);
      // console.log("here!!");
      // console.log(projectID);
      // console.log(userID);
      // console.log(cellFindRow(rowNo,projectID,userID));
      return cellFindRow(rowNo,projectID,userID);
     },
     showNotes: function(row){
      // var rowNo=this.row;
    //   console.log("@@@@@@@");
    // console.log(Session.get('showNotes')[row-1]);
    return Session.get('showNotes')[row-1];
      // return true;
    }
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
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:1,data:0.75,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:2,data:1,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:3,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:1,column:4,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: null,isReport : true ,projectID:proID,row:2,column:1,data:0.25,createdAt: new Date(),SDdata:0});
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
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:1,data:0.75,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:2,data:1,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:3,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:1,column:4,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:1,data:0.25,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:2,data:2,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:3,data:3,createdAt: new Date(),SDdata:0});
    Cells.insert({userID: userID, isReport : false ,projectID:proID,row:2,column:4,data:1,createdAt: new Date(),SDdata:0});
    //
    

 var showCheckBox=[false,false];
 Session.set({showNotes: showCheckBox});
 Session.set({showSD: false});

    //
    Notes.insert({isAdd:true,row:1,column:1,projectID:proID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});
    Notes.insert({isAdd:true,row:1,column:3,projectID:proID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});
    Notes.insert({isAdd:true,row:1,column:4,projectID:proID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});
    Notes.insert({isAdd:true,row:2,column:1,projectID:proID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});
    Notes.insert({isAdd:true,row:2,column:3,projectID:proID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});
    Notes.insert({isAdd:true,row:2,column:4,projectID:proID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});


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

// Template.cellshow.onRendered (function () {
//   // ...
//   // console.log("fsfsf:",this.$(".slider"));
//   var id=this.data._id;
//   var thiscell=this.data;
//   //console.log(thiscell);
//   //console.log(thiscell.data);

//   var nWCell=Cells.findOne({//normalized weight cell
//     projectID:thiscell.projectID,
//     row:thiscell.row,
//     column:1,
//     isReport:false,
//     userID:thiscell.userID
//   });
//   var slider=this.$(".sliderrr");

//   slider.noUiSlider({
//     start: thiscell.data,//nWCell.data,
//     connect:'lower',
//     range:{
//       'min':0,
//       'max':1
//     }
//   }).on('slide', function (ev, val) {
//     //   // set real values on 'slide' event
//   Cells.update({_id:nWCell._id}, {$set:{data:val}});
  
//   }).on('change',function(ev,val){
//     Cells.update({_id:nWCell._id}, {$set: {data: val}});
//   })
//   // .on('update',function(ev,val){
//   //   slider.val(nWCell.data);
//   //   console.log("adshfdh");

//   // })
// });
var updateSliders=function(id){
  //SSconsole.log('@@@@,');
  var thiscell = Cells.findOne({_id:id});
  var slider=$( ".noUi-origin" );//$(".sliderrr");
       //console.log(slider);
       //console.log(slider.val());
        //console.log(slider[0].val());
       // console.log(slider.val());
      //  console.log(slider[0].vGet());
      slider.each(function(index){
          var cell=Cells.findOne({
            projectID:thiscell.projectID,
            row:index+1,
            column:2,
            isReport:false,
            userID:thiscell.userID
          });
          var value=cell.data*100;

          $(this).css("left",value.toString()+"%");
      
       //console.log("fsf:",$(this).val());
       //console.log("fsfdddd:",this);
        //console.log('dfdsds:',$(this)[0]);

      })
};
Template.sliderCell.onRendered (function () {
  // ...
  // console.log("fsfsf:",this.$(".slider"));
  var id=this._id;
  var thiscell=this.data;
  //console.log(thiscell);
  //console.log(thiscell.data);

  var WCell=Cells.findOne({//normalized weight cell
    projectID:thiscell.projectID,
    row:thiscell.row,
    column:1,
    isReport:false,
    userID:thiscell.userID
  });
   var slider=this.$(".sliderrr");


  slider.noUiSlider({
    start: thiscell.data,//nWCell.data,
    connect:'lower',
    range:{
      'min':0,
      'max':1
    }
  }).on('slide', function (ev, val) {
    //   // set real values on 'slide' event
    Cells.update({_id:WCell._id}, {$set:{data:val}});
    updateSliders(WCell._id);
  
  }).on('change',function(ev,val){
    Cells.update({_id:WCell._id}, {$set: {data: val}});

  })

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
    },
    isFactor: function(){
      var flag = (this.column === 0);
      return flag;
    },
    showNotes: function(row){
      // var rowNo=this.row;
    // console.log(Session.get('showNotes'));
    return Session.get('showNotes')[row-1];
      // return true;
    },
    type:function(){
      if(this.row ===0){
        return 'row0';
      // }else if(this.row===-1)
      // {
      //   return 'head';
      }else if(this.row===-1)
      {
        return 'rowScore';
      }else if(this.column===0){
        return 'show col0'
      }else if(this.column===1){
        return 'show col1'
      }else
      {
        return 'show';
      }
    },
    notWeight:function(){
      if(this.column===2){
       // console.log("sfsffs:",this.column);
        return false;
      }else{
        return true;
      }


    }
});




Template.cellshow.events({
  "change .show-notes input": function (event) {
      var rowNo=Number(this.row);

      // console.log(Session.get('showNotes'))
      var getShowNotes = Session.get('showNotes');
      var newSN = getShowNotes;
      newSN[rowNo-1] = event.target.checked;
      // console.log(newSN);
      Session.set({showNotes: newSN});

    }

  });


Template.matrix.events({
  "click .scale": function (event) {
      event.preventDefault();
      var slider=$(".sliderrr");
      console.log(slider.val());

    }

  });





