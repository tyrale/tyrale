$(document).ready(function () {
  
  default_top = -160;
  
  oldhash = location.hash;
  swap_slides('', oldhash);
  checkHash();
  
});

function checkHash()
{
  var newhash = location.hash;
  
  if (newhash != oldhash)
  {
    swap_slides(oldhash, newhash);
    oldhash = newhash;
  }
  
  setTimeout(checkHash, 200);
}

function swap_slides(slide1, slide2)
{
  slide(slide1, -1200, function () {  $(slide1).hide(); } );

  $(slide2).show();
  slide(slide2, default_top);
}

function slide(id, val, cb)
{
  $(id).animate(
    {
      top: val
    },
    {
      duration: 1000,
      complete: cb
    }
  );
}