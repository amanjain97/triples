var starttime = moment();
Session.set('gamelevel',2)
var heightWindow = $(window).height();
var rowCounter = 1;
var imgArr = [];
for (var i = 0; i < Session.get('gamelevel')*12/3; i++) {
    imgArr.push((i+1)+".png");
    imgArr.push((i+1)+".png");
    imgArr.push((i+1)+".png");
};
console.log("img array is  ",imgArr)
// var imgArr = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png" ,"1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png" , "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png"];
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
Meteor.call('removeAllPosts')
shuffle(imgArr);

function assignimage () {
  var i;
  var gameLevel=Session.get('gamelevel')
  for (var i =0 ; i<gameLevel*12 ; i++) {
    Game.insert({
      'index' : 'c'+(i+1),
      'imageurl': imgArr[i],
      'selected': false,
      'matched': false
    });
  }
}
assignimage();
Template.screen1.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+imgArr[rowCounter-2];
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
Template.screen2.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+imgArr[rowCounter-2];
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
Template.screen3.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
    'imageUrl': function() {
      return "/images/"+imgArr[rowCounter-2];
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
      return "/images/"+imgArr[rowCounter-2];
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
        console.log('its already selted so return  - '+   JSON.stringify(game));
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
               console.log(" - - - -"+clickcount );

       if(clickcount == 2  ){
        console.log(clickcount + " clikes 2 and - " + imgcomp[0] + " : " + imgcomp[1]);
          if (imgcomp[0]!=imgcomp[1]) {
            console.log(" clikes 2 and not matched ")
            for (var i = 0; i < 2; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              Game.update(xyz._id, {$set: {"selected": false}});
            }
            setTimeout(function(q){ 
              $('#'+q[0]).addClass('imghidden');
              $('#'+q[1]).addClass('imghidden');
              imgcomp = [];
              imgidcomp = [];
             }, 120, imgidcomp);
            clickcount=0;
          }
       }
       if(clickcount ==3 ){
            
            clickcount=0;
          if (imgcomp[0]==imgcomp[1] && imgcomp[0]==imgcomp[2] && imgcomp[1]==imgcomp[2] ) {
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              console.log("game obj START" ,xyz);
              Game.update(xyz._id, {$set: {"matched": true}});
              console.log("game obj initial" ,Game.findOne({'index' : imgidcomp[i]}));
            }
            imgcomp = [];
            imgidcomp = [];
            if(Game.find({'matched': false}).count() == 0){
              var endtime = moment();
              alert("Time taken "+Math.floor(endtime.diff(starttime)/1000)+ " seconds")
            }else{
              console.log("not matched ");
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
             }, 120, imgidcomp);
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
       var game = Game.findOne({'index' : card});
       if(game.selected)
        return;
       else {
        Game.update(game._id, {$set: {"selected": true}});
       }
       var gameimageurl = game.imageurl;
       $('#'+card).removeClass('imghidden');
       if (game.matched==false) {
       imgcomp.push(gameimageurl);
       imgidcomp.push(card);
       clickcount++;
       if(clickcount % 3 == 0){
          if (imgcomp[0]==imgcomp[1] && imgcomp[0]==imgcomp[2] && imgcomp[1]==imgcomp[2] ) {
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              console.log("game obj START" ,xyz);
              Game.update(xyz._id, {$set: {"matched": true}});
              console.log("game obj initial" ,Game.findOne({'index' : imgidcomp[i]}));
            }
            imgcomp = [];
            imgidcomp = [];
            if(Game.find({'matched': false}).count() == 0){
              var endtime = moment();
              alert("Time taken "+Math.floor(endtime.diff(starttime)/1000)+ " seconds")
            }else{
              console.log("abhi game baki hai ")
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
             }, 120, imgidcomp);
          }
       }
     }
    }
  });
Template.screen4.events({
    'click .col-xs-4': function(e) {
       var card = e.target.id;
       var game = Game.findOne({'index' : card});
       if(game.selected)
        return;
       else {
        Game.update(game._id, {$set: {"selected": true}});
       }
       var gameimageurl = game.imageurl;
       $('#'+card).removeClass('imghidden');
       if (game.matched==false) {
       imgcomp.push(gameimageurl);
       imgidcomp.push(card);
       clickcount++;
       if(clickcount % 3 == 0){
          if (imgcomp[0]==imgcomp[1] && imgcomp[0]==imgcomp[2] && imgcomp[1]==imgcomp[2] ) {
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              console.log("game obj START" ,xyz);
              Game.update(xyz._id, {$set: {"matched": true}});
              console.log("game obj initial" ,Game.findOne({'index' : imgidcomp[i]}));
            }
            imgcomp = [];
            imgidcomp = [];
            if(Game.find({'matched': false}).count() == 0){
              var endtime = moment();
              alert("Time taken "+Math.floor(endtime.diff(starttime)/1000)+ " seconds")
            }else{
              console.log("abhi game baki hai ")
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
             }, 120, imgidcomp);
          }
       }
     }
    }
  });