/**
 Function: Return the existing users in one project.
 This template is only for showing the users in report page
 Found by projectID
 **/
Template.reportuserInProject.helpers({
    'reportuserInProject': function(){

        var currentProjectt = this._id;
        var nowProject = Projects.findOne({_id: currentProjectt});
        var one = nowProject.users;

        for (var item in one) {
            one[item].pj=currentProjectt;
        }

        return one;
    }
});