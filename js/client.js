/* global $ */
function initialState() {

    var boxes = $('.scroll-content-box');

    $.each(boxes, function (i, elem) {
        
        var $box = $(elem);

        /*
        * $box.offset().top = how far it is from the top of the browser
        * scrollTop = how far is it from the top of the body
        * top = from the top of the window
        *
        * */

        var scrollTop = $('body').scrollTop();
        var top = $box.offset().top - scrollTop;

        $box.attr('top', top);
        $box.find('.scroll-parallax-box').attr('top', top);

    });

}

initialState();

function onFrame(){

    var scrollTop = $('body').scrollTop();
    var boxes = $('.scroll-parallax-box');
    var contentBoxes = $('.scroll-content-box');

    /*
    * this is where we move the entire container
    * */

    $('.content-container').css({
        transform:'translate3d(0px,-'+scrollTop+'px, 0px)'
    });

    $.each(contentBoxes, function (i, elem) {

        var $contentBox = $(elem);

        var boxTop = $contentBox.attr('top');
        var factor = $contentBox.attr('factor');
        var scrollTop = $('body').scrollTop();

        var centerOffset = boxTop - scrollTop - $(window).height()/2 + $contentBox.outerHeight()/2;

        var centerRatio = centerOffset/$(window).height()*2;

        $contentBox.css({
            transform:'translate3d(0px,'+centerRatio*factor+'px, 0px)'
        });

    });

    $.each(boxes, function (i, elem) {

        var $box = $(elem);

        var boxTop = $box.attr('top');
        var factor = $box.attr('factor');
        var scrollTop = $('body').scrollTop();

        /*
        * boxTop = how much the box was offset from the top initially
        * centerOffset = how much is the element currently offset from the center of the browser
        * */

        var centerOffset = boxTop - scrollTop - $(window).height()/2 + $box.outerHeight()/2;

        var centerRatio = centerOffset/$(window).height()*2;

        $box.css({
            transform:'translate3d(0px,'+centerRatio*factor+'px, 0px)'
        });

    });

    requestAnimationFrame(onFrame);

}

onFrame();

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}