Template.notes.helpers({
    colhere: function(rowNo,proID){
      return Cells.find({isReport: true,row: rowNo,column:{$gt:2}, projectID:proID},{ sort:{column: 1 }});
      
      // return cellFindRow(rowNo,this._id);
    }
  });

Template.addNote.events({
    'submit form': function(event){
    event.preventDefault();
    // var thisProject = Projects.findOne({_id: proID});
    var content = $('[name="Note"]').val();
    Notes.insert({
      row:this.row,
      column:this.column,
      createdAt: new Date(),
      content:content,
      createdBy: Meteor.userId(),
      name:Meteor.user().username,
      url:''


    });  
    $('[name="Note"]').val('');
  }
});