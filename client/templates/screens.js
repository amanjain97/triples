var starttime = moment();
 
var heightWindow = $(window).height();
var rowCounter = 1;
var imgArr = ["1.png", "2.png", "3.png", "4.png","1.png", "2.png", "3.png", "4.png","1.png", "2.png", "3.png", "4.png" ]
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
  // console.log(" this is a loop");
  for (var i =0 ; i<12 ; i++) {
    Game.insert({
      'index' : 'c'+(i+1),
      'imageurl': imgArr[i],
      'selected': false,
      'matched': false
    });
  }
}
console.log("gdjdjdjdj  ")

assignimage();
Template.screen1.helpers({
    count: function () {
      return Session.get('gameLevel');
    },
    'randomColor': function() {
      return getRandomColor();
    },
        'imageUrl': function() {
          console.log("hello bhai dekhna idhar" , rowCounter-1);
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
    },

  });
var clickcount = 0;
var imgcomp = [];
var imgidcomp = [];
Template.screen1.events({
    'click .col-xs-4': function(e) {
       var card = e.target.id;
       // console.log("hello  " ,Game.findOne({'index' : card}).imageurl)
       var game = Game.findOne({'index' : card});
       if(game.selected)
        return;
      else {
        Game.update(game._id, {$set: {"selected": true}});
      }
      // Game.update(game._id, {$set: {"selected": true}});
       var gameimageurl = game.imageurl;

       // $('#'+card).css("background-image", "url('+ gameobj.imageurl +')")
       // console.log($('#'+card).css("background-color", "red"))
       $('#'+card).removeClass('imghidden');
       // Session.set("")
       
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
            
            console.log("matched")
            imgcomp = [];
            imgidcomp = [];
            // console.log(Game.find({'matched': false}).count())
            if(Game.find({'matched': false}).count() == 0){
              var endtime = moment();
              console.log("game completed in "+Math.floor(endtime.diff(starttime)/1000)+ " seconds")

            }else{
              console.log("abhi game baki hai ")
            }
          }
          else{//problem is if i click 11,12,13 and they dont match and now if i click 11,21,22 then 11will disappear in 1 sec as been set // the match thing is a little bit weird
                          // var xyz=Game.findOne({'index' : imgidcomp[i]});

            // Game.update(xyz, {$set: {"selected": false}});
            
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              // console.log("game obj START" ,xyz);
              Game.update(xyz._id, {$set: {"selected": false}});
              // console.log("game obj initial" ,Game.findOne({'index' : imgidcomp[i]}));
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
      // return Game.findOne({'index': card}).imageurl
       // Game.update that selected should be true 
      // $('#'+card).removeClass('pad_none').addClass('bg2');
    },
   'click [data-action="showAlert"]': function(event, template) {
    IonPopup.alert({
      title: 'An Alert',
      template: 'This is an alert!',
      okText: 'Got It.'
    });
  }

  });
// alert(moment())