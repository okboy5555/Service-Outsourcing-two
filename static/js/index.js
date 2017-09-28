$(document).ready(function(){
    // init fontSize to compatible with different of clientWidth and devicePixelRatio
    var deviceWidth = document.documentElement.clientWidth > 640 ? 640 : document.documentElement.clientWidth;
    document.documentElement.style.fontSize = deviceWidth / 10 + 'px';
    var scale = 1 /devicePixelRatio;
    $('meta[name="viewport"]').attr('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  

// fixed virtual keyboard change fixed layout
    var h=$(window).height();
    $(window).resize(function() {
        
        if($(window).height()<h){
            $('.footer').hide();
        }
        if($(window).height()>=h){
            $('.footer').show();
        }
    });

});
    