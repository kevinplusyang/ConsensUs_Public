Template.userInProject.helpers({
   'userInProject': function(currentProjectt){

      var nowProject = Projects.findOne({_id: currentProjectt});
      console.log(nowProject);
   	var one = nowProject.users;
   	for (var item in one)
   	{
   		one[item].pj=currentProjectt;
   		console.log(one[item])
   	}
   	// one['pj'] = this._id;
   	console.log(currentProjectt);
    return one;
 }
 //   },


	// 'getID': function(){
	// 	var ID=this._id;
 //      console.log("this_id:",this._id);
	// 	return ID;
	// }




});