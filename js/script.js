document.addEventListener("DOMContentLoaded", function () {

  /* Load header */
  const header = document.getElementById("header");

  if (header) {
    fetch("/includes/header.html")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Header failed to load: ${res.status}`);
        }

        return res.text();
      })
      .then(data => {
        header.innerHTML = data;
        initMenu();
      })
      .catch(error => {
        console.error("Header error:", error);
      });
  }


  /* Load footer */
  const footer = document.getElementById("footer");

  if (footer) {
    fetch("/includes/footer.html")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Footer failed to load: ${res.status}`);
        }

        return res.text();
      })
      .then(data => {
        footer.innerHTML = data;
      })
      .catch(error => {
        console.error("Footer error:", error);
      });
  }

});


function initMenu() {

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) return;


  /* Mobile menu */

  toggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  /* Close mobile menu when link is selected */

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* Active navigation highlight */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  nav.querySelectorAll("a").forEach(link => {

    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("mailto")
    ) {
      return;
    }

    const linkPage =
      href.split("/").pop() || "index.html";

    if (linkPage === currentPage) {
      link.classList.add("active");
    }

  });

}
