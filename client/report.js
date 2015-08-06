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

Template.reportMatBody.helpers({
    cellFindRow: function(rowNo, projectID){
      updateRow(projectID,rowNo);
      return cellFindRow(rowNo,projectID);
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