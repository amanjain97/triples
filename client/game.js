console.log("in ****  " + Session.get('gamelevel'));
Swiper = new Swipe(['screen1', 'screen2', 'screen3', 'screen4'])

Template.main.helpers({
  Swiper: function() {
    return Swiper;
  }
});

Template.main.rendered = function() {
  Swiper.setInitialPage('screen1');
  Tracker.autorun(function() {
    if (Swiper.pageIs('screen1')) {
      return Swiper.leftRight(null, 'screen2');
    }
  });
  Tracker.autorun(function() {
    if (Swiper.pageIs('screen2')) {
      return Swiper.leftRight('screen1', 'screen3');
    }
  });
  Tracker.autorun(function() {
    if (Swiper.pageIs('screen3')) {
      return Swiper.leftRight('screen2', 'screen4');
    }
  });
  Tracker.autorun(function() {
    if (Swiper.pageIs('screen4')) {
      return Swiper.leftRight('screen3', null);
    }
  });
};
