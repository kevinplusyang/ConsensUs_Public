//There are 4 database collections in the project.
//Cells, Projects, Chatrooms, Notes

Cells = new Meteor.Collection('cells');
//Cells is the collection to store each cell's data in the matrix

Projects = new Meteor.Collection('projects');
//Projects is the collection to store the project information

Chatrooms = new Meteor.Collection('chatRoom');
//Chatrooms is the collection to store information about the chat room including chat item.

Notes=new Meteor.Collection('notes');
//Notes is the collection to store notes.

EditableText.registerCallbacks({
  setIsAddBefore : function(doc) {
  // 	doc.isAdd=false;
 	// console.log("sfvgsdfgs:",doc);
 	Notes.update({_id:doc._id},{$set: {isAdd:false,createdAt: new Date(),createdBy:Meteor.userId(),name:Meteor.user().username}});
	// var extraFields = {timestamp:Date.now()};
	// if (Meteor.user()) {
	//   extraFields.user = Meteor.user().emails[0].address;
	// }
	// return _.extend(doc,extraFields);
  },
  addInsertHolder : function(doc) {
  // 	doc.isAdd=false;
 	// console.log("sfvgsdfgs:",doc);
 	Notes.insert({isAdd:true,row:doc.row,column:doc.column,projectID:doc.projectID,createdAt: new Date(),content:'click to add',createdBy: Meteor.userId(),name:Meteor.user().username,url:''});
  }
});
