Game = new Mongo.Collection('game');

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