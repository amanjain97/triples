function makeSwipe() {
  // console.log("in ****  " + Session.get('gamelevel'));
  var array = [];
  for (var i = 1;i <= Session.get('gamelevel'); i++) {
    array.push('screen'+i)
  };
  Swiper = new Swipe(array);

}
makeSwipe();

// function shuffle(o) {
//     var j, x, i;
//     for (i = o.length - 1; i >= 0; i--) {
//         j = Math.floor(Math.random() * i);
//         x = o[i];
//         o[i] = o[j];
//         o[j] = x;
//     };
//     return o;
// }
// function resetgame () {
//   Meteor.call('removeAllPosts')
//   shuffle(imgArr);
//   var i;
//   var gameLevel=Session.get('gamelevel')
//   for (var i =0 ; i<gameLevel*12 ; i++) {
//     Game.insert({
//       'index' : 'c'+(i+1),
//       'imageurl': imgArr[i],
//       'selected': false,
//       'matched': false
//     });
//   }
// }
Template.swiper.helpers({
  Swiper: function() {
    return Swiper;
  }
});

Template.swiper.rendered = function() {
  Swiper.setInitialPage('screen1');
  Tracker.autorun(function() {
    console.log("gamelevel in swipe is  " + Session.get('gamelevel'));
    if(Session.get('gamelevel')==1){
      return Swiper.leftRight(null, null);
    }
    for (var i = 1; i <= Session.get('gamelevel'); i++) {
      if (Swiper.pageIs('screen' + (i))) {
        if (i == 1) {
          return Swiper.leftRight(null, 'screen' + (i + 1));
        };
        if ((i) >= Session.get('gamelevel')) {
          return Swiper.leftRight('screen' + (i - 1), null);
        };
        if (i < Session.get('gamelevel') && i != 1) {
          return Swiper.leftRight('screen' + (i - 1), 'screen' + (i + 1));
        };
      }
    };
  });
};

// Template.header.events({
//   'click .resetbutton': function () {
//     console.log("click on resetbutton is working")

//     resetgame();
//   }
// });