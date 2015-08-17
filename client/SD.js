
Session.setDefault({showSD: false});
Template.SDshow.helpers({
    showSD: function(){
    return Session.get('showSD');
    }
});
Template.SDshow.events({
	"change .show-SD input": function (event) {
      Session.set({showSD: event.target.checked});

    }

  });


