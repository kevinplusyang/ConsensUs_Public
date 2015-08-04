var initialProject = function(proID,userID){
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:0,column:3,data:'New York',createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:0,column:4,data:'Hawaii',createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:1,column:0,data:'Cost',createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:2,column:0,data:'Safety',createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:1,column:1,data:3,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:1,column:2,data:1,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:1,column:3,data:2,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:1,column:4,data:3,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:2,column:1,data:1,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:2,column:2,data:2,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:2,column:3,data:3,createdAt: new Date()});
 Cells.insert({userID: null,ifReport : true ,projectID:proID,row:2,column:4,data:1,createdAt: new Date()});

 //
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:-1,column:3,data:0,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:-1,column:4,data:0,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:0,column:3,data:'New York',createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:0,column:4,data:'Hawaii',createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:1,column:0,data:'Cost',createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:2,column:0,data:'Safety',createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:1,column:1,data:3,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:1,column:2,data:1,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:1,column:3,data:2,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:1,column:4,data:3,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:2,column:1,data:1,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:2,column:2,data:2,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:2,column:3,data:3,createdAt: new Date()});
 Cells.insert({userID: userID, ifReport : false ,projectID:proID,row:2,column:4,data:1,createdAt: new Date()});

 updateWeight(proID);
 updateTotal(proID);
}