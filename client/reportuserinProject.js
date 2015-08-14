/**
 * Created by kevinyang on 8/13/15.
 */

Template.reportuserInProject.helpers({
    'reportuserInProject': function(){
        //console.log("cr:",currentProjectt);
        var currentProjectt = this._id;
        // console.log("===============");
        // console.log(currentProjectt);
        // console.log("===============");


        var nowProject = Projects.findOne({_id: currentProjectt});
        //console.log("find:", nowProject);
        var one = nowProject.users;
        //console.log(one);
        for (var item in one)
        {
            one[item].pj=currentProjectt;
            //console.log(one[item])
        }
        // one['pj'] = this._id;
        //console.log(currentProjectt);
        return one;
    }
    //   },


    // 'getID': function(){
    // 	var ID=this._id;
    //      console.log("this_id:",this._id);
    // 	return ID;
    // }




});