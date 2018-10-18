$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        center: true,
        autoWidth: true,
        responsiveClass: true,
        // autoplay: true,
        // autoplayTimeout: 3000,
        // autoplayHoverPause: true,
        dots: false,
        responsive: {
            420: {
                items: 1,
                nav: true,
            },
            960: {
                items: 3,
                nav: true,
            },
            1280: {
                items: 5,
                nav: true,
            }
        }
    });
});