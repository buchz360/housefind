const properties = [
  {
    title: "Modern 2 Bedroom Apartment",
    location: "GRA Phase 2, Port Harcourt",
    price: "₦2,500,000",
    period: "/year",
    beds: "2 Beds",
    baths: "2 Baths"
  },
  {
    title: "4 Bedroom Duplex",
    location: "Eliozu, Port Harcourt",
    price: "₦85,000,000",
    period: "",
    beds: "4 Beds",
    baths: "4 Baths"
  },
  {
    title: "Self-Contained Apartment",
    location: "Woji, Port Harcourt",
    price: "₦1,800,000",
    period: "/year",
    beds: "1 Bed",
    baths: "1 Bath"
  },
  {
    title: "5 Bedroom Detached House",
    location: "Old GRA, Port Harcourt",
    price: "₦120,000,000",
    period: "",
    beds: "5 Beds",
    baths: "5 Baths"
  }
];

const grid = document.getElementById("propertyGrid");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const toast = document.getElementById("toast");


function renderProperties(list = properties) {

  grid.innerHTML = list.map(property => `
    <article class="property">

      <div class="property-image">
        <span class="badge">✓ Verified</span>
      </div>

      <div class="property-body">

        <div class="price">
          ${property.price}
          <span>${property.period}</span>
        </div>

        <h3>${property.title}</h3>

        <div class="location">
          ⌖ ${property.location}
        </div>

        <div class="meta">
          <span>▣ ${property.beds}</span>
          <span>♢ ${property.baths}</span>
          <span>▱ Parking</span>
        </div>

      </div>

    </article>
  `).join("");
}


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


/* CLOSE MOBILE MENU AFTER CLICKING A LINK */

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

  const location =
    document.getElementById("location").value
      .trim()
      .toLowerCase();

  const type =
    document.getElementById("propertyType").value
      .trim()
      .toLowerCase();


  const results = properties.filter(property => {

    const matchesLocation =
      !location ||
      property.location.toLowerCase().includes(location);

    const matchesType =
      !type ||
      (
        type === "rent" &&
        property.period === "/year"
      ) ||
      (
        type === "buy" &&
        property.period === ""
      ) ||
      type === "land" ||
      type === "commercial";

    return matchesLocation && matchesType;

  });


  renderProperties(results.length ? results : properties);


  document.getElementById("properties")
    .scrollIntoView({
      behavior: "smooth"
    });


  if (results.length) {

    showToast(
      `${results.length} matching properties found.`
    );

  } else {

    showToast(
      "No exact match yet. Showing featured properties."
    );

  }

});


/* INITIAL PROPERTY DISPLAY */

renderProperties();
