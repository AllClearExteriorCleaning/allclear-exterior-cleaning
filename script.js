function calculateQuote() {
  const size = parseInt(document.getElementById('size').value) || 0;
  const conservatory = parseInt(document.getElementById('conservatory').value) || 0;

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}

/* =========================
   NAV INITIALISATION (FIXED)
========================= */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".links");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  /* dropdown click support */
  document.querySelectorAll(".dropbtn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const dropdown = btn.parentElement;
      dropdown.classList.toggle("open");
    });
  });

  /* close when clicking outside */
  document.addEventListener("click", function (e) {
    const navWrap = document.querySelector(".nav");

    if (!navWrap.contains(e.target)) {
      nav.classList.remove("open");

      document.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("open");
      });

      toggle.setAttribute("aria-expanded", "false");
    }
  });
}
