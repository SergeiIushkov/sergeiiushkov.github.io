/* Inspired by Mehmet Guler at https://codepen.io/mehmetgulerxyz/pen/XqqzVy
& Benjamin Vilina at https://codepen.io/BenjaminVilina/pen/XJwPEM */


/* Go to Version 2 here: https://codepen.io/b1tn3r/pen/LmwmEq

  Version 2 works on all browsers and is paneled in a shadowed platform with the icons themselves linked to the social media sites and not just the button.
*/

var contentArr = [
  {title: 'company website', href: 'http://titanglobaltech.net/'},
  {title: 'github', href: 'https://github.com/b1tn3r'},
  {title: 'codepen', href: 'https://codepen.io/b1tn3r/'},
  {title: 'facebook', href: 'https://www.facebook.com/TitanGlobalTech'},
  {title: 'google+', href: 'https://plus.google.com/u/1/b/101737025633422868987/101737025633422868987'},
  {title: 'twitter', href: 'https://twitter.com/TitanGlobalTech'},
  {title: 'instagram', href: 'https://www.instagram.com/?hl=en'}
]

var items = $('.social-item');
var container = $('.social-container');
var title = $(".social-title");
var link = $('.link');


var width = 0;
var height = 0;
var r = 0;
setSize();

function setSize() {
  width = container.width();
	height = container.height();
  r = Math.sqrt(width * width + height * height);
}
$(window).resize(setSize);

items.hover(function(e) {
  var data = contentArr[$(e.currentTarget).attr('id')];
  var getTitle = data.title;
  title.text(getTitle);
  $('.link').attr('href', data.href).addClass('link--visibility')

  items.removeClass('current');
  $(this).addClass('current');
  var ripple = $("<div unselectable='on' id='ripple'></div>");
  container.append(ripple);
  ripple.css({
    position: 'absolute',
    'z-index': -1,
    'background': $(this).css('background'),
    width: 0,
    height: 0,
    "border-radius": "50%",
    left: e.pageX,
    top: e.pageY,
    'margin-left': 0,
    'margin-top': 0,
    'webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none'
  });
  ripple.animate({
    width: (r * 2),
    height: (r * 2),
   	'margin-left': -r,
    'margin-top': -r
  }, {
    duration: 800,
    easing: "easeInOutCubic",
    queue: false,
    complete: function() {
      ripple.parent().css('background',
                    $(this).css('background'));
      if(getTitle != 'instagram') {
        ripple.detach();
      } else {
        ripple.fadeOut(500);
        setTimeout(() => {
          ripple.detach();
        }, 500);
      }
    }
  });
});
