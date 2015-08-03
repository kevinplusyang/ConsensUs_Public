Router.configure({
	layoutTemplate:'appbody'
})
Router.route('/',{
	template:'home'
});
Router.route('/project');
Router.route('/user');

Router.route('/project/:_id',{
	name: 'projectList',
	template: 'projectList',
	data: function(){
		var currentProject = this.params._id;
		return Projects.findOne({_id: currentProject});
	}
});