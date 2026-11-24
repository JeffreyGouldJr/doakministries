document.addEventListener("DOMContentLoaded", function () {

  /* Load header */

  const header = document.getElementById("header");

  if (header) {
    fetch("/includes/header.html")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Header load failed: ${res.status}`);
        }
        return res.text();
      })
      .then(data => {
        header.innerHTML = data;
        initMenu();
      })
      .catch(error => {
        console.error("Error loading header:", error);
      });
  }

  /* Load footer */

  const footer = document.getElementById("footer");

  if (footer) {
    fetch("/includes/footer.html")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Footer load failed: ${res.status}`);
        }
        return res.text();
      })
      .then(data => {
        footer.innerHTML = data;
      })
      .catch(error => {
        console.error("Error loading footer:", error);
      });
  }

});


function initMenu() {

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      toggle.setAttribute("aria-expanded", "false");

    });

  });


  /* Active navigation highlight */

  let currentPath = window.location.pathname;

  /* Remove trailing slash except for homepage */
  if (currentPath.length > 1) {
    currentPath = currentPath.replace(/\/$/, "");
  }

  /* Treat .html URLs the same as clean URLs */
  currentPath = currentPath.replace(/\.html$/, "");

  /* Convert /index to homepage */
  if (currentPath === "/index") {
    currentPath = "/";
  }

  nav.querySelectorAll("a").forEach(link => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("mailto")
    ) {
      return;
    }

    let linkPath = href;

    if (linkPath.length > 1) {
      linkPath = linkPath.replace(/\/$/, "");
    }

    linkPath = linkPath.replace(/\.html$/, "");

    if (linkPath === "/index") {
      linkPath = "/";
    }

    if (linkPath === currentPath) {
      link.classList.add("active");
    }

  });

}
