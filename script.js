function calculateQuote() {
  const size = parseInt(document.getElementById('size').value) || 0;
  const conservatory = parseInt(document.getElementById('conservatory').value) || 0;

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}

/* =========================
   NAVIGATION (ROBUST FETCH SAFE VERSION)
========================= */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".links");

  if (!toggle || !links) return false;

  if (!toggle.dataset.bound) {
    toggle.dataset.bound = "true";

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  document.querySelectorAll(".dropbtn").forEach(btn => {
    if (!btn.dataset.bound) {
      btn.dataset.bound = "true";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        btn.closest(".dropdown").classList.toggle("open");
      });
    }
  });

  return true;
}

/* KEEP CHECKING UNTIL NAV EXISTS (THIS IS THE FIX) */
document.addEventListener("DOMContentLoaded", () => {
  const check = setInterval(() => {
    if (initNav()) {
      clearInterval(check);
    }
  }, 100);
});
