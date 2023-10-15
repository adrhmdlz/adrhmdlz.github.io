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