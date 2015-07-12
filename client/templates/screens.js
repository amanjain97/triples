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
assignimage();
// $('c'+rowCounter).click(function(){
//     $("p").css("color", "red");
// });
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
    'click': function(e) {
       var card = e.target.id;
       // console.log("hello  " ,Game.findOne({'index' : card}).imageurl)
       var game = Game.findOne({'index' : card});
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
          // alert("3 clicks.....ek min ruk ke jaana ")
          // for (var i = 0; i<3 ; i++) {
          //             console.log(imgcomp[i])
          // }
          if (imgcomp[0]==imgcomp[1] && imgcomp[0]==imgcomp[2] && imgcomp[1]==imgcomp[2] ) {
            // console.log("tiles matched situation")

            // console.log("game obj initial" ,Game.findOne({'index' : imgidcomp[0]}))

            // $('#'+imgidcomp[0]).onclick = 'none';
            // $('#'+imgidcomp[1]).onclick = 'none';
            // $('#'+imgidcomp[2]).onclick = 'none';
            for (var i = 0; i < 3; i++) {
              var xyz=Game.findOne({'index' : imgidcomp[i]});
              console.log("game obj START" ,xyz);
              Game.update(xyz._id, {$set: {"matched": true}});
              console.log("game obj initial" ,Game.findOne({'index' : imgidcomp[i]}));
            }
            

          // Game.update(imgidcomp[1], {$set: {matched: true}});
          // Game.update(imgidcomp[2], {$set: {matched: true}});
            // $('#'+imgidcomp[0]).off('click');
            // $('#'+imgidcomp[1]).off('click');
            // $('#'+imgidcomp[2]).off('click');
            console.log("matched")
            imgcomp = [];
            imgidcomp = [];
          }
          else{//problem is if i click 11,12,13 and they dont match and now if i click 11,21,22 then 11will disappear in 1 sec as been set // the match thing is a little bit weird
            console.log("in else part")
            setTimeout(function(q){ 
              $('#'+q[0]).addClass('imghidden');
              $('#'+q[1]).addClass('imghidden');
              $('#'+q[2]).addClass('imghidden');
              imgcomp = [];
              imgidcomp = [];
             }, 500, imgidcomp);
            // setTimeout(function(){ 
            // $('#'+imgidcomp[0]).addClass('imghidden');
            // $('#'+imgidcomp[1]).addClass('imghidden');
            // $('#'+imgidcomp[2]).addClass('imghidden');
            //   imgcomp = [];
            //   imgidcomp = [];
            //  }, 1000);
            // $('#'+imgidcomp[0]).addClass('imghidden');
            // $('#'+imgidcomp[1]).addClass('imghidden');
            // $('#'+imgidcomp[2]).addClass('imghidden');
            // imgcomp = [];
            // imgidcomp = [];


          }
       }
     }
      // return Game.findOne({'index': card}).imageurl
       // Game.update that selected should be true 
      // $('#'+card).removeClass('pad_none').addClass('bg2');
    }
  });

// Template.screen2.helpers({
//     count: function () {
//       return Session.get('gameLevel');
//     },
//     heightWin: function() {
//       var p=heightWindow/4;
//       return p+"px";
//     },
//     loopCount: function(count){
//       var countArr = [];
//       for (var i=0; i<count; i++){
//         countArr.push({});
//       }
//       return countArr;
//     }
//   });

// Template.screen2.events({
//     'click': function() {
//       console.log("hello");
//       // myf();
//     }
//   });

// Template.screen3.helpers({
//     count: function () {
//       return Session.get('gameLevel');
//     },
//     heightWin: function() {
//       var p=heightWindow/4;
//       return p+"px";
//     },
//     loopCount: function(count){
//       var countArr = [];
//       for (var i=0; i<count; i++){
//         countArr.push({});
//       }
//       return countArr;
//     }
//   });

// Template.screen3.events({
//     'click': function() {
//       console.log("hello");
//       // myf();
//     }
//   });

// Template.screen4.helpers({
//     count: function () {
//       return Session.get('gameLevel');
//     },
//     heightWin: function() {
//       var p=heightWindow/4;
//       return p+"px";
//     },
//     loopCount: function(count){
//       var countArr = [];
//       for (var i=0; i<count; i++){
//         countArr.push({});
//       }
//       return countArr;
//     }
//   });

// Template.screen4.events({
//     'click': function() {
//       console.log("hello");
//       // myf();
//     }
//   });