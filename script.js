const recipies = [];
 
const categoryNames = { 
  entree: "Entrée", plat: "Plat principal", dessert: "Dessert" };
const slotNames = { 
  entree: "Entrée", plat: "Plat", dessert: "Dessert" };
const badgeNames = { 
  bio: "Bio", vegetarien: "Végétarien", classique: "Classique" };
 
const categoryColors = {
  entree: "bg-emerald-100 text-emerald-800",
  plat: "bg-orange-100 text-orange-800",
  dessert: "bg-pink-100 text-pink-800"
};

const badgeColors = {
  bio: "bg-lime-100 text-lime-800",
  vegetarien: "bg-teal-100 text-teal-800",
  classique: "bg-stone-100 text-stone-700"
};
 

function saveData() {
  localStorage.setItem("recipies", JSON.stringify(recipies));
}




//Ajouter
const btnAjouter = document.getElementById('Ajouter');
const modal = document.getElementById('modal');
 
btnAjouter.addEventListener('click', function(){
  modal.classList.remove('hidden');
  modal.classList.add('flex');
});
 

const button_ReciptCancel = document.getElementById("btn-recipt-cancel");
 
button_ReciptCancel.addEventListener("click", function(){
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});
 
//submit  
const button_ReciptSubmet = document.getElementById("btn-recipt-submit");
 
button_ReciptSubmet.addEventListener("click", function(event){
 
  event.preventDefault();
 
  let input_recipt_name = document.getElementById("input-recipt-name");
  if (input_recipt_name.value.trim().length < 3 || input_recipt_name.value.trim().length > 30) {
    console.log("Nom invalide");
    return;
  }
 
  let input_recipt_price = document.getElementById("input-recipt-price");
  let price = Number(input_recipt_price.value.replace(",", "."));
  if (isNaN(price) || price <= 0) {
    console.log("Prix invalide");
    return;
  }
 
  let option_recipt_category = document.getElementById("recipt-option-category");
  if (option_recipt_category.value === "") {
    console.log("Catégorie manquante");
    return;
  }
 
  let option_recipt_badge = document.getElementById("recipt-option-qalific");
  if (option_recipt_badge.value === "") {
    console.log("Badge manquant");
    return;
  }
 
  console.log("Recette valide :", input_recipt_name.value, price, option_recipt_category.value, option_recipt_badge.value);
 
  //Ajouter la recette dans le tableau
  recipies.push({
    id: Date.now(),       //date pour select recette planning       
    name: input_recipt_name.value.trim(),   //les espaces
    price: price,
    category: option_recipt_category.value,
    badge: option_recipt_badge.value,   
    day: null,           //aucun     
    slot: null                //reservation des dates  
  });
 
  //Affiche la reserve et les listes du planning
  showReserve();
  fillSelects();
  //vider le formulaire

  document.getElementById("recipe-form").reset();
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});


const reserveList = document.getElementById("reserve-list");
const reserveCount = document.getElementById("reserve-count"); //plat disponible

function capitalize(text) {
  return text.charAt(0).toUpperCase() +  text.slice(1);
}

function escapeHtml (text){
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML.replace(/"/g, "&quot;");
}

function showReserve() {
  reserveList.innerHTML ="";

  if(recipies.length === 0)
  {
    reserveList.innerHTML= '<li class="py-6 text-center text-sm text-stone-500">Aucune recette dans la réserve</li>';
  }
  //on passe sur chaque recette du premiere a la dernier 

  for(let i=0; i<recipies.length; i++)
  {
    const recipe= recipies[i];
    const locked= recipe.day !== null;
    const name = escapeHtml(recipe.name);
     //si elle est deja reservee
    
    //le texte du bas seulement n est pas locked dans ce cas

    let assignedText = "";
    if(locked){
      assignedText = '<p class="mt-2 rounded-lg border border-stone-200 px-2 text-sm text-stone-600">'
                      + '✓ [Assigné : ' + capitalize(recipe.day) + '-' + slotNames[recipe.slot] + ']</p>';
    }

    //si la carte est assigne elle devient transparente
    let opacity ="";
    if (locked) {
      opacity = "opacity-60";
    }

    // les boutons doient se bloques 
    let disabled = "";
    if (locked) {
      disabled = "disabled";
    }

    reserveList.innerHTML +=
    `<li data-id="${recipe.id}" data-category="${recipe.category}" 
          class="task rounded-2xl border border-stone-200 p-4 ${opacity}">
            <div class="flex items-start justify-between gap-2">
                <p class="flex flex-wrap gap-2">
                  <span class="rounded-full px-2 py-0.5 text-xs font-bold ${categoryColors [recipe.category]}">
                  ${categoryNames[recipe.category]}</span>
                  
                  <span class="rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColors [recipe.badge]}">
                  ${badgeNames[recipe.badge]}</span>
                        </p>
                        <p class="flex gap-1">
                            <button type="button"
                            data-action="edit"
                            aria-label="Modifier ${name}" ${disabled}
                            class="px-1 text-gray-400 hover:text-gray-700
                            transition-colors disabled:cursor-not-allowed
                            disabled:opacity-40">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            width="18" height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true">
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L10 16l-4 1 1-4Z"/>
                            </svg>
                            </button>
                            
                            <button type="button"
                                data-action="delete"
                                aria-label="Supprimer ${name}" ${disabled}
                                class="px-1 text-gray-400 hover:text-red-600
                                transition-colors disabled:cursor-not-allowed
                                disabled:opacity-40">
                            
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="18" height="18"
                                     viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor"
                                     stroke-width="1.8"
                                     stroke-linecap="round"
                                     stroke-linejoin="round"
                                     aria-hidden="true">
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4h8v2"/>
                                    <path d="m19 6-1 14H6L5 6"/>
                                    <path d="M10 11v5"/>
                                    <path d="M14 11v5"/>
                                </svg>
                            </button>                            
                        </p>
                        </div>

                        <h3 class="mt-2 text-lg font-bold">${name}</h3>
                        <p class="font-bold text-emerald-700">${recipe.price} DH</p>
                        ${assignedText}
                    </li>`;
  }

//les recettes ne sont pas encore ete choisies 

let available = 0;
for (let i=0; i < recipies.length; i++)
{
  if (recipies[i].day === null)
  {
  available = available + 1;
  }
}
  reserveCount.textContent = available;
}
//remplier select en planning
function fillSelects() {
  const selects = documents.querySelectorAll("#planning-list select");

  //boucle sur chaque liste du planning
  for(let s=0; s< selects.length; s++)
  {
    const select = selects[s];
    const day = select.closest("[data-day]").dataset.day; // set data des jours de la semaine

    const slot = select.dataset.slot;
    
    select.innerHTML = '<option value="">En réserve</option>';
    let chosen = null;

    //boucle pour chaque recette
    for(let i=0; i< recipies.length; i++)
    {
      const recipe = recipies[i];
      const isHere = recipe.day === day && recipe.slot === slot;

      if (recipe.category === slot && (recipe.day === null || isHere)) {
        const option = document.createElement("option");
        option.value = recipe.id;
        option.textContent = recipe.name + " . "+ recipe.price + " DH";
        if(isHere) {
          option.selected = true;
          chosen = recipe;
        }
        select.appendChild(option);
      }
    }
    showSlotInfo(select, chosen)
  }
} 
loadData();
showReserve();
fillSelects();

//delegation d evenement choisir la recette dans le planning un seul ecouteur sut conteneur
const planningList = document.getElementById("planning-list");

if (planningList === null)
{
  console.log("planning-list introuvable");
}
else{
  planningList.addEventListener("change", function(event){
    const select = event.target;
    if(!select.dataset.slot)
    {
      return;
    }

    const day = select.closest("[data-day]").dataset.day;
    const slot = select.dataset.slot;
    
    for(let i=0; i< recipies.length; i++)
    {
      if (recipies[i].day === day && recipies[i].slot === slot)
      {
        recipies[i].day = null ;
        recipies[i].slot = null ;
      }
    }

    if (select.value !== ""){
      for(let i=0; i<recipies.length; i++){
        if (String(recipies[i].id) === select.value){
          recipies[i].day = day;
          recipies[i].slot = slot;
        }
      }
    }
  saveData();
  showReserve();
  fillSelects();  
  });
}


