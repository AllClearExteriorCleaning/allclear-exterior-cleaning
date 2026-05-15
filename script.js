function calculateQuote() {
  const size = parseInt(document.getElementById('size').value) || 0;
  const conservatory = parseInt(document.getElementById('conservatory').value) || 0;

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}

/* =========================
   NAVIGATION FUNCTIONS
========================= */

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

function toggleDropdown(event) {
  event.preventDefault();
  event.currentTarget.parentElement.classList.toggle("open");
}

/* Optional: close menu when clicking outside */
document.addEventListener("click", function (e) {
  const nav = document.querySelector(".nav");
  const links = document.getElementById("navLinks");

  if (!nav.contains(e.target)) {
    links.classList.remove("active");

    document.querySelectorAll(".dropdown").forEach(d => {
      d.classList.remove("open");
    });
  }
});
