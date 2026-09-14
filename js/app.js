const grid = document.getElementById("propertyGrid");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const toast = document.getElementById("toast");


/* EMPTY PROPERTY STATE */

grid.innerHTML = `
  <div class="empty-properties">
    <div class="empty-icon">⌂</div>

    <h3>Properties Are Coming Soon</h3>

    <p>
      We're preparing verified properties across Port Harcourt.
      Check back soon or be among the first to list a property.
    </p>

    <a href="#list" class="btn">
      List Your Property
    </a>
  </div>
`;


/* TOAST */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);

}


/* MOBILE MENU */

menuBtn.addEventListener("click", () => {

  navMenu.classList.toggle("open");

});


/* CLOSE MOBILE MENU */

document.querySelectorAll("#navMenu a").forEach(link => {

  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });

});


/* BUTTON NOTIFICATIONS */

document.querySelectorAll("[data-toast]").forEach(button => {

  button.addEventListener("click", event => {

    event.preventDefault();

    showToast(button.dataset.toast);

  });

});


/* SEARCH */

document.getElementById("searchForm").addEventListener("submit", event => {

  event.preventDefault();

  showToast(
    "Property search will be available when listings go live."
  );

});
