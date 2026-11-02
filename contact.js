/* ==============================================================
   CONTACT HERO: SEQUENTIAL CHAT ENTRANCE & GENTLE FLOATING PHYSICS
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined") {
    // 1. Initial Left Text Reveal
    gsap.fromTo(
      ".contact-hero-content",
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // 2. Sequential Conversational Entry for Chat Bubbles
    const chatTl = gsap.timeline({ defaults: { ease: "back.out(1.4)", duration: 0.65 } });

    chatTl
      .fromTo(".bubble-1", { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1 }, 0.3)
      .fromTo(".bubble-2", { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1 }, 0.9)
      .fromTo(".bubble-3", { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1 }, 1.5)
      .fromTo(".chat-typing-indicator", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.0);

    // 3. Gentle Continuous Ambient Floating for the Bubbles
    gsap.to(".bubble-1", {
      y: "-=5",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".bubble-2", {
      y: "+=6",
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3
    });

    gsap.to(".bubble-3", {
      y: "-=5",
      duration: 3.0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.6
    });
  }
});









/* ==============================================================
   CONTACT FORM: STRICT INPUT RESTRICTIONS & VALIDATION
   - First Name & Last Name: Letters and spaces only (no numbers/symbols)
   - Phone Number: Formats digits automatically as (XXX) XXX-XXXX
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("visitBookingForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const phone = document.getElementById("phoneNumber");
  const email = document.getElementById("emailAddress");
  const comment = document.getElementById("visitComment");
  const statusBanner = document.getElementById("formStatusBanner");

  // Helper function to set validation error
  function setFieldError(field, errorSpanId, message) {
    const parentGroup = field.closest(".form-group");
    const errorSpan = document.getElementById(errorSpanId);
    if (parentGroup) parentGroup.classList.add("has-error");
    if (errorSpan) errorSpan.textContent = message;
  }

  // Helper function to clear validation error
  function clearFieldError(field, errorSpanId) {
    const parentGroup = field.closest(".form-group");
    const errorSpan = document.getElementById(errorSpanId);
    if (parentGroup) parentGroup.classList.remove("has-error");
    if (errorSpan) errorSpan.textContent = "";
  }

  /* -------------------------------------------------------------
     1. Strict Alphabet-Only Filter for Name Fields
     Prevents numbers and special symbols from ever being typed/pasted
  ------------------------------------------------------------- */
  function enforceAlphabetsOnly(inputElement, errorSpanId) {
    if (!inputElement) return;

    inputElement.addEventListener("input", () => {
      // Strip out anything that is NOT a letter or space
      const cleaned = inputElement.value.replace(/[^a-zA-Z\s]/g, "");
      if (inputElement.value !== cleaned) {
        inputElement.value = cleaned;
      }
      clearFieldError(inputElement, errorSpanId);
      if (statusBanner) statusBanner.innerHTML = "";
    });

    // Block numeric/symbol keystrokes directly
    inputElement.addEventListener("keydown", (e) => {
      const allowedKeys = [
        "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Escape", "Enter"
      ];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;
      
      // If key is NOT a letter or space, prevent input
      if (!/^[a-zA-Z\s]$/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  enforceAlphabetsOnly(firstName, "errFirstName");
  enforceAlphabetsOnly(lastName, "errLastName");

  /* -------------------------------------------------------------
     2. Strict Digits-Only & Live Phone Formatting
     Auto formats to standard 10-digit: (XXX) XXX-XXXX
  ------------------------------------------------------------- */
  if (phone) {
    phone.setAttribute("maxlength", "14");

    phone.addEventListener("input", (e) => {
      // Strip everything except raw digits
      const rawDigits = phone.value.replace(/\D/g, "").substring(0, 10);
      let formatted = "";

      if (rawDigits.length > 0) {
        formatted += "(" + rawDigits.substring(0, 3);
      }
      if (rawDigits.length >= 4) {
        formatted += ") " + rawDigits.substring(3, 6);
      }
      if (rawDigits.length >= 7) {
        formatted += "-" + rawDigits.substring(6, 10);
      }

      phone.value = formatted;
      clearFieldError(phone, "errPhone");
      if (statusBanner) statusBanner.innerHTML = "";
    });

    // Block non-digit keys directly on keydown
    phone.addEventListener("keydown", (e) => {
      const allowedKeys = [
        "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Escape", "Enter"
      ];
      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return;

      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });
  }

  // Clear errors for email and comment
  if (email) {
    email.addEventListener("input", () => {
      clearFieldError(email, "errEmail");
      if (statusBanner) statusBanner.innerHTML = "";
    });
  }

  if (comment) {
    comment.addEventListener("input", () => {
      clearFieldError(comment, "errComment");
      if (statusBanner) statusBanner.innerHTML = "";
    });
  }

  /* -------------------------------------------------------------
     3. Strict Form Submission Validation
  ------------------------------------------------------------- */
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // First Name check: Letters only & minimum 2 characters
      const fNameVal = firstName.value.trim();
      if (!fNameVal || fNameVal.length < 2 || !/^[a-zA-Z\s]+$/.test(fNameVal)) {
        setFieldError(firstName, "errFirstName", "Please enter alphabets only (min 2 letters).");
        isValid = false;
      } else {
        clearFieldError(firstName, "errFirstName");
      }

      // Last Name check: Letters only & minimum 1 character
      const lNameVal = lastName.value.trim();
      if (!lNameVal || lNameVal.length < 1 || !/^[a-zA-Z\s]+$/.test(lNameVal)) {
        setFieldError(lastName, "errLastName", "Please enter alphabets only.");
        isValid = false;
      } else {
        clearFieldError(lastName, "errLastName");
      }

      // Phone Number check: Must contain exactly 10 digits
      const digitsOnly = phone.value.replace(/\D/g, "");
      if (!digitsOnly || digitsOnly.length !== 10) {
        setFieldError(phone, "errPhone", "Please enter a valid 10-digit mobile number.");
        isValid = false;
      } else {
        clearFieldError(phone, "errPhone");
      }

      // Email Address check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        setFieldError(email, "errEmail", "Please enter a valid email address.");
        isValid = false;
      } else {
        clearFieldError(email, "errEmail");
      }

      // Comment check
      if (!comment.value.trim() || comment.value.trim().length < 5) {
        setFieldError(comment, "errComment", "Please provide a brief message (min 5 characters).");
        isValid = false;
      } else {
        clearFieldError(comment, "errComment");
      }

      // If any validation failed, show error banner
      if (!isValid) {
        statusBanner.innerHTML = `
          <div class="status-msg-error">
            <i class="fa-solid fa-circle-exclamation"></i>
            Please correct the highlighted fields before submitting.
          </div>
        `;
        return;
      }

      // Validation succeeded: Show success message and redirect to error.html
      statusBanner.innerHTML = `
        <div class="status-msg-success">
          <i class="fa-solid fa-circle-check"></i>
          Your inquiry has been logged successfully! Redirecting...
        </div>
      `;

      setTimeout(() => {
        window.location.href = `error.html?visit_reserved=true&client=${encodeURIComponent(fNameVal)}`;
      }, 1200);
    });
  }
});









/* ==============================================================
   CONTACT: FOUR CALM STEPS GSAP STAGGERED REVEAL
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".steps-reveal",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".contact-steps-section",
          start: "top 82%",
          once: true
        }
      }
    );

    gsap.fromTo(
      ".calm-step-card",
      { y: 25, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.4)",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".steps-grid-container",
          start: "top 85%",
          once: true
        }
      }
    );
  }
});









/* ==============================================================
   CONTACT: EXPLORE ACCORDION INTERACTIVITY & GSAP REVEAL
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const faqTriggers = document.querySelectorAll(".explore-faq-trigger");

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const parentItem = trigger.closest(".explore-faq-item");
      const panel = parentItem.querySelector(".explore-faq-panel");
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other accordion drawers
      document.querySelectorAll(".explore-faq-item").forEach((item) => {
        if (item !== parentItem && item.classList.contains("active")) {
          item.classList.remove("active");
          item.querySelector(".explore-faq-trigger").setAttribute("aria-expanded", "false");
          item.querySelector(".explore-faq-panel").style.maxHeight = null;
        }
      });

      // Toggle clicked drawer
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

  // GSAP Scroll Entrance Reveal
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".explore-reveal",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".contact-explore-section",
          start: "top 82%",
          once: true
        }
      }
    );
  }
});









/* ==============================================================
   CONTACT: REGIONAL HUBS GSAP STAGGERED REVEAL
   ============================================================== */
document.addEventListener("DOMContentLoaded", () => {
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".hubs-reveal",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".contact-hubs-section",
          start: "top 82%",
          once: true
        }
      }
    );

    gsap.fromTo(
      ".hub-station-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.65,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".hubs-grid-track",
          start: "top 85%",
          once: true
        }
      }
    );
  }
});