
Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {
        console.log("IN removeallposts -- ");
        return Game.remove({});

      }

    });

  });
