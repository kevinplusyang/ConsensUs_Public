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
      if(cell.column>0){
    var aver = calculateOne(rowNo,cell.column,proID);
    Cells.update(cell._id,{$set: {data: aver}});
  }
    })
    


}
      // var weightArray = cellFindCol(1,proID);
      // var sum = 0;
      // weightArray.forEach(function(cell){
      //   sum =sum + Number(cell.data);
      // });
      // cellFindCol(2,proID).forEach(function(cell){
      //   Cells.update(cell._id,{$set: {data: cellFindOne(cell.row, 1,proID).data/sum}});
      // });
      // norWeightArray.forEach(function(cell){
      //   cell.data=Number(cell.data)/sum;
      // });

// var updateTotal = function(proID){
//       var totalArray = cellFindRow(-1,proID);

//       totalArray.forEach(function(cell){
//         var sum = 0;
//         Col=cell.column;
//         var scoreCol = cellFindCol(Col,proID);
//         scoreCol.forEach(function(cellInside){
//           if (Number(cellInside.row)>= 1) {
//             sum =sum + Number(cellFindOne(cellInside.row,2,proID).data ) * Number(cellInside.data) ;
//           };
//         });
//         Cells.update(cell._id,{$set: {data: sum}});
//      });
// }



Template.reportMatrix.helpers({
    cellFindRow: function(rowNo){
      //return Cells.find({ row: rowNo },{ sort:{column: 1 }});

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