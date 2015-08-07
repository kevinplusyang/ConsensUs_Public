Template.notes.helpers({
    colhere: function(rowNo,proID){
      return Cells.find({isReport: true,row: rowNo,column:{$gt:2}, projectID:proID},{ sort:{column: 1 }});
      
      // return cellFindRow(rowNo,this._id);
    }
  });