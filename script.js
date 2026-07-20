document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DYNAMIC YEAR IN FOOTER
  // ==========================================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ==========================================
  // 2. SCROLL PROGRESS BAR
  // ==========================================
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  });

  // ==========================================
  // 3. NAVBAR SCROLL EFFECT & MOBILE TOGGLE
  // ==========================================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navlinks = document.getElementById("navlinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  if (navToggle && navlinks) {
    navToggle.addEventListener("click", () => {
      navlinks.classList.toggle("open");
    });

    navlinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navlinks.classList.remove("open");
      });
    });
  }

  // ==========================================
  // 4. THEME TOGGLE (DARK / LIGHT MODE)
  // ==========================================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  // ==========================================
  // 5. TYPING ANIMATION (EXACT SAMANTHA LOGIC)
  // ==========================================
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    // Exact Samantha structure: array of roles to cycle through
    const words = [
      "Data Engineer",
      "Data Scientist",
      "Data Analyst",
      "ML Practitioner"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetween = 1500;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetween);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
      } else {
        setTimeout(typeEffect, isDeleting ? deleteSpeed : typeSpeed);
      }
    }

    typeEffect();
  }

  // ==========================================
  // 6. MAGNETIC BUTTONS EFFECT
  // ==========================================
  const magneticBtns = document.querySelectorAll(".magnetic");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px,${y * 0.2}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });

  // ==========================================
  // 7. 3D TILT EFFECT FOR PROJECT CARDS
  // ==========================================
  const tiltCards = document.querySelectorAll(".tilt");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // ==========================================
  // 8. SCROLL REVEAL ANIMATION
  // ==========================================
  const revealCards = document.querySelectorAll(".reveal-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealCards.forEach((card) => observer.observe(card));

  // ==========================================
  // 9. ABOUT SECTION TOGGLE BOX (Education & Languages)
  // ==========================================
  const aboutBox = document.getElementById("aboutBox");
  const aboutButtons = document.querySelectorAll("[data-about]");

  const aboutData = {
    edu: `
      <h5 style="margin-bottom:8px; color:var(--accent,#4f46e5); font-weight:bold;">Academic Background</h5>
      <ul style="padding-left:18px; line-height:1.6;">
        <li><strong>Bachelor of Computer Science (Hons) - Major in Data Science</strong><br/>
            Albukhary International University (Oct 2023 - Nov 2026)<br/>
            <em>CGPA: 3.30</em> | Coursework: Machine Learning, Statistical Methods, Data Mining, OOP, Data Structures, Cloud Computing (GCP).</li>
        <li style="margin-top:10px;"><strong>Diploma in Game Design & Animation</strong><br/>
            Management & Science University (MSU)<br/>
            <em>CGPA: 3.86</em> | Coursework: UI/UX Prototyping, Game Development, Computer Graphics.</li>
      </ul>
    `,
    lang: `
      <h5 style="margin-bottom:8px; color:var(--accent,#4f46e5); font-weight:bold;">Languages & Communication</h5>
      <ul style="padding-left:18px; line-height:1.6;">
        <li><strong>Malay:</strong> Native / Full Professional Proficiency</li>
        <li><strong>English:</strong> Full Professional Proficiency (Written & Spoken)</li>
        <li style="margin-top:8px;"><strong>Communication Strengths:</strong> Experienced in bridging technical data engineering pipelines with business requirements, authoring technical documentation, and drafting SLAs.</li>
      </ul>
    `
  };

  aboutButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-about");
      if (aboutBox && aboutData[type]) {
        aboutBox.innerHTML = aboutData[type];
      }
    });
  });

  // ==========================================
  // 10. PROJECT & AWARD MODAL SYSTEM
  // ==========================================
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");

  const projectDetails = {
    "rag-chatbot": `
      <h3>Public Sector FAQ AI Chatbot (PoC)</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Mandrill Tech | Python • LlamaIndex • RAG • Vector Embeddings</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Built an enterprise Retrieval-Augmented Generation (RAG) chatbot for public sector FAQ dataset queries using LlamaIndex.</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6;">
        <li>Developed vector store index, query engine, and an admin portal with automated email notifications.</li>
        <li>Conducted robustness testing and compiled full PoC technical documentation and proposal specifications.</li>
      </ul>
    `,
    "car-sales": `
      <h3>BMW Car Sales Forecasting (PoC)</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Mandrill Tech | Python • Matplotlib • Seaborn • Tableau</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Built and evaluated multivariate machine learning forecasting models using Python to predict vehicle sales trends from historical data (2010–2024).</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6;">
        <li>Executed Exploratory Data Analysis (EDA), feature engineering with time-series lag variables, and modular preprocessing workflows.</li>
        <li>Visualized predictions and evaluation metrics using Matplotlib, Seaborn, and Tableau dashboards.</li>