var cellFindOne = function(rowNo, columnNo,proID){
      return Cells.findOne({isReport: true,row: rowNo, column:columnNo, projectID:proID});
}
var cellFindCol= function(colNo,proID){
      return Cells.find({isReport: true,column: colNo, projectID:proID},{ sort:{row: 1 }});
}
var cellFindRow= function(rowNo,proID){
      return Cells.find({isReport: true,row: rowNo, projectID:proID},{ sort:{column: 1 }});
}
var calculateOne = function(rowNo, columnNo,proID){
    var cellUserCursor=Cells.find({isReport:false,row: rowNo, column:columnNo, projectID:proID});
    var sum = 0;
    var count = cellUserCursor.count();
    cellUserCursor.forEach(function(cellUser){
      sum = sum + Number(cellUser.data);
      // console.log("each :",cellUser.data)
    });
    
    var aver = sum/count;
    // console.log("aver:" ,aver);
    return aver;
}
var updateRow = function(proID,rowNo){
    // console.log("here!");
    var rowCursor = cellFindRow(rowNo,proID);
    // console.log(rowCursor.fetch());
    // console.log(rowNo,proID);

    rowCursor.forEach(function(cell){
      // console.log(cell.column);
      if(rowNo>0){
          if(cell.column>0){
          var aver = calculateOne(rowNo,cell.column,proID);
          Cells.update(cell._id,{$set: {data: aver}});
        }
      }else if(rowNo===-1){
          if(cell.column>1){
          var aver = calculateOne(rowNo,cell.column,proID);
          Cells.update(cell._id,{$set: {data: aver}});
        }
      }
    })
}




var calculateSD = function(rowNo, columnNo,proID){
    var cellUserCursor=Cells.find({isReport:false,row: rowNo, column:columnNo, projectID:proID});
    var tempSum = 0;
    var sum = 0;
    var count = cellUserCursor.count();

    cellUserCursor.forEach(function(cellUser){
        tempSum = tempSum + Number(cellUser.data);
    });

    var avg = tempSum/count;


    cellUserCursor.forEach(function(cellUser){
        // console.log("celldata");
        // console.log(Number(cellUser.data));
        // console.log(Number(cellUser.data)-avg);
        // console.log("celldata");
        //var e = (Number(cellUser.data)-avg);

        sum = sum + (Number(cellUser.data)-avg)*(Number(cellUser.data)-avg);
    });

    var variance = sum/count;

    return variance;
};




var updateRowForVariance = function(proID,rowNo){

    var rowCursor = cellFindRow(rowNo,proID);

    rowCursor.forEach(function(cell){
        // console.log("cellcol");
        // console.log(cell.column);


        if(rowNo>0){
            if(cell.column>0){
                var variance = calculateSD(rowNo,cell.column,proID);
                Cells.update(cell._id,{$set: {SDdata : variance}});
            }
        }
    })
};





Template.reportMatrix.helpers({
    cellFindRow: function(rowNo){
      //return Cells.find({ row: rowNo },{ sort:{column: 1 }});
      updateRow(this._id,rowNo);
      return cellFindRow(rowNo,this._id);
    },
    rowNum: function(){
      var col0 = cellFindCol(0,this._id);
      return col0;
    },
    celllist: function(rowNo,columnNo,proID){
      // updateOne(rowNo,columnNo,proID);
      return Cells.find({isReport:false,row: rowNo, column:columnNo, projectID:proID}); 
    }
    //factorCo: 2,
    //candidateCo:2
  });

/*
to be modified later: setDefault
Qc,150807
*/
var showCheckBox=[false,false];
Session.setDefault({showNotes: showCheckBox});

Template.reportMatBody.helpers({
    cellFindRow: function(rowNo, projectID){
      updateRow(projectID,rowNo);
        updateRowForVariance(projectID,rowNo);
      return cellFindRow(rowNo,projectID);
    },
    showNotes: function(row){
      // var rowNo=this.row;
    //   console.log("@@@@@@@");
    // console.log(Session.get('showNotes')[row-1]);
    return Session.get('showNotes')[row-1];
      // return true;
    }
});

Template.setTH.events({
    'submit form': function (event) {
        event.preventDefault();
        var sth = $('[name=sth]').val();

        var currentProject = this._id;


        Projects.update({_id:currentProject},{$set:{sTH:sth}});

        $('[name=sth]').val('');

    }
});

Template.reportcellshow.helpers({
    isCandidate: function(){
      var flag = (this.row === 0);
      return flag;
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
    }
});


Template.addCandidate.events({
    'submit form': function(event){
    event.preventDefault();
    // var thisProject = Projects.findOne({_id: proID});
    var canName = $('[name="canName"]').val();
    
    /////////////add new columns in Report page
  
    for (var i=-1;i<=Number(this.rows);i++){
      if(i===0){     
        Cells.insert({userID: null,
            isReport: true,
            data: canName,
            row: 0,
            createdAt: new Date(),
            column: Number(this.columns)+3,
            projectID:this._id,
            SDdata:0});

      }else{
        Cells.insert({
        userID: null,isReport: true,
        data: 0,
        row: i,
        createdAt: new Date(),
        column: Number(this.columns)+3,
        projectID:this._id,
            SDdata:0
        });
        // insert 'placeholder' of notes
        if(i>0){
          Notes.insert({isAdd:true,
            row:i,
            column:Number(this.columns)+3,
            projectID:this._id,
            createdAt: new Date(),
            content:'click to add',
            createdBy: Meteor.userId(),
            name:Meteor.user().username,
            url:''});
        }
      }
    }
    //add new columns in related user's page
      for(var item in this.users){
        var nowUserId=this.users[item].userId;
        for (i=-1;i<=Number(this.rows);i++){
        if(i===0){     
        Cells.insert({userID: nowUserId,
            isReport: false,
            data: canName,
            row: 0,
            createdAt: new Date(),
            column: Number(this.columns)+3,
            projectID:this._id,
            SDdata:0});
      }else{

        Cells.insert({
        userID: nowUserId,isReport: false,
        data: 0,
        row: i,
        createdAt: new Date(),
        column: Number(this.columns)+3,
        projectID:this._id,
            SDdata:0
        });
      }
      }    
    }
    


    Projects.update(this._id,  {$set: {columns: Number(this.columns)+1}});  
    $('[name="canName"]').val('');


  }
});

Template.addFactor.events({
    'submit form': function(event){
    event.preventDefault();
    var facName = $('[name="facName"]').val();

    // report
    for (var i=0;i<=Number(this.columns)+2;i++){
      if(i===0){
        Cells.insert({userID: null,isReport: true, data: facName, row: this.rows+1, createdAt: new Date(),
        column: 0,
        projectID:this._id,
            SDdata:0
        });
      }else{
        Cells.insert({userID: null,isReport: true,
        data: 0,
        row: this.rows+1,
        createdAt: new Date(),
        column: i,
        projectID:this._id,
            SDdata:0
        });
        if(i>1){
          Notes.insert({isAdd:true,
            row:this.rows+1,
            column:i,
            projectID:this._id,
            createdAt: new Date(),
            content:'click to add',
            createdBy: Meteor.userId(),
            name:Meteor.user().username,
            url:''});
        }
      }
    }
    //personal
     for(var item in this.users){
        var nowUserId=this.users[item].userId;
        for (var i=0;i<=Number(this.columns)+2;i++){
        if(i===0){     
        Cells.insert({userID: nowUserId,
            isReport: false,
            data: facName,
            row:this.rows+1,
            createdAt: new Date(),
            column: 0,
            projectID:this._id,
            SDdata:0});
      }else{
        Cells.insert({
        userID: nowUserId,isReport: false,

        data: 0,
        row: this.rows+1,
        createdAt: new Date(),
        column: i,

        projectID:this._id,
            SDdata:0
        });
      }
      }    
    }
    Projects.update(
      this._id,
      {$set: 
        {rows: 
          Number(this.rows)+1
        }
      }
      );
    $('[name="facName"]').val('');
  }
});

Template.reportcellshow.events({
   'click .delete-candi': function(event) {
    event.preventDefault();   
    var candidateCursor = Cells.find({projectID: this.projectID,column:this.column});
    candidateCursor.forEach(function(cell){
      Cells.remove({_id:cell._id});
    })
    
    var thisProject=Projects.findOne({_id:this.projectID });
    Projects.update(this.projectID,  {$set: {columns: Number(thisProject.columns)-1}});  
    
    // column-1 for those followings.

    var candiFollowingCursor = Cells.find({projectID: this.projectID,column:{$gt:this.column}});
    candiFollowingCursor.forEach(function(cell){
      var col = Number(cell.column)-1;
      Cells.update(cell._id,{$set: {column: col}});
    });




    },
    'click .delete-fac': function(event) {
    event.preventDefault();   
    var facCursor = Cells.find({projectID: this.projectID,row:this.row});
    facCursor.forEach(function(cell){
      Cells.remove({_id:cell._id});
    });
    
    var thisProject=Projects.findOne({_id:this.projectID });
    Projects.update(this.projectID,  {$set: {rows: Number(thisProject.rows)-1}});  

    // row-1 for those followings.

    var facFollowingCursor = Cells.find({projectID: this.projectID,row:{$gt:this.row}});
    facFollowingCursor.forEach(function(cell){
      var ro = Number(cell.row)-1;
      Cells.update(cell._id,{$set: {row: ro}});
    });

    // session delete this item
    var newSN = Session.get('showNotes');
    newSN.splice(this.row-1, 1);
    Session.set({showNotes: newSN});

    },
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
