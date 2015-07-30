
  // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

var cellFindOne = function(rowNo, columnNo){
      return Cells.findOne({ row: rowNo, column:columnNo});
}
var cellFindCol= function(colNo){
      return Cells.find({ column: colNo },{ sort:{row: 1 }});
}
var cellFindRow= function(rowNo){
      return Cells.find({ row: rowNo },{ sort:{column: 1 }});
}
var updateWeight = function(){
      var weightArray = cellFindCol(1);
      var sum = 0;
      weightArray.forEach(function(cell){
        sum =sum + Number(cell.data);
      });
      cellFindCol(2).forEach(function(cell){
        Cells.update(cell._id,{$set: {data: cellFindOne(cell.row, 1).data/sum}});
      });
      // norWeightArray.forEach(function(cell){
      //   cell.data=Number(cell.data)/sum;
      // });
}
var updateTotal = function(){
      var totalArray = cellFindRow(0);
 //     var norWeight = cellFindCol(2);
      //(0,3) (0,4) 
    //  console.log('here');
      totalArray.forEach(function(cell){
        var sum = 0;
        Col=cell.column;
        var scoreCol = cellFindCol(Col);
        //(:,3)
        scoreCol.forEach(function(cellInside){

          if (Number(cellInside.row)!== 0) {

            sum =sum + Number(cellFindOne(cellInside.row,2).data ) * Number(cellInside.data) ;

          };
        });
        Cells.update(cell._id,{$set: {data: sum}});
     });
}


  Template.matrix.helpers({
    cell: function () {
      updateWeight();
      updateTotal();
      return Cells.find();
    },
    cellFindRow: function(rowNo){
      return Cells.find({ row: rowNo },{ sort:{column: 1 }});
    },

    totalScore: function(columnNo,rowTotal){
      var totalValue = cellFindOne(2, 2);
      return totalValue.data;
    }




  });

  Template.celllist.events({
   'click .delete-cell': function(event) {
 
    event.preventDefault();
    var documentID = this._id;
    Cells.remove({_id: documentID});
    }
  });
