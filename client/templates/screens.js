function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function shuffle(o) {
    var j, x, i;
    for (i = o.length - 1; i >= 0; i--) {
        j = Math.floor(Math.random() * i);
        x = o[i];
        o[i] = o[j];
        o[j] = x;
    };
    return o;
}
// Template.levels.events({
//   'click .level1' : function() {
//     Session.set('gamelevel' , 1)
//   },
//   'click .level2' : function() {
//     Session.set('gamelevel' , 2)
//   }
// });

var starttime;
var heightWindow = $(window).height();
var rowCounter;

// Tracker.autorun(function () {
// Session.set('gamelevel',level)
// });
var imgArr = [];
function assignimage (level) {
  Meteor.call('removeAllPosts')

  starttime = moment();
  imgArr = [];
  rowCounter = 1;
  for (var i = 0; i < Session.get('gamelevel')*12/3; i++) {
      imgArr.push((i+1)+".png");
      imgArr.push((i+1)+".png");
      imgArr.push((i+1)+".png");
  };
  shuffle(imgArr);
  console.log("image arr after shuffle is ",imgArr)
  var i;
  var gameLevel=Session.get('gamelevel')
  console.log("gamelevel in assisgnimage is", gameLevel)
  for (var i =0 ; i<gameLevel*12 ; i++) {
    Game.insert({
      'index' : 'c'+(i+1),
      'imageurl': imgArr[i],
      'selected': false,
      'matched': false
    });
  }
  // console.log("img array is  ",imgArr)
  Session.set('images', imgArr);
  Session.set('lastUpdate', new Date() );
  for (var i = 1; i <= Session.get('gamelevel')*12; i++) {

    $('#c'+i).addClass('imghidden');
  };
    // $('#c'+2).addClass('imghidden');

  // console.log(" here jquery thing in assignimage func is ",$("#c"+1).css(''))
}
Tracker.autorun(function () {
  console.log(Session.get('gamelevel'))
  assignimage(Session.get('gamelevel'));
}); 
Session.set('gamelevel', 4)
//assignimage();

Template.screen1.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+Session.get('images')[rowCounter-2];
    },
    counter : function () {
      return 'c'+ rowCounter++;
    },
    heightWin: function() {
      var p=heightWindow/4;
      return p+"px";
    },
    loopCount: function(count){
      var countArr = [];
      for (var i=0; i<count; i++){
        countArr.push({});
      }
      return countArr;
    },
    lastUpdate: function () {
      return Session.get('lastUpdate');
    },
    imgarr: function() {
      console.log("img arr in helper is ",imgArr)
      return imgArr;
    }

  });
Template.screen2.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+Session.get('images')[rowCounter-2];
    },
    counter : function () {
      return 'c'+ rowCounter++;
    },
    heightWin: function() {
      var p=heightWindow/4;
      return p+"px";
    },
    loopCount: function(count){
      var countArr = [];
      for (var i=0; i<count; i++){
        countArr.push({});
      }
      return countArr;
    },
    lastUpdate: function () {
      return Session.get('lastUpdate');
    }

  });
Template.screen3.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+Session.get('images')[rowCounter-2];
    },
    counter : function () {
      return 'c'+ rowCounter++;
    },
    heightWin: function() {
      var p=heightWindow/4;
      return p+"px";
    },
    loopCount: function(count){
      var countArr = [];
      for (var i=0; i<count; i++){
        countArr.push({});
      }
      return countArr;
    }

  });
Template.screen4.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+Session.get('images')[rowCounter-2];
    },
    counter : function () {
      return 'c'+ rowCounter++;
    },
    heightWin: function() {
      var p=heightWindow/4;
      return p+"px";
    },
    loopCount: function(count){
      var countArr = [];
      for (var i=0; i<count; i++){
        countArr.push({});
      }
      return countArr;
    }

  });
var clickcount = 0;
var imgcomp = [];
var imgidcomp = [];

function screenClickEvent(card) {
      var game = Game.findOne({'index' : card});
      if(game.selected){
        // console.log('its already selted so return  - '+   JSON.stringify(game));
        return;
      }
       else {
        Game.update(game._id, {$set: {"selected": true}});
       }
       var gameimageurl = game.imageurl;
       $('#'+card).removeClass('imghidden');
       if (game.matched==false) {
       imgcomp.push(gameimageurl);
       imgidcomp.push(card);
       clickcount++;
               // console.log(" - - - -"+clickcount );

       if(clickcount == 2  ){
        // console.log(clickcount + " clikes 2 and - " + imgcomp[0] + " : " + imgcomp[1]);
          if (imgcomp[0]!=imgcomp[1]) {
            // console.log(" clikes 2 and not matched ")
            for (var i = 0; i < 2; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              Game.update(xyz._id, {$set: {"selected": false}});
            }
            setTimeout(function(q){ 
              $('#'+q[0]).addClass('imghidden');
              $('#'+q[1]).addClass('imghidden');
              imgcomp = [];
              imgidcomp = [];
             }, 200, imgidcomp);
            clickcount=0;
          }
       }
       if(clickcount ==3 ){
            
          clickcount=0;
          if (imgcomp[0]==imgcomp[1] && imgcomp[0]==imgcomp[2] && imgcomp[1]==imgcomp[2] ) {
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              Game.update(xyz._id, {$set: {"matched": true}});
            }
            imgcomp = [];
            imgidcomp = [];
            if(Game.find({'matched': false}).count() == 0){
              var endtime = moment();
              var seconds = Math.floor(endtime.diff(starttime)/1000);
              var hrs = Math.floor(seconds/3600);
              seconds=seconds%3600;
              var min = Math.floor(seconds/60);
              seconds=seconds%60;
              var sec = seconds;
              alert("time taken is "+hrs+" hours "+min+" minutes "+sec+" seconds. ")
              // console.log(seconds)
            }else{
              // console.log("not matched ");
            }
          }
          else{
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              Game.update(xyz._id, {$set: {"selected": false}});
            }
            setTimeout(function(q){ 
              $('#'+q[0]).addClass('imghidden');
              $('#'+q[1]).addClass('imghidden');
              $('#'+q[2]).addClass('imghidden');
              imgcomp = [];
              imgidcomp = [];
             }, 200, imgidcomp);
          }
       }
     }
}

Template.screen1.events({
    'click .col-xs-4': function(e) {
       var card = e.target.id;
       screenClickEvent(card);
    }
  });
Template.screen2.events({
    'click .col-xs-4': function(e) {
       var card = e.target.id;
       screenClickEvent(card);
    }
  });
Template.screen3.events({
    'click .col-xs-4': function(e) {
       var card = e.target.id;
       screenClickEvent(card);
    }
  });
Template.screen4.events({
    'click .col-xs-4': function(e) {
       var card = e.target.id;
       screenClickEvent(card);
    }
  });

Template.header.events({
  'click .resetbutton': function () {
    console.log("click on resetbutton is working")
    assignimage();
    
  },
  'click .level1': function() {
    Session.set('gamelevel', 1)

    // console.log("game level is set as 3")
  },
  'click .level2': function() {
    Session.set('gamelevel', 2)
    // console.log("game level is set as 1")
  },
  'click .level3': function() {
    Session.set('gamelevel', 3)
    // Meteor.render(Template.screen2);
    // Meteor.render(Template.screen3);

    // console.log("game level is set as 1")
  },
  'click .level4': function() {
    Session.set('gamelevel', 4)
    // console.log("game level is set as 1")
  }
});
// $('#somediv').html(Meteor.render(Template.screen1));
// $('#somediv').html(Meteor.render(Template.screen2));
// $('#somediv').html(Meteor.render(Template.screen3));
// $('#somediv').html(Meteor.render(Template.screen4));
