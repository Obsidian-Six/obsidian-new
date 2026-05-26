const menuBtn = document.querySelector(".nav__menu");
const navItems = document.querySelector(".nav__items");

if (menuBtn && navItems) {
  menuBtn.addEventListener("click", () => {
    const isOpened = navItems.getAttribute("data-opened") === "true";
    navItems.setAttribute("data-opened", !isOpened);
    menuBtn.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", !isOpened);
  });
}

// Video Play Control Logic
const videoWrapper = document.getElementById("e-commerce-video-wrapper");
const video = document.getElementById("e-commerce-video");
if (videoWrapper && video) {
  videoWrapper.addEventListener("mouseenter", () => {
    video.play();
  });
  videoWrapper.addEventListener("mouseleave", () => {
    video.pause();
  });
}

// Reveal animation for elements
const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("reveal");
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target); // stop tracking once revealed
    }
  });
});

elements.forEach((el) => observer.observe(el));
