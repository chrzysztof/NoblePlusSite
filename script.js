/* Noble+ — menu mobilne i zmiana tła nagłówka przy przewijaniu (bez bibliotek) */
(function () {
  var header = document.querySelector(".site-header");
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");
  if (!header) return;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (!btn || !nav) return;

  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    nav.classList.toggle("is-open", open);
  }

  btn.addEventListener("click", function () {
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });

  // zamknij po wybraniu pozycji
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  // zamknij klawiszem Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      btn.focus();
    }
  });

  // po powiększeniu okna do układu desktopowego zresetuj stan
  window.matchMedia("(min-width: 48rem)").addEventListener("change", function (e) {
    if (e.matches) setOpen(false);
  });
})();
