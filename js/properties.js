const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const toast = document.getElementById("toast");

const searchForm = document.getElementById("propertySearchForm");
const searchLocation = document.getElementById("searchLocation");
const searchType = document.getElementById("searchType");
const searchPrice = document.getElementById("searchPrice");
const sortProperties = document.getElementById("sortProperties");
const resultsTitle = document.getElementById("resultsTitle");


/* =========================================
   TOAST
   ========================================= */

function showToast(message){

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


/* CLOSE MENU AFTER LINK CLICK */

document.querySelectorAll("#navMenu a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

  });

});


/* =========================================
   URL PROPERTY TYPE
   ========================================= */

const urlParams = new URLSearchParams(
  window.location.search
);

const urlType = urlParams.get("type");


if(urlType){

  searchType.value = urlType;

  updateResultsTitle(urlType);

}


/* =========================================
   RESULTS TITLE
   ========================================= */

function updateResultsTitle(type){

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
   SEARCH
   ========================================= */

searchForm.addEventListener("submit", event => {

  event.preventDefault();


  const location =
    searchLocation.value.trim();

  const type =
    searchType.value;

  const price =
    searchPrice.value;


  if(type){

    updateResultsTitle(type);

  }else{

    resultsTitle.textContent = "Properties";

  }


  showToast(
    "Property search will be available when listings go live."
  );

});


/* =========================================
   SORT
   ========================================= */

sortProperties.addEventListener("change", () => {

  showToast(
    "Sorting will be available when listings go live."
  );

});


/* =========================================
   INITIAL STATE
   ========================================= */

if(!urlType){

  resultsTitle.textContent = "Properties";

  }
