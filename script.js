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
      navlinks.classList.toggle("show");
    });

    navlinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navlinks.classList.remove("open");
        navlinks.classList.remove("show");
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
      body.classList.toggle("light");
      const isLight = body.classList.contains("light");
      themeToggle.textContent = isLight ? "☀️" : "🌙";
    });
  }

  // ==========================================
  // 5. TYPING ANIMATION
  // ==========================================
  const typingElement = document.getElementById("typing");
  if (typingElement) {
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
  // 9. ABOUT SECTION TOGGLE BOX
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
  // 10. PROJECT & AWARD MODAL SYSTEM WITH IMAGES
  // ==========================================
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");

  const projectDetails = {
    "rag-chatbot": `
      <h3>FAQ AI Chatbot (PoC)</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Mandrill Tech | Python • LlamaIndex • RAG • Vector Embeddings</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Built an enterprise Retrieval-Augmented Generation (RAG) chatbot for public sector FAQ dataset queries using LlamaIndex.</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6; margin-bottom: 20px;">
        <li>Developed vector store index, query engine, and an admin portal with automated email notifications.</li>
        <li>Conducted robustness testing and compiled full PoC technical documentation and proposal specifications.</li>
      </ul>
      <h4 style="margin-bottom:12px;">Project Screenshots</h4>
      <div class="modal-gallery">
        <img src="assets/mtib1.png" alt="FAQ Chatbot interface 1" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/mtib2.png" alt="FAQ Chatbot interface 2" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/mtib3.png" alt="FAQ Chatbot interface 3" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/mtib4.png" alt="FAQ Chatbot interface 4" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1);" />
      </div>
    `,
    "encryptify": `
      <h3>Encryptify (FYP) — Handwritten Text Encryption System</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Python • OCR • Machine Learning • Cryptography</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Developed a desktop application to securely encrypt and decrypt handwritten text from images.</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6; margin-bottom: 20px;">
        <li>Implemented OCR to extract text from handwritten images for processing.</li>
        <li>Applied machine learning techniques to generate unique encryption keys.</li>
        <li>Integrated secure authentication using password hashing for user access control.</li>
        <li>Demonstrated encryption using classical algorithms (Vigenère and Caesar ciphers).</li>
      </ul>
      <h4 style="margin-bottom:12px;">Application Interface</h4>
      <div class="modal-gallery">
      </div>
    `,
    "car-sales": `
      <h3>BMW Car Sales Forecasting (PoC)</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Mandrill Tech | Python • Matplotlib • Seaborn • Tableau</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Built and evaluated multivariate machine learning forecasting models using Python to predict vehicle sales trends from historical data (2010–2024).</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6;">
        <li>Executed Exploratory Data Analysis (EDA), feature engineering with time-series lag variables, and modular preprocessing workflows.</li>
        <li>Visualized predictions and evaluation metrics across different temporal horizons.</li>
      </ul>
    `,
    "pnl-dashboard": `
      <h3>PnL Financial Analytics Dashboard</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Personal Project | HTML5 • CSS3 • JavaScript • D3.js v7 • GitHub Pages</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Built a serverless, highly interactive financial analytics dashboard rendering real-time Profit & Loss (P&L) metrics across global operating regions.</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6; margin-bottom: 20px;">
        <li>Engineered custom D3.js interactive charts (grouped bar graphs for Revenue vs Expenses and line charts for Margin Trends).</li>
        <li>Implemented client-side dynamic filtering across date ranges, business categories (SaaS vs Services), and regions with real-time aggregation (Monthly vs Quarterly).</li>
        <li>Integrated automated KPI calculations, structured data tables, and dynamic CSV export capability.</li>
      </ul>
      <h4 style="margin-bottom:12px;">Dashboard Previews</h4>
      <div class="modal-gallery">
        <img src="assets/pnl1.png" alt="PnL Dashboard View 1" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/pnl2.png" alt="PnL Dashboard View 2" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/pnl3.png" alt="PnL Dashboard View 3" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
      </div>
      <div style="margin-top:20px;">
        <a href="https://nurezyfathia-ezy.github.io/pn-dashboard.html/" target="_blank" rel="noreferrer" class="btn btn-primary micro" style="text-decoration:none; display:inline-block;">
          🚀 Open Live Demo
        </a>
      </div>
    `,
    "elas": `
      <h3>Employee Learning and Advancement System (ELAS)</h3>
      <p class="tag" style="margin: 8px 0; font-weight:600; color:var(--accent,#4f46e5);">Developer & Analyst | Final Year Project</p>
      <hr style="margin:12px 0; opacity:0.2;" />
      <p>Replaced manual spreadsheet tracking with a centralized web platform, streamlining development records for 100+ employees.</p>
      <ul style="padding-left:18px; margin-top:10px; line-height:1.6; margin-bottom: 20px;">
        <li>Implemented automated logic to calculate Continuing Professional Education (CPE) points, reducing processing time by 80%.</li>
        <li>Designed 5 interactive dashboards enabling real-time monitoring of training progress, increasing compliance visibility by 95%.</li>
      </ul>
      <h4 style="margin-bottom:12px;">System Dashboards</h4>
      <div class="modal-gallery">
        <img src="assets/elas1.png" alt="ELAS dashboard view 1" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/elas2.png" alt="ELAS dashboard view 2" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1); margin-bottom:10px;" />
        <img src="assets/elas3.png" alt="ELAS dashboard view 3" class="landscape-img" style="border-radius:10px; border:1px solid rgba(255,255,255,0.1);" />
      </div>
    `,
    "awards": `
      <h3>Honours & Awards Details</h3>
      <hr style="margin:12px 0; opacity:0.2;" />
      <ul style="padding-left:18px; line-height:1.8;">
        <li><strong>Dean's List Award:</strong> Albukhary International University (2024–2026)</li>
        <li><strong>Best Projects Poster Award:</strong> Albukhary International University (2023)</li>
        <li><strong>First Class Honours Dean Scholarship Award (JPA):</strong> Management & Science University (2022)</li>
        <li><strong>Best Student Award (CS Award):</strong> Management & Science University (2021)</li>
      </ul>
    `
  };

  // Open Modal
  document.querySelectorAll("[data-modal], [data-award]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-modal") || btn.getAttribute("data-award");
      if (modal && modalContent && projectDetails[key]) {
        modalContent.innerHTML = projectDetails[key];
        modal.classList.add("active");
        modal.classList.add("show");
      }
    });
  });

  // Close Modal
  if (modalClose && modal) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
      modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modal.classList.remove("show");
      }
    });
  }
});
