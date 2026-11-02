document.addEventListener("DOMContentLoaded", () => {
  // GSAP Smooth Reveal for About Hero
  if (typeof gsap !== "undefined") {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".about-hero-title", { y: 35, opacity: 0, duration: 0.7 })
      .from(".about-hero-divider", { scaleX: 0, transformOrigin: "left center", duration: 0.6 }, "-=0.3")
      .from(".about-hero-text-col", { y: 20, opacity: 0, duration: 0.5 }, "-=0.2")
      .from(".about-hero-actions-col .btn", { 
        y: 20, 
        opacity: 0, 
        stagger: 0.12, 
        duration: 0.5, 
        clearProps: "all" 
      }, "-=0.2");
  }
});








// GSAP Scroll Reveal for Our Story Section
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".story-reveal",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".about-story-section",
        start: "top 82%",
        once: true
      }
    }
  );

  // Subtle floating micro-animation for stat pill badges
  gsap.to(".stat-center-left", {
    y: "-=6",
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".stat-bottom-right", {
    y: "+=6",
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.2
  });
}








// GSAP Staggered Reveal for Core Values
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".value-card",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.65,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".values-grid",
        start: "top 85%",
        once: true
      }
    }
  );
}








// GSAP Dynamic Pipe-Draw & Flow Sequence Animation
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Entrance Reveal for Header & Circles
  gsap.fromTo(
    ".quality-reveal",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.7,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".about-quality-section",
        start: "top 82%",
        once: true
      }
    }
  );

  // 2. Animated Flow Line Draw & Sequential Node Lighting
  const progressLine = document.getElementById("flowProgressLine");
  const stepNodes = document.querySelectorAll(".flow-step-node");

  ScrollTrigger.create({
    trigger: ".flow-pipeline-container",
    start: "top 78%",
    once: true,
    onEnter: () => {
      const isMobile = window.innerWidth <= 768;
      
      // Animate line fill
      if (progressLine) {
        if (isMobile) {
          gsap.to(progressLine, { height: "100%", duration: 2.2, ease: "power1.inOut" });
        } else {
          gsap.to(progressLine, { width: "100%", duration: 2.2, ease: "power1.inOut" });
        }
      }

      // Sequentially activate nodes as the flow reaches them
      stepNodes.forEach((node, index) => {
        setTimeout(() => {
          node.classList.add("active");
        }, index * 550);
      });
    }
  });
}









// GSAP Reveal & Subtle 3D Tilt for Partnerships Section
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Staggered Entrance Reveal
  gsap.fromTo(
    ".partners-grid .partner-card",
    { y: 35, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.65,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".about-partners-section",
        start: "top 82%",
        once: true
      }
    }
  );

  // Dynamic Cursor-Follow Micro Tilt on Desktop
  const partnerCards = document.querySelectorAll(".partner-card");
  partnerCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltX = (y / (rect.height / 2)) * -5;
      const tiltY = (x / (rect.width / 2)) * 5;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}








// GSAP Entrance Reveal for Final CTA Capsule
if (typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".about-cta-capsule-card",
    { y: 40, opacity: 0, scale: 0.94 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".about-final-cta-section",
        start: "top 85%",
        once: true
      }
    }
  );
}