document.addEventListener('DOMContentLoaded', function() {
    // Navbar
    const sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav);
    
    // Slider
    const slider = document.querySelectorAll('.slider');
    M.Slider.init(slider, {
        indicators: false,
        height: 400,
        transition: 600,
        interval: 3000
    });

    const parallax = document.querySelectorAll('.parallax');
    M.Parallax.init(parallax, {
        responsiveThreshold: 10
    });

    const scroll = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scroll, {
        scrollOffset: 30
    });
});
