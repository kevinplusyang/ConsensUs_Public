var destroy = function() {
	Cells.remove({});
	Projects.remove({});
	Projects.insert({_id:"p4tETnfgHArySKLGJ",columns:2,createdAt: new Date(),name:"P1",rows:2});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:-1,column:3,data:0,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:-1,column:4,data:0,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:0,column:3,data:'New York',createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:0,column:4,data:'Hawaii',createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:1,column:0,data:'Cost',createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:2,column:0,data:'Safety',createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:1,column:1,data:3,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:1,column:2,data:1,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:1,column:3,data:2,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:1,column:4,data:3,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:2,column:1,data:1,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:2,column:2,data:2,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:2,column:3,data:3,createdAt: new Date()});
	Cells.insert({projectID:"p4tETnfgHArySKLGJ",row:2,column:4,data:1,createdAt: new Date()});
	
		Meteor.setTimeout(function() {
	  destroy();
    },2* 60 * 1000);
  }
  destroy();