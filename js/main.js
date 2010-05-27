$(document).ready(function () {
  
  default_top = -122;
  
  oldhash = location.hash;
  
  if (oldhash.length)
  {
    hide_footer();
  }
  
  swap_slides('', oldhash);
  checkHash();
  
});

function checkHash()
{
  var newhash = location.hash;
  
  if (newhash != oldhash)
  {
    hide_footer();
    
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

function hide_footer()
{
  $('#v4constant_foot').hide();
}