
// function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
function assignImages() {
	return "1.jpg";
	//return ".jpg";
}

Template.card.helpers({
	// 'randomColor': function() {
	// 	return getRandomColor();
	// },
	//create method to assignimages
    heightWin: function() {
  	  var heightWindow = $(window).height();
      var p=heightWindow/4;
      return p+"px";
    }
});

Template.card.events({
	'click ': function(e) {
		var classname = $(e.target).attr('class')
		console.log(classname);
		$('.imageHidden').toggleClass('aman')
	}
});

