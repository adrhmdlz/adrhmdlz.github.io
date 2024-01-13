// Breadcrumb
document.addEventListener("DOMContentLoaded", function () {
    var currentUrl = window.location.href;

    var navLinks = document.querySelectorAll(".nav ul li a");

    navLinks.forEach(function (link) {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });
});

// Efek scroll pada navigasi about.html
document.addEventListener("DOMContentLoaded", function () {
    var scrollLinks = document.querySelectorAll('[data-scroll-to]');

    scrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            var targetId = this.getAttribute('data-scroll-to');

            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});

// Hamburger menu
document.addEventListener("DOMContentLoaded", function () {
    var hamburgerMenu = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav ul');

    hamburgerMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
});

const navSlide = () => {
    const hamburger = document.querySelector(".hamburger");
    const navLists = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
        navLists.classList.toggle("nav-active");
        burger.classList.toggle("toggle-burger");
    });
}

navSlide();