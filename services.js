document.addEventListener("DOMContentLoaded", () => {
  // GSAP Smooth Reveal for Services Hero
  if (typeof gsap !== "undefined") {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".services-hero-card", { y: 35, opacity: 0, duration: 0.7 })
      .from(".services-hero-title", { y: 25, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".services-hero-desc", { y: 15, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(".service-pill-btn", { 
        y: 15, 
        opacity: 0, 
        stagger: 0.06, 
        duration: 0.4, 
        clearProps: "all" 
      }, "-=0.2");
  }
});









/* ==========================================================================
   SERVICES: PROCUREMENT AUTO IMAGE SWITCHER WITH HOVER PAUSE
   ========================================================================== */
const stageSlides = document.querySelectorAll(".stage-slide");
const stageDots = document.querySelectorAll(".s-dot");
let currentStageIndex = 0;
let stageTimer = null;
const stageIntervalTime = 4000; // 4 seconds per slide

function showStageSlide(index) {
  if (stageSlides.length === 0) return;

  stageSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  stageDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentStageIndex = index;
}

function nextStageSlide() {
  const nextIndex = (currentStageIndex + 1) % stageSlides.length;
  showStageSlide(nextIndex);
}

function startStageTimer() {
  stopStageTimer();
  stageTimer = setInterval(nextStageSlide, stageIntervalTime);
}

function stopStageTimer() {
  if (stageTimer) {
    clearInterval(stageTimer);
    stageTimer = null;
  }
}

// Click on dots to change manually
stageDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIdx = parseInt(dot.getAttribute("data-slide"), 10);
    showStageSlide(slideIdx);
    startStageTimer();
  });
});

// Pause carousel on hover
const stageWrapper = document.getElementById("procurementStage");
if (stageWrapper) {
  stageWrapper.addEventListener("mouseenter", stopStageTimer);
  stageWrapper.addEventListener("mouseleave", startStageTimer);
}

// Start automatic cycling
startStageTimer();

// GSAP Scroll Reveal
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".procurement-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".services-procurement-section",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==========================================================================
   SERVICES: MAINTENANCE SECTION LIVE COUNTDOWN TIMER & GSAP REVEAL
   ========================================================================== */
// 1. Live Countdown
const maintenanceTargetDate = new Date();
maintenanceTargetDate.setDate(maintenanceTargetDate.getDate() + 9);
maintenanceTargetDate.setHours(maintenanceTargetDate.getHours() + 4);
maintenanceTargetDate.setMinutes(maintenanceTargetDate.getMinutes() + 6);
maintenanceTargetDate.setSeconds(maintenanceTargetDate.getSeconds() + 54);

function updateMaintenanceCountdown() {
  const now = new Date().getTime();
  const diff = maintenanceTargetDate - now;

  if (diff < 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const dEl = document.getElementById("mDays");
  const hEl = document.getElementById("mHours");
  const mEl = document.getElementById("mMins");
  const sEl = document.getElementById("mSecs");

  if (dEl) dEl.textContent = String(days).padStart(2, "0");
  if (hEl) hEl.textContent = String(hours).padStart(2, "0");
  if (mEl) mEl.textContent = String(minutes).padStart(2, "0");
  if (sEl) sEl.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateMaintenanceCountdown, 1000);
updateMaintenanceCountdown();

// 2. GSAP Scroll Entrance Reveal
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".maintenance-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".services-maintenance-section",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==========================================================================
   SERVICES: 4-STEP PROCESS ENTRANCE ANIMATION
   ========================================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".process-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".services-process-section",
        start: "top 82%",
        once: true
      }
    }
  );

  gsap.fromTo(
    ".process-node-card",
    { y: 25, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".process-flow-container",
        start: "top 80%",
        once: true
      }
    }
  );
}








/* ==========================================================================
   SERVICES: ACCORDION INTERACTIVITY & ENTRANCE REVEAL
   ========================================================================== */
const faqTriggers = document.querySelectorAll(".faq-trigger");

faqTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const parentItem = trigger.closest(".faq-item");
    const panel = parentItem.querySelector(".faq-panel");
    const isExpanded = trigger.getAttribute("aria-expanded") === "true";

    // Close other sibling open items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== parentItem && item.classList.contains("active")) {
        item.classList.remove("active");
        item.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
        item.querySelector(".faq-panel").style.maxHeight = null;
      }
    });

    // Toggle current item
    if (isExpanded) {
      parentItem.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = null;
    } else {
      parentItem.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// GSAP Scroll Reveal for FAQ Section
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".faq-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".services-faq-section",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==========================================================================
   SERVICES: EXPANDING INDUSTRY CARDS INTERACTIVITY
   ========================================================================== */
const industryCards = document.querySelectorAll(".industry-card");

industryCards.forEach((card) => {
  // Desktop Hover Extension
  card.addEventListener("mouseenter", () => {
    industryCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });

  // Mobile Tap / Click Support
  card.addEventListener("click", () => {
    industryCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// GSAP Scroll Entrance for Industries & Final CTA
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".industries-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".services-industries-section",
        start: "top 82%",
        once: true
      }
    }
  );
}