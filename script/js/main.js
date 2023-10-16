// Event pada saat link di click
$('.page-scroll').on('click', function(event) {
    // Ambil isi href
    var tujuan = $(this).attr('href');
    var elemenHref = $(tujuan);

    // Pindahkan scroll
    $('html, body').animate({
        scrollTop: elemenHref.offset().top - 50
    }, 800, 'easeInSine');

    event.preventDefault()
});

// Parallax
// Ketika windows di load
$(window).on('load', function() {
    $('.about-left').addClass('show');
    $('.about-right').addClass('show');
});

// Ketika di scroll
$(window).scroll(function() {
    var windowScroll = $(this).scrollTop();

    // Jumbotron
    $('.jumbotron img').css({
        'transform' : 'translate(0px, '+ windowScroll/5 +'%)'
    });
    $('.jumbotron h1').css({
        'transform' : 'translate(0px, '+ windowScroll/4 +'%)'
    });
    $('.jumbotron p').css({
        'transform' : 'translate(0px, '+ windowScroll/3 +'%)'
    });

    // Portfolio
    if(windowScroll > $('.portfolio').offset().top - 250) {
        $('.portfolio .card').each(function(i) {
            setTimeout(function() {
                $('.portfolio .card').eq(i).addClass('show');
            }, 500 * (i+1));
        });
    }

    // Certificate
    if(windowScroll > $('.certification').offset().top - 250) {
        $('.certification .card').each(function(i) {
            setTimeout(function() {
                $('.certification .card').eq(i).addClass('show');
            }, 500 * (i+1));
        });
    }
});