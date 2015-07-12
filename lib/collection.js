Game = new Mongo.Collection('game');
var resetGame = function(){
  console.log("reset game fom collectionjs working");
  Game.remove({});
 }

Game.attachSchema(new SimpleSchema({
  'index': {
    type: String,
    optional: true
  },
  'imageurl': {
    type: String,
    optional: true
  },
  'selected': {
    type: Boolean,
    optional: true
  },
  'matched': {
    type: Boolean,
    optional: true
  }

}));