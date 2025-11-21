// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            
            sec.classList.add('show-animate');
        }
        else{
            sec.classList.remove('show-animate');
        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    //remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    //animation footer on scroll
    const footer = document.querySelector('footer');

    const animateFooter = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
            footer.classList.add('show-animate');
        } else {
            footer.classList.remove('show-animate');
        }
    };

    window.addEventListener('scroll', animateFooter);
    window.addEventListener('load', animateFooter);
    window.addEventListener('resize', animateFooter);
}

// Smooth anchor scrolling with controllable duration
(function() {
    const header = document.querySelector('header');

    const headerHeight = () => header ? header.offsetHeight : 0;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScrollTo(targetY, duration = 900) {
        const startY = window.scrollY;
        const diff = targetY - startY;
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            window.scrollTo(0, Math.round(startY + diff * eased));
            if (elapsed < duration) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offset = -60; 
                const y = Math.max(0, target.offsetTop - headerHeight() - offset);
                
                smoothScrollTo(y, 900);

                // Close mobile menu if open
                const menuIcon = document.querySelector('#menu-icon');
                const navbar = document.querySelector('.navbar');
                if (menuIcon) menuIcon.classList.remove('bx-x');
                if (navbar) navbar.classList.remove('active');
            }
        }, { passive: false });
    });
})();

// Modal About - Abre e fecha o pop-up "Ler mais"
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('aboutModal');
    const openBtn = document.getElementById('openModal');
    const closeBtn = document.querySelector('.modal .close');

    if (openBtn) {
        openBtn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'block';
        }
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // Fecha ao clicar fora do conteúdo
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});