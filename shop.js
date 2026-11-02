document.addEventListener("DOMContentLoaded", () => {
  /* ==============================================================
     1. AUTO-TYPING HEADLINE ANIMATION
  ============================================================== */
  const words = ["SMARTER", "BETTER", "PRECISE", "SAFER"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextEl = document.getElementById("typedText");
  const typeSpeed = 120;
  const backSpeed = 70;
  const delayBetweenWords = 1800;

  function typeEffect() {
    if (!typedTextEl) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      currentSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      currentSpeed = 350;
    }

    setTimeout(typeEffect, currentSpeed);
  }

  typeEffect();

  /* ==============================================================
     2. SEARCH BAR VALIDATION & REDIRECTION LOGIC
  ============================================================== */
  const searchForm = document.getElementById("shopSearchForm");
  const searchInput = document.getElementById("shopSearchInput");
  const searchGroup = document.querySelector(".search-input-group");
  const feedbackBox = document.getElementById("searchFeedback");
  const popularPills = document.querySelectorAll(".popular-pill");

  function processSearchQuery(query) {
    const trimmed = query.trim();

    // 1. Validation: Ensure query is not empty and has >= 3 chars
    if (!trimmed || trimmed.length < 3) {
      // Trigger error state & shake
      searchGroup.classList.remove("shake-error");
      void searchGroup.offsetWidth; // Force DOM reflow to retrigger animation
      searchGroup.classList.add("shake-error");

      feedbackBox.innerHTML = `
        <span class="feedback-msg feedback-error">
          <i class="fa-solid fa-circle-exclamation"></i>
          Please enter at least 3 letters to search clinical guides.
        </span>
      `;
      searchInput.focus();
      return;
    }

    // 2. Validation Succeeded: Show Success Message & Redirect to error.html
    feedbackBox.innerHTML = `
      <span class="feedback-msg feedback-success">
        <i class="fa-solid fa-circle-check"></i>
        Searching index for "${trimmed}"... Redirecting to results.
      </span>
    `;

    // Wait 1.2s to display the success message, then navigate to error.html
    setTimeout(() => {
      window.location.href = `error.html?query=${encodeURIComponent(trimmed)}`;
    }, 1200);
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      processSearchQuery(searchInput.value);
    });
  }

  // Quick click on popular pills fills input and runs search
  popularPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const pillVal = pill.getAttribute("data-query");
      if (searchInput) {
        searchInput.value = pillVal;
        processSearchQuery(pillVal);
      }
    });
  });

  // Clear validation messages when typing resumes
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (feedbackBox.innerHTML !== "") {
        feedbackBox.innerHTML = "";
        searchGroup.classList.remove("shake-error");
      }
    });
  }

  /* ==============================================================
     3. GSAP ENTRANCE ANIMATION
  ============================================================== */
  if (typeof gsap !== "undefined") {
    gsap.fromTo(
      ".shop-hero-reveal",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(
      ".shop-hero-image-wrap",
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );
  }
});









/* ==============================================================
   SHOP: FEATURED GUIDE GSAP ENTRANCE & 3D TILT
   ============================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".shop-featured-reveal",
    { y: 40, opacity: 0, scale: 0.98 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".shop-featured-section",
        start: "top 82%",
        once: true
      }
    }
  );
}

// Subtle Desktop Cursor-Follow Tilt on the Image Wrap
const guideImageWrap = document.getElementById("guideImageWrap");
if (guideImageWrap) {
  guideImageWrap.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 768) return;
    const rect = guideImageWrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;

    guideImageWrap.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });

  guideImageWrap.addEventListener("mouseleave", () => {
    guideImageWrap.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
}








/* ==============================================================
   SHOP: HABITS TOPIC FILTERING & GSAP TRANSITION
   ============================================================== */
const habitFilterBtns = document.querySelectorAll(".habit-filter-btn");
const habitCards = document.querySelectorAll(".habit-card");

habitFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Update Active Filter Button
    habitFilterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedCategory = btn.getAttribute("data-filter");

    // 2. Filter & Animate Cards
    habitCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (selectedCategory === "all" || cardCategory === selectedCategory) {
        card.style.display = "flex";
        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            card,
            { opacity: 0, y: 15, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", clearProps: "all" }
          );
        }
      } else {
        card.style.display = "none";
      }
    });
  });
});

// GSAP Scroll Entrance for Habits Section
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".habits-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".shop-habits-section",
        start: "top 82%",
        once: true
      }
    }
  );
}









/* ==============================================================
   SHOP: IN-DEPTH GUIDES SPOTLIGHT CAROUSEL & GSAP REVEAL
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Arrow Navigation Controls
  const prevBtn = document.getElementById("guidePrevBtn");
  const nextBtn = document.getElementById("guideNextBtn");
  const track = document.getElementById("guidesTrack");

  if (prevBtn && nextBtn && track) {
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: 320, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -320, behavior: "smooth" });
    });
  }

  // 2. GSAP Scroll Entrance
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".guides-reveal",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".shop-guides-section",
          start: "top 82%",
          once: true
        }
      }
    );
  }
});









/* ==============================================================
   SHOP: TRENDING ARTICLES GSAP SCROLL REVEAL
   ============================================================== */
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".shop-trending-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".shop-trending-section",
        start: "top 82%",
        once: true
      }
    }
  );

  gsap.fromTo(
    ".ranked-article-item",
    { x: -25, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".ranked-articles-list",
        start: "top 85%",
        once: true
      }
    }
  );

  gsap.fromTo(
    ".topic-tag-pill",
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.04,
      duration: 0.45,
      ease: "back.out(1.7)",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".topics-tags-matrix",
        start: "top 88%",
        once: true
      }
    }
  );
}









/* ==============================================================
   SHOP: FINAL CTA EMAIL VALIDATION & GSAP REVEAL
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const ctaForm = document.getElementById("shopCtaForm");
  const ctaEmail = document.getElementById("ctaEmailInput");
  const ctaInputGroup = document.querySelector(".cta-input-group");
  const ctaFeedback = document.getElementById("ctaFeedback");

  if (ctaForm && ctaEmail) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = ctaEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // 1. Validate Email Input
      if (!val || !emailRegex.test(val)) {
        ctaInputGroup.classList.remove("shake-error");
        void ctaInputGroup.offsetWidth; // Force Reflow
        ctaInputGroup.classList.add("shake-error");

        ctaFeedback.innerHTML = `
          <span class="cta-msg cta-msg-error">
            <i class="fa-solid fa-circle-exclamation"></i>
            Please provide a valid facility or professional email.
          </span>
        `;
        ctaEmail.focus();
        return;
      }

      // 2. Success Feedback & Redirect
      ctaFeedback.innerHTML = `
        <span class="cta-msg cta-msg-success">
          <i class="fa-solid fa-circle-check"></i>
          Subscription confirmed. Forwarding to procurement index...
        </span>
      `;

      setTimeout(() => {
        window.location.href = `error.html?subscribed=${encodeURIComponent(val)}`;
      }, 1200);
    });

    ctaEmail.addEventListener("input", () => {
      if (ctaFeedback.innerHTML !== "") {
        ctaFeedback.innerHTML = "";
        ctaInputGroup.classList.remove("shake-error");
      }
    });
  }

  // GSAP Scroll Entrance
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".shop-cta-reveal",
      { y: 40, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".shop-final-cta-section",
          start: "top 82%",
          once: true
        }
      }
    );
  }
});