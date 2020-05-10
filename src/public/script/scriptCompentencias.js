$(document).ready(function(){
    $('.carousel-control-next').click(function(){
        $("html, body").animate({ scrollTop: 500 }, 600);
    });

    $('.carousel-control-prev').click(function(){
        $("html, body").animate({ scrollTop: 500 }, 600);
    });

    $('.carousel-indicators').click(function(){
        $("html, body").animate({ scrollTop: 500 }, 600);
    });

    $("#encuestaCompentencias").show("drop", 1000);

    $('.carousel').carousel({
        interval: 300000
    });

});
