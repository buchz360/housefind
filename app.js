const properties=[
["Modern 2 Bedroom Apartment","GRA Phase 2, Port Harcourt","₦2,500,000","/year","2 Beds","2 Baths","Parking",""],
["4 Bedroom Duplex","Eliozu, Port Harcourt","₦85,000,000","","4 Beds","4 Baths","Parking","two"],
["Self-Contained Apartment","Woji, Port Harcourt","₦1,800,000","/year","1 Bed","1 Bath","Parking","three"],
["5 Bedroom Detached House","Old GRA, Port Harcourt","₦120,000,000","","5 Beds","5 Baths","Parking","four"]
];
const areas=["GRA","Rumuola","Woji","Peter Odili","Eliozu","Trans Amadi"];
const grid=document.getElementById("property-grid"), areaGrid=document.getElementById("area-grid"), menu=document.getElementById("mobile-menu"), toggle=document.getElementById("menu-toggle"), toast=document.getElementById("toast");
function render(list=properties){grid.innerHTML=list.map(p=>`<article class="property"><div class="property-image ${p[7]}"><span class="badge">✓ Verified</span></div><div class="property-body"><div class="price">${p[2]} <span>${p[3]}</span></div><h3>${p[0]}</h3><div class="location">⌖ ${p[1]}</div><div class="meta"><span>▣ ${p[4]}</span><span>♢ ${p[5]}</span><span>▱ ${p[6]}</span></div></div></article>`).join("")}
areaGrid.innerHTML=areas.map(a=>`<div class="area"><strong>${a}</strong></div>`).join("");
function showToast(t){toast.textContent=t;toast.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>toast.classList.remove("show"),2600)}
toggle.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));
document.querySelectorAll("[data-toast]").forEach(b=>b.addEventListener("click",()=>showToast(b.dataset.toast)));
document.getElementById("search-form").addEventListener("submit",e=>{e.preventDefault();const q=document.getElementById("location").value.trim().toLowerCase();const type=document.getElementById("type").value.toLowerCase();const result=properties.filter(p=>(!q||p[1].toLowerCase().includes(q))&&(!type||p[0].toLowerCase().includes(type)));render(result.length?result:properties);document.getElementById("featured").scrollIntoView({behavior:"smooth"});showToast(result.length?`${result.length} matching properties found.`:"Showing featured properties.")});
render();