
/* SESAJAYA - PREMIUM SMOOTH SCROLL */

document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll('a[href^="#"]');
    let animationFrame = null;
/** @param {Element} target */
function smoothScroll(target) {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        const start = window.scrollY;
        const header = document.querySelector("header");
        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition =
            window.scrollY +
            target.getBoundingClientRect().top -
            headerHeight - 10;

        const distance = targetPosition - start;

        const duration = window.innerWidth <= 600
            ? 1800
            : window.innerWidth <= 1024
                ? 2000
                : 1800;

        const startTime = performance.now();
/** @param {number} currentTime */
function animate(currentTime) {
  const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, start + distance * ease);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                animationFrame = null;
            }
        }

        animationFrame = requestAnimationFrame(animate);
    }

    function stopScroll() {
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    window.addEventListener("wheel", stopScroll, { passive: true });
    window.addEventListener("touchstart", stopScroll, { passive: true });
    window.addEventListener("keydown", stopScroll);

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");
            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            if (window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches) {
                stopScroll();
                target.scrollIntoView();
                return;
            }

            smoothScroll(target);
        });
    });

});
