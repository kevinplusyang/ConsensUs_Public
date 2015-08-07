/**
 * Created by kevinyang on 8/7/15.
 */

Template.reportchatrooms.helpers({
    'reportchatroom': function(){
        var currentProject = this._id;

        return Chatrooms.find({projectId: currentProject},{sort:{createdAt:1}});
    }
}),



    Template.reportchatItem.events({
        'click .delete-chatItem': function(event){
            event.preventDefault();
            var documentID = this._id;
            Chatrooms.remove({_id: documentID});
        }

    }),

    Template.reportnewChatItem.helpers({
        'chatroom': function(){
            return Chatrooms.find({projectId: currentProject},{sort:{createdAt:1}});
        }
    }),


    Template.reportnewChatItem.events({
        'submit form': function(event){
            event.preventDefault();

            var chatContent = event.target.newItem.value;
            //console.log(chatContent);
            var currentProject = this._id;
            var currentUser = Meteor.userId();
            //var alias = Meteor.users.find({_id: currentUser});
            var names = Meteor.user().username;




            console.log(names);
            Chatrooms.insert({
                content: chatContent,
                createdAt: new Date(),
                user: names,
                tag1: "",
                tag2: "",
                projectId: currentProject,
                createdBy: currentUser
            });
            $('[name = "newItem"]').val('');

        }

    })