
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
Template.setTH.onRendered (function () {
  // ...
   //console.log("fsfsf:",this);
   var thisProject=this.data;
  var slider=this.$("#SDSlider");

  slider.noUiSlider({
    start: this.data.sTH,
    connect:'lower',
    range:{
      'min':0,
      'max':1
    }
  }).on('slide', function (ev, val) {
    //   // set real values on 'slide' event
    Projects.update({_id:thisProject._id},{$set:{sTH:val}});
    //Cells.update({_id:id}, {$set:{data:val}});
  
  }).on('change',function(ev,val){
    Projects.update({_id:thisProject._id},{$set:{sTH:val}});
    

  })
});


Template.setTH.helpers({
    sTHpct: function(){
    return Math.round(this.sTH*100);
      // return true;
    }
});

