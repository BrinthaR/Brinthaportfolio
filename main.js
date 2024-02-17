document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Navbar on scrolling
    window.addEventListener("scroll", function () {
        var navbar = document.querySelector('.navbar');
        if (window.scrollY > 200) {
            navbar.style.display = 'flex';
            navbar.style.opacity = '1';
        } else {
            navbar.style.display = 'none';
            navbar.style.opacity = '0';
        }
    });

    // Smooth scrolling on the navbar links
    var navbarLinks = document.querySelectorAll(".navbar-nav a");
    navbarLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            if (link.hash !== "") {
                event.preventDefault();
                var targetElement = document.querySelector(link.hash);
                var offset = 45;

                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Add 'active' class to the clicked link's parent if it's in navbar
                if (link.closest('.navbar-nav')) {
                    document.querySelector('.navbar-nav .active').classList.remove('active');
                    link.closest('a').classList.add('active');
                }
            }
        });
    });

    // Typed Initiate
    if (document.querySelector('.typed-text-output')) {
        var typedStrings = document.querySelector('.typed-text').textContent;
        var typed = new Typed('.typed-text-output', {
            strings: typedStrings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Scroll to Bottom
    window.addEventListener("scroll", function () {
        var scrollButton = document.querySelector('.scroll-to-bottom');
        if (window.scrollY > 100) {
            scrollButton.style.display = 'none';
        } else {
            scrollButton.style.display = 'block';
        }
    });

    // Skills
    var skills = document.querySelectorAll('.skill');
    skills.forEach(function (skill) {
        new Waypoint({
            element: skill,
            handler: function () {
                var progressBar = skill.querySelector('.progress .progress-bar');
                progressBar.style.width = progressBar.getAttribute('aria-valuenow') + '%';
            },
            offset: '80%'
        });
    });

    // Portfolio isotope and filter
    var portfolioIsotope = new Isotope('.portfolio-container', {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    var portfolioFilters = document.querySelectorAll('#portfolio-flters li');
    portfolioFilters.forEach(function (filter) {
        filter.addEventListener('click', function () {
            portfolioFilters.forEach(function (f) {
                f.classList.remove('active');
            });
            filter.classList.add('active');
            portfolioIsotope.arrange({ filter: filter.getAttribute('data-filter') });
        });
    });

    // Back to top button
    window.addEventListener("scroll", function () {
        var backButton = document.querySelector('.back-to-top');
        if (window.scrollY > 200) {
            backButton.style.display = 'block';
        } else {
            backButton.style.display = 'none';
        }
    });

    document.querySelector('.back-to-top').addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Testimonials carousel
    var testimonialsCarousel = document.querySelector(".testimonial-carousel");
    if (testimonialsCarousel) {
        new OwlCarousel({
            container: testimonialsCarousel,
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            items: 1
        });
    }

    emailjs.init("service_zd6zl6b"); // Replace with your Email.js user ID
    
    document.getElementById('sendMessageButton').addEventListener('click', function () {
        const name = document.getElementById('name').value; // Replace 'name' with the actual input field ID
        const email = document.getElementById('email').value; // Replace 'email' with the actual input field ID
        const subject = document.getElementById('subject').value; // Replace 'subject' with the actual input field ID
        const message = document.getElementById('message').value;

        emailjs.send("service_zd6zl6b", "template_0i235gp", {
            from_name: name,
            from_email: email,
            message_subject: subject,
            message_html: message
        }).then(
            function (response) {
                console.log("Email sent successfully:", response);
            },
            function (error) {
                console.log("Email failed to send:", error);
            }
        );
    });
});
