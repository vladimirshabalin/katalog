$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        center:true,
        autoWidth: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
            },
            960: {
                items: 4,
                nav: true,
            },
            1280: {
                items: 7,
                nav: true,
            }
        }
    });
});