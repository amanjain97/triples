console.log("in ****  " + Session.get('gamelevel'));
var array = [];
Swiper = new Swipe(array);
for (var i = 1;i <= Session.get('gamelevel'); i++) {
  array.push('screen'+i)
};

Template.main.helpers({
  Swiper: function() {
    return Swiper;
  }
});

Template.main.rendered = function() {
  Swiper.setInitialPage('screen1');
  Tracker.autorun(function() {
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
  // Tracker.autorun(function() {
  //   if (Swiper.pageIs('screen1')) {
  //     return Swiper.leftRight(null, 'screen2');
  //   }
  // });
  // Tracker.autorun(function() {
  //   if (Swiper.pageIs('screen2')) {
  //     return Swiper.leftRight('screen1', 'screen3');
  //   }
  // });
  // Tracker.autorun(function() {
  //   if (Swiper.pageIs('screen3')) {
  //     return Swiper.leftRight('screen2', 'screen4');
  //   }
  // });
  // Tracker.autorun(function() {
  //   if (Swiper.pageIs('screen4')) {
  //     return Swiper.leftRight('screen3', null);
  //   }
  // });
};
