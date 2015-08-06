Template.project.helpers({
    isReportPage: function () {
      return false;
    },
    userToSee: function(){
    	return Meteor.user();
    }
  });