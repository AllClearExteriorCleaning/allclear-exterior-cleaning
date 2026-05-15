function calculateQuote() {
  const size = parseInt(document.getElementById('size').value) || 0;
  const conservatory = parseInt(document.getElementById('conservatory').value) || 0;

  const total = size + conservatory;

  document.getElementById('result').innerHTML =
    `Estimated 8 Weekly Window Cleaning Price: £${total}`;
}

/* =========================
   NAVIGATION (SAFE + FETCH READY)
========================= */

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".links");

  if (!toggle || !links) return;

  // prevent double binding
  if (toggle.dataset.bound === "true") return;
  toggle.dataset.bound = "true";

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll(".dropbtn").forEach(btn => {
    if (btn.dataset.bound === "true") return;
    btn.dataset.bound = "true";

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.closest(".dropdown");
      parent.classList.toggle("open");
    });
  });
}

/* =========================
   WAIT FOR NAV TO EXIST
========================= */

const navObserver = new MutationObserver(() => {
  if (document.querySelector(".nav-toggle")) {
    initNav();
  }
});

navObserver.observe(document.body, {
  childList: true,
  subtree: true
});
