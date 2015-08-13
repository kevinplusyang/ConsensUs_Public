
Session.setDefault({showSD: false});
Template.SDshow.helpers({
    showSD: function(){
      // var rowNo=this.row;
    // console.log(Session.get('showNotes'));
    return Session.get('showSD');
      // return true;
    }
});
Template.SDshow.events({
	"change .show-SD input": function (event) {

      // console.log(Session.get('showNotes'))
      // var getShowSD = Session.get('showSD');
      // var newSN = getShowNotes;
      // newSN[rowNo-1] = event.target.checked;
      // console.log(newSN);
      Session.set({showSD: event.target.checked});

    }

  });


