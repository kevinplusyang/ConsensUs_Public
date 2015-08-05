Router.configure({
	layoutTemplate:'appbody'
})
Router.route('/',{
	template:'home'
});
//Router.route('/project');
Router.route('/user');






Router.route('/project/:_id/:_uid',{
	name:'project',
	template: 'project',
	data: function(){
		var currentProject = this.params._id;
		var currentUser = this.params._uid;

        //
		//var one = this.Projects.findOne({_id: currentProject});

		var one = new Array();

			one["currentUserr"]=currentUser;
			one["currentProjectt"]=currentProject;
			console.log(one);



		return one;


		//return Projects.findOne({_id: currentProject});
	}
});

