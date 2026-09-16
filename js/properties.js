const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const toast = document.getElementById("toast");

const searchForm = document.getElementById("propertySearchForm");
const searchLocation = document.getElementById("searchLocation");
const searchType = document.getElementById("searchType");
const searchPrice = document.getElementById("searchPrice");
const sortProperties = document.getElementById("sortProperties");
const resultsTitle = document.getElementById("resultsTitle");
const resultsGrid = document.getElementById("resultsGrid");

let allProperties = [];


/* =========================================
   TOAST
   ========================================= */

function showToast(message) {

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);

}


/* =========================================
   MOBILE MENU
   ========================================= */

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("#navMenu a").forEach(link => {

  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });

});


/* =========================================
   RESULTS TITLE
   ========================================= */

function updateResultsTitle(type) {

  const titles = {
    rent: "Homes for Rent",
    buy: "Properties for Sale",
    land: "Land for Sale",
    commercial: "Commercial Properties"
  };

  resultsTitle.textContent =
    titles[type] || "Properties";

}


/* =========================================
   URL TYPE
   ========================================= */

const urlParams =
  new URLSearchParams(window.location.search);

const urlType =
  urlParams.get("type");

if (urlType) {

  searchType.value = urlType;
  updateResultsTitle(urlType);

}


/* =========================================
   HELPERS
   ========================================= */

function escapeHtml(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function formatPropertyType(type) {

  if (!type) {
    return "";
  }

  return type
    .replaceAll("_", " ")
    .replace(/\b\w/g, letter =>
      letter.toUpperCase()
    );

}


function formatBillingPeriod(period) {

  if (!period) {
    return "";
  }

  const periods = {
    yearly: "year",
    annual: "year",
    annually: "year",
    monthly: "month",
    weekly: "week",
    daily: "day"
  };

  return periods[period.toLowerCase()]
    || period.replaceAll("_", " ");

}


/* =========================================
   EMPTY STATE
   ========================================= */

function showEmptyState(
  title = "No Properties Found",
  message = "No matching properties are available yet."
) {

  resultsGrid.innerHTML = `
    <div class="marketplace-empty">

      <div class="empty-icon">
        ⌂
      </div>

      <h3>
        ${escapeHtml(title)}
      </h3>

      <p>
        ${escapeHtml(message)}
      </p>

      <a
        href="index.html#list"
        class="btn"
      >
        List a Property
      </a>

    </div>
  `;

}


/* =========================================
   RENDER PROPERTIES
   ========================================= */

function renderProperties(properties) {

  if (!properties || properties.length === 0) {

    showEmptyState(
      "Properties Are Coming Soon",
      "We're preparing verified properties across Port Harcourt. Check back soon or be among the first to list a property."
    );

    return;

  }


  resultsGrid.innerHTML =
    properties.map(property => {

      const price =
        Number(property.price || 0)
          .toLocaleString("en-NG");


      const location =
        [
          property.area,
          property.city
        ]
        .filter(Boolean)
        .map(escapeHtml)
        .join(", ");


      return `
        <article class="result-card">

          <div class="result-card-image">

            <span class="badge">
              Listed
            </span>

          </div>

          <div class="result-card-body">

            <div class="result-card-price">

              ₦${price}

              ${
                property.billing_period
                  ? `
                    <span>
                      / ${escapeHtml(
                        formatBillingPeriod(
                          property.billing_period
                        )
                      )}
                    </span>
                  `
                  : ""
              }

            </div>


            <h3 class="result-card-title">

              ${escapeHtml(
                property.title
              )}

            </h3>


            <p class="result-card-location">

              ${
                location ||
                "Port Harcourt"
              }

            </p>


            <div class="result-card-meta">

              ${
                property.bedrooms !== null &&
                property.bedrooms !== undefined

                  ? `
                    <span>
                      ${property.bedrooms} Beds
                    </span>
                  `

                  : ""
              }


              ${
                property.bathrooms !== null &&
                property.bathrooms !== undefined

                  ? `
                    <span>
                      ${property.bathrooms} Baths
                    </span>
                  `

                  : ""
              }


              ${
                property.property_type

                  ? `
                    <span>
                      ${escapeHtml(
                        formatPropertyType(
                          property.property_type
                        )
                      )}
                    </span>
                  `

                  : ""
              }

            </div>

          </div>

        </article>
      `;

    }).join("");

}


/* =========================================
   FILTER PROPERTIES
   ========================================= */

function filterProperties() {

  let filtered =
    [...allProperties];


  const location =
    searchLocation.value
      .trim()
      .toLowerCase();


  const type =
    searchType.value;


  const priceRange =
    searchPrice.value;


  if (location) {

    filtered =
      filtered.filter(property => {

        const searchableLocation =
          [
            property.area,
            property.city,
            property.state,
            property.landmark
          ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableLocation
          .includes(location);

      });

  }


  if (type) {

    filtered =
      filtered.filter(property =>
        property.purpose === type
      );

  }


  if (priceRange) {

    filtered =
      filtered.filter(property => {

        const price =
          Number(property.price || 0);


        if (priceRange === "1") {
          return price < 2000000;
        }


        if (priceRange === "2") {

          return (
            price >= 2000000 &&
            price <= 5000000
          );

        }


        if (priceRange === "3") {

          return (
            price > 5000000 &&
            price <= 20000000
          );

        }


        if (priceRange === "4") {
          return price > 20000000;
        }


        return true;

      });

  }


  const sort =
    sortProperties.value;


  if (sort === "low") {

    filtered.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

  }


  if (sort === "high") {

    filtered.sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );

  }


  if (sort === "newest") {

    filtered.sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    );

  }


  renderProperties(filtered);

}


/* =========================================
   SEARCH
   ========================================= */

searchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const type =
      searchType.value;

    if (type) {

      updateResultsTitle(type);

    } else {

      resultsTitle.textContent =
        "Properties";

    }

    filterProperties();

  }
);


/* =========================================
   SORT
   ========================================= */

sortProperties.addEventListener(
  "change",
  () => {

    filterProperties();

  }
);


/* =========================================
   LOAD FROM SUPABASE
   ========================================= */

async function loadProperties() {

  resultsGrid.innerHTML = `
    <div class="marketplace-empty">

      <div class="empty-icon">
        ⌂
      </div>

      <h3>
        Loading Properties
      </h3>

      <p>
        Connecting to the HouseFind marketplace.
      </p>

    </div>
  `;


  const { data, error } =
    await supabaseClient
      .from("properties")
      .select(`
        id,
        title,
        description,
        purpose,
        property_type,
        status,
        price,
        currency,
        billing_period,
        bedrooms,
        bathrooms,
        state,
        city,
        area,
        landmark,
        created_at
      `)
      .eq("status", "published")
      .order(
        "created_at",
        {
          ascending: false
        }
      );


  if (error) {

    console.error(
      "HOUSEFIND SUPABASE ERROR:",
      error
    );


    showEmptyState(
      "Unable to Load Properties",
      "HouseFind could not connect to the property listings. Please try again shortly."
    );

    return;

  }


  allProperties =
    data || [];


  if (urlType) {

    const filteredByUrl =
      allProperties.filter(
        property =>
          property.purpose === urlType
      );

    renderProperties(
      filteredByUrl
    );

  } else {

    renderProperties(
      allProperties
    );

  }

}


/* =========================================
   INITIAL STATE
   ========================================= */

if (!urlType) {

  resultsTitle.textContent =
    "Properties";

}


/* =========================================
   START
   ========================================= */

loadProperties();
