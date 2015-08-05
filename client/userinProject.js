Template.userInProject.helpers({
   'userInProject': function(){

   	var one = this.users;
   	for (var item in one)
   	{
   		one[item].pj=this._id;
   		console.log(one[item])
   	}

   	console.log(this._id);
    return one;
   }
});