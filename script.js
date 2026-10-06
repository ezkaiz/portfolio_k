// Phantom fog particle canvas
(function () {
  const canvas = document.getElementById("fog-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.5 ? "139,92,246" : "34,211,238",
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.a})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.hue},0.8)`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  makeParticles();
  tick();
  window.addEventListener("resize", () => { resize(); makeParticles(); });
})();

// Cursor glow follows mouse
(function () {
  const glow = document.getElementById("cursor-glow");
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
})();

// Scroll progress bar
(function () {
  const bar = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  });
})();

// Mobile nav toggle
(function () {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
})();

// Typing effect
(function () {
  const el = document.getElementById("typed");
  const phrases = ["the void.", "the dark arts.", "Kai's web.", "clean code."];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    el.textContent = phrase.slice(0, ci);
    let delay = deleting ? 55 : 95;

    if (!deleting && ci === phrase.length) {
      delay = 1600;
      deleting = true;
    } else if (deleting && ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      delay = 350;
    }
    ci += deleting ? -1 : 1;
    setTimeout(type, delay);
  }
  type();
})();

// Reveal on scroll
(function () {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.add("visible")),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

// Project filters
(function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
      });
    })
  );
})();

// Contact form validation
(function () {
  const form = document.getElementById("contact-form");
  const error = document.getElementById("cf-error");
  const success = document.getElementById("cf-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    error.textContent = "";
    success.textContent = "";

    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    if (!name) return (error.textContent = "Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return (error.textContent = "Please enter a valid email address.");
    if (message.length < 10)
      return (error.textContent = "Message should be at least 10 characters.");

    // Open Gmail compose addressed to Kyla with the user's details pre-filled.
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=kylapiodos72@gmail.com" +
      "&su=" + encodeURIComponent("Portfolio Inquiry from " + name) +
      "&body=" + encodeURIComponent(body);

    window.open(gmailUrl, "_blank");
    success.textContent = `Thanks, ${name}! Gmail has been opened to send your message.`;
    form.reset();
  });
})();

// Back to top
(function () {
  const btn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
