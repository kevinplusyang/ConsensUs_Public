Template.userInProject.helpers({
   'userInProject': function(currentProjectt){
      console.log("cr:",currentProjectt);
      var nowProject = Projects.findOne({_id: currentProjectt});
      console.log("find:", nowProject);
   	var one = nowProject.users;
      console.log(one);
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