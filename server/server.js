
Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {
        return Game.remove({});

      }

    });

  });
