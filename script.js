function calculateQuote() {
  const size = parseInt(document.getElementById('size').value) || 0;
  const conservatory = parseInt(document.getElementById('conservatory').value) || 0;

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}

/* =========================
   NAVIGATION (FIXED FOR FETCHED NAV)
========================= */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  document.querySelectorAll(".dropbtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.closest(".dropdown");
      parent.classList.toggle("open");
    });
  });
}

/* run AFTER nav is injected */
document.addEventListener("DOMContentLoaded", () => {
  initNav();

  /* re-run after fetch injection delay */
  const navCheck = setInterval(() => {
    if (document.querySelector(".nav-toggle")) {
      initNav();
      clearInterval(navCheck);
    }
  }, 100);
});
