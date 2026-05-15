function calculateQuote() {
  const size = parseInt(document.getElementById('size').value) || 0;
  const conservatory = parseInt(document.getElementById('conservatory').value) || 0;

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}

/* =========================
   MOBILE NAV MENU
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".links");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }

  /* dropdown click support for mobile */
  document.querySelectorAll(".dropbtn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const parent = e.target.closest(".dropdown");
      parent.classList.toggle("open");
    });
  });

  /* close menu when clicking outside */
  document.addEventListener("click", function (e) {
    const navWrap = document.querySelector(".nav");
    const links = document.querySelector(".links");

    if (!navWrap.contains(e.target)) {
      links?.classList.remove("open");

      document.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("open");
      });

      document.querySelector(".nav-toggle")?.setAttribute("aria-expanded", "false");
    }
  });

});
