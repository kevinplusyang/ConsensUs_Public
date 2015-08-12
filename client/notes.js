Template.notes.helpers({
    colhere: function(rowNo,proID){
      return Cells.find({isReport: true,row: rowNo,column:{$gt:0}, projectID:proID},{ sort:{column: 1 }});
      
      // return cellFindRow(rowNo,this._id);
    }
  });

Template.noteArea.helpers({
    notelist: function(){
      var rowNo = this.row;
      var colNo = this.column;
      var proID= this.projectID;
      return Notes.find({isAdd:false,row: rowNo,column:colNo, projectID:proID},{ sort:{createdAt:1}});
      
      // return cellFindRow(rowNo,this._id);
    },
    columnWeight:function(){

      return (this.column===2)+1;
    },
    addNoteDefault:function(){
      var rowNo = this.row;
      var colNo = this.column;
      var proID= this.projectID;
      return Notes.findOne({isAdd:true,row: rowNo,column:colNo, projectID:proID});
    }
  });

Template.addNote.helpers({

    console:function(){
      // console.log("jdshfifhd:",this)
      //return this;
    }
  });
var sum =0;
Template.addNote.events({
    'submit form': function(event){
    event.preventDefault();
    // var thisProject = Projects.findOne({_id: proID});
    var text = $('[name="Note"]').val();
     console.log("@@@@@@@:",text);
    Notes.insert({
      row:this.row,
      column:this.column,
      projectID:this.projectID,
      createdAt: new Date(),
      content:text,
      createdBy: Meteor.userId(),
      name:Meteor.user().username,
      url:''
    },function(){
      $('[name="Note"]').val('kjnkj');
      sum=sum+1;
      console.log("esfdsf:",sum)
    });  
    
  }
});