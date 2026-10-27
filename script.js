document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------------
     1. PRELOADER ANIMATION
  ------------------------------------------------------------- */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    const preloaderTl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove("is-loading");
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            preloader.style.display = "none";
            gsap.from(".site-header", {
              y: -80,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out"
            });
          }
        });
      }
    });

    preloaderTl
      .to(".pulse-icon", {
        scale: 1.2,
        duration: 0.35,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut"
      })
      .to(
        ".ecg-path",
        {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut"
        },
        0
      )
      .to(".preloader-content", {
        y: -15,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
  }

  /* -------------------------------------------------------------
     2. HAMBURGER & MOBILE DRAWER
  ------------------------------------------------------------- */
  const header = document.getElementById("header");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const closeDrawerBtn = document.getElementById("closeDrawerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileOverlay = document.getElementById("mobileOverlay");
  let isMenuOpen = false;

  const drawerTl = gsap.timeline({ paused: true });
  drawerTl
    .to(mobileDrawer, {
      x: "0%",
      duration: 0.4,
      ease: "power3.out"
    })
    .from(
      ".mobile-nav-list li",
      {
        x: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.25,
        ease: "power2.out"
      },
      "-=0.2"
    )
    .from(".mobile-drawer-footer .btn", {
  y: 15,
  opacity: 0,
  stagger: 0.06,
  duration: 0.25,
  ease: "power2.out",
  clearProps: "all"  
})

  function openMenu() {
    isMenuOpen = true;
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    mobileOverlay.classList.add("active");
    drawerTl.play();
  }

  function closeMenu() {
    isMenuOpen = false;
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
    mobileOverlay.classList.remove("active");
    drawerTl.reverse();
  }

  hamburgerBtn.addEventListener("click", () => {
    if (!isMenuOpen) openMenu();
    else closeMenu();
  });

  closeDrawerBtn.addEventListener("click", closeMenu);
  mobileOverlay.addEventListener("click", closeMenu);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMenuOpen) closeMenu();
  });

  /* -------------------------------------------------------------
     3. HEADER SHRINK ON SCROLL
  ------------------------------------------------------------- */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

  /* -------------------------------------------------------------
     4. MULTI-PAGE ACTIVE HIGHLIGHT (HEADER, MOBILE, & FOOTER)
  ------------------------------------------------------------- */
  const allNavLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .footer-nav-link");

  // Extract pure file name from URL (defaults to index.html if on root '/')
  let currentFile = window.location.pathname.split("/").pop().trim();
  if (!currentFile || currentFile === "") {
    currentFile = "index.html";
  }

  allNavLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    const linkFile = linkHref.split("/").pop().trim();

    if (linkFile === currentFile) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});









/* ==========================================================================
   HERO GSAP ENTRANCE, TYPEWRITER & AUTO-CHANGING SLIDER
   ========================================================================== */

// 1. Entrance Animation with clearProps so buttons never remain hidden
gsap.timeline({ defaults: { ease: "power3.out" } })
  .from(".hero-eyebrow", { y: -15, opacity: 0, duration: 0.4 })
  .from(".hero-title", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
  .from(".hero-description", { y: 15, opacity: 0, duration: 0.4 }, "-=0.2")
  .from(".hero-actions .hero-btn", { 
    y: 15, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 0.4, 
    clearProps: "all" // CRITICAL: Restores full visibility and inline styles
  }, "-=0.2")
  .from(".trust-badge", { opacity: 0, y: 10, stagger: 0.06, duration: 0.35, clearProps: "all" }, "-=0.2")
  .from(".hero-visual-grid > *", { scale: 0.95, opacity: 0, stagger: 0.1, duration: 0.5, clearProps: "all" }, "-=0.3");

// 2. Typewriter Text Loop
const words = ["HEALTHCARE.", "FACILITIES.", "DIAGNOSTICS.", "PRECISION."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriterText");

function typeEffect() {
  if (!typewriterEl) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 85;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

// 3. Auto-Changing Doctor Photo Slider (3-second cycle)
const docSlides = document.querySelectorAll(".doctor-slider-viewport .doc-slide");
let currentDocSlide = 0;

function nextDocSlide() {
  if (docSlides.length <= 1) return;
  docSlides[currentDocSlide].classList.remove("active");
  currentDocSlide = (currentDocSlide + 1) % docSlides.length;
  docSlides[currentDocSlide].classList.add("active");
}

let docSlideTimer = setInterval(nextDocSlide, 3000);

const photoCard = document.querySelector(".doctor-photo-card");
if (photoCard) {
  photoCard.addEventListener("mouseenter", () => clearInterval(docSlideTimer));
  photoCard.addEventListener("mouseleave", () => {
    docSlideTimer = setInterval(nextDocSlide, 3000);
  });
}








/* ==========================================================================
   ROBUST AUTO COUNTER (100% WORKING)
   ========================================================================== */
function startCounters() {
  const statCounters = document.querySelectorAll(".stat-counter");
  if (!statCounters.length) return;

  statCounters.forEach((counter) => {
     const targetValue = parseInt(counter.getAttribute("data-target"), 10) || 0;
    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: targetValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = Math.floor(counterObj.val).toLocaleString();
      }
    });
  });
}

 if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".stats-ribbon",
    start: "top 90%",
    once: true,
    onEnter: startCounters
  });
} else {
   const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const statsSection = document.querySelector(".stats-ribbon");
  if (statsSection) observer.observe(statsSection);
}









/* ==========================================================================
   CATEGORY SECTION GSAP SCROLL REVEAL (BULLETPROOF)
   ========================================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Reveal Section Header
  gsap.fromTo(
    ".facility-categories .section-head-wrapper",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".facility-categories",
        start: "top 85%",
        once: true
      }
    }
  );

  // 2. Staggered Reveal for the 8 Cards
  gsap.fromTo(
    ".category-card",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "all", // Never leaves cards locked at opacity: 0
      scrollTrigger: {
        trigger: ".category-grid",
        start: "top 85%",
        once: true
      }
    }
  );
} else {
  // Graceful Fallback if ScrollTrigger is not loaded
  document.querySelectorAll(".category-reveal").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}








/* ==========================================================================
   BENTO SHOWCASE GSAP REVEAL & CONTINUOUS ECG LOOP
   ========================================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Staggered Bento Cards Entrance Reveal
  gsap.fromTo(
    ".bento-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".featured-bento",
        start: "top 82%",
        once: true
      }
    }
  );

  // 2. Draw Spotlight ECG Waveform Once on Scroll, then Pulse Continuously
  const ecgPath = document.querySelector(".spotlight-ecg-path");
  if (ecgPath) {
    ScrollTrigger.create({
      trigger: ".bento-spotlight",
      start: "top 85%",
      once: true,
      onEnter: () => {
        const ecgTl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
        ecgTl
          .fromTo(
            ecgPath,
            { strokeDashoffset: 600 },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut"
            }
          )
          .to(
            ecgPath,
            {
              strokeDashoffset: -600,
              duration: 1.4,
              ease: "power2.in"
            },
            "+=0.2"
          );
      }
    });
  }
}








/* ==========================================================================
   QUALITY SECTION GSAP SCROLL REVEAL (BULLETPROOF)
   ========================================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Left Content Reveal
  gsap.fromTo(
    ".quality-content",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".quality-verify",
        start: "top 82%",
        once: true
      }
    }
  );

  // Staggered Right List Rows
  gsap.fromTo(
    ".quality-card",
    { x: 30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      stagger: 0.09,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".quality-list",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==========================================================================
   PROMO DEAL BANNER GSAP REVEAL & LIVE COUNTDOWN TIMER
   ========================================================================== */
// 1. GSAP Scroll Reveal
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".deal-banner",
    { y: 35, opacity: 0, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".deal-section",
        start: "top 85%",
        once: true
      }
    }
  );
}

// 2. Continuous Live Countdown (Calculates dynamically from now + 9 days)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 9);
targetDate.setHours(targetDate.getHours() + 4);
targetDate.setMinutes(targetDate.getMinutes() + 6);
targetDate.setSeconds(targetDate.getSeconds() + 54);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minsEl = document.getElementById("cdMins");
  const secsEl = document.getElementById("cdSecs");

  if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minsEl) minsEl.textContent = String(minutes).padStart(2, "0");
  if (secsEl) secsEl.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();










/* ==========================================================================
   FACILITY SOLUTIONS INTERACTIVE HOVER / CLICK SWITCHER
   ========================================================================== */
const tabButtons = document.querySelectorAll(".solution-tab-btn");
const solutionPanels = document.querySelectorAll(".solution-panel");

function switchSolution(targetId) {
  // Update Tabs
  tabButtons.forEach((btn) => {
    if (btn.getAttribute("data-target") === targetId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Switch Preview Panels with a smooth GSAP fade & slide
  solutionPanels.forEach((panel) => {
    if (panel.id === `panel-${targetId}`) {
      panel.classList.add("active");
      gsap.fromTo(
        panel,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "all" }
      );
    } else {
      panel.classList.remove("active");
    }
  });
}

// Add both mouseenter (for desktop hover feel) and click (for mobile touch taps)
tabButtons.forEach((btn) => {
  const target = btn.getAttribute("data-target");

  btn.addEventListener("mouseenter", () => switchSolution(target));
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    switchSolution(target);
  });
});

// GSAP Scroll Reveal for the Facility Solutions Section
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".solution-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".facility-solutions",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==========================================================================
   TESTIMONIAL AUTO-CHANGING CAROUSEL WITH GSAP
   ========================================================================== */
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".t-dot");
let currentTestimonial = 0;
let testimonialTimer = null;
const slideDuration = 4000; // 4 Seconds per slide

function showTestimonial(index) {
  if (testimonialSlides.length === 0) return;

  // Update Slides
  testimonialSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
      // GSAP smooth entry
      gsap.fromTo(
        slide,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", clearProps: "all" }
      );
    } else {
      slide.classList.remove("active");
    }
  });

  // Update Pagination Dots
  testimonialDots.forEach((dot, i) => {
    if (i === index) dot.classList.add("active");
    else dot.classList.remove("active");
  });

  currentTestimonial = index;
}

function nextTestimonial() {
  const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
  showTestimonial(nextIndex);
}

function startTestimonialTimer() {
  stopTestimonialTimer();
  testimonialTimer = setInterval(nextTestimonial, slideDuration);
}

function stopTestimonialTimer() {
  if (testimonialTimer) {
    clearInterval(testimonialTimer);
    testimonialTimer = null;
  }
}

// Click on dots to change manually
testimonialDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetIndex = parseInt(dot.getAttribute("data-index"), 10);
    showTestimonial(targetIndex);
    startTestimonialTimer(); // Restart timer on click
  });
});

// Pause on hover
const testimonialContainer = document.querySelector(".testimonial-card-container");
if (testimonialContainer) {
  testimonialContainer.addEventListener("mouseenter", stopTestimonialTimer);
  testimonialContainer.addEventListener("mouseleave", startTestimonialTimer);
}

// Start auto cycle
startTestimonialTimer();

// GSAP Scroll Reveal for Testimonial Section
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".testimonial-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==========================================================================
   FINAL CTA SECTION GSAP SCROLL REVEAL (BULLETPROOF)
   ========================================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".final-cta-card",
    { y: 40, opacity: 0, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".final-cta-section",
        start: "top 85%",
        once: true
      }
    }
  );
}