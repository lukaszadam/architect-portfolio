// Smooth scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Menu button interaction
    const menuBtn = document.querySelector('.menu-btn');
    const navOverlay = document.getElementById('navOverlay');

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('open');
        document.body.style.overflow = navOverlay && navOverlay.classList.contains('open') ? 'hidden' : '';
    });

    // Close overlay when a link is clicked
    if (navOverlay) {
        navOverlay.querySelectorAll('.overlay-link').forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('open');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('.about-section');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Hero video cycling
    const heroVideos = document.querySelectorAll('.hero-background');
    let currentVideo = 0;

    function nextVideo() {
        heroVideos[currentVideo].classList.remove('active');
        currentVideo = (currentVideo + 1) % heroVideos.length;
        heroVideos[currentVideo].classList.add('active');
        heroVideos[currentVideo].currentTime = 0;
        heroVideos[currentVideo].play().catch(() => {});
    }

    heroVideos.forEach((video, index) => {
        video.addEventListener('ended', () => {
            if (index === currentVideo) nextVideo();
        });
    });

    // Explicitly start first video
    heroVideos[0].play().catch(() => {});

    // Fallback: advance after 12s if video doesn't end (e.g. very long clip)
    setInterval(() => {
        if (heroVideos[currentVideo].duration > 12 || isNaN(heroVideos[currentVideo].duration)) {
            nextVideo();
        }
    }, 12000);

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const activeVideo = document.querySelector('.hero-background.active');

        if (activeVideo && scrolled < window.innerHeight) {
            activeVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe work items for fade-in animation
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Nav background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            nav.style.background = 'rgba(26, 26, 26, 0.8)';
        }
    });

    // Add hover effect to footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});
