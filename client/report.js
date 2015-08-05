var cellFindOne = function(rowNo, columnNo,proID){
      return Cells.findOne({isReport: true,row: rowNo, column:columnNo, projectID:proID});
}
var cellFindCol= function(colNo,proID){
      return Cells.find({isReport: true,column: colNo, projectID:proID},{ sort:{row: 1 }});
}
var cellFindRow= function(rowNo,proID){
      return Cells.find({isReport: true,row: rowNo, projectID:proID},{ sort:{column: 1 }});
}
// var updateWeight = function(proID){
//       var weightArray = cellFindCol(1,proID);
//       var sum = 0;
//       weightArray.forEach(function(cell){
//         sum =sum + Number(cell.data);
//       });
//       cellFindCol(2,proID).forEach(function(cell){
//         Cells.update(cell._id,{$set: {data: cellFindOne(cell.row, 1,proID).data/sum}});
//       });
//       // norWeightArray.forEach(function(cell){
//       //   cell.data=Number(cell.data)/sum;
//       // });
// }
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
    }
    //factorCo: 2,
    //candidateCo:2
  });

Template.reportMatBody.helpers({
    cellFindRow: function(rowNo, projectID){
      return cellFindRow(rowNo,projectID);
    }
});