$(document).ready(function () {
  
  $('#v4buttons a').click(function () {
    if (location.hash == $(this).attr('href'))
    {
      location.hash = 'home';
      return false;
    }
  });
  
  default_top = -125;
  
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
  if (!$(slide2).length)
  {
    show_footer();
  }
  
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

function show_footer()
{
  $('#v4constant_foot').show();
}