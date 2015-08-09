Cells = new Meteor.Collection('cells');
// Cells.insert({
//     row: 1,
//     column: 1,
//     createdAt: new Date(),
//     data:3
// });
Projects = new Meteor.Collection('projects');

Chatrooms = new Meteor.Collection('chatRoom');

Notes=new Meteor.Collection('notes');

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
