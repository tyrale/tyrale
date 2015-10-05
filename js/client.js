$(document).ready(function() {
  var fancyHeader = false;
  if(!fancyHeader){
      $("h2 a").each(function(){
          var $this = $(this);
          var gameName = $this.html()
          $this.attr('data-content', gameName);
      });
      fancyHeader = true;
  }
});
