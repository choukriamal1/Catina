/*
   CANTINE YOUCODE : script.js

   SOMMAIRE
   1. Constantes et données
   2. Éléments de la page
   3. Messages (toast)
   4. Validation du formulaire (Regex, en temps réel)
   5. Fenêtre modale (ouvrir, fermer)
   6. Envoi du formulaire (ajouter ou modifier une recette)
   7. Réserve : affichage et filtres
   8. Réserve : boutons Modifier et Supprimer
   9. Planning : listes, totaux, budget de 50 DH, bouton Vider
   10. Indicateurs du haut de la page
   11. Démarrage
*/


/*
   1. CONSTANTES ET DONNÉES
*/
const MAX_PER_DAY = 50;                       // budget maximum par jour (en DH)
const STORAGE_KEY = "cantine-recipes";        // nom de la sauvegarde dans le navigateur
const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];

// La liste de toutes les recettes. Une recette ressemble à :
// { id: 1, name: "Harira", price: 6, category: "entree", badge: "bio", day: null, slot: null }
// day et slot valent null tant que la recette est dans la réserve.
// Quand elle est placée dans le menu : day = "lundi" et slot = "entree" (par exemple).
const recipes = [];

let editingId = null;     // null = on ajoute une recette ; sinon = id de la recette qu'on modifie

// Textes affichés à l'écran
const categoryNames = { entree: "Entrée", plat: "Plat principal", dessert: "Dessert" };
const slotNames = { entree: "Entrée", plat: "Plat", dessert: "Dessert" };
const badgeNames = { bio: "Bio", vegetarien: "Végétarien", classique: "Classique" };

// Couleurs des badges
const categoryColors = {
  entree: "bg-emerald-100 text-emerald-800",
  plat: "bg-orange-100 text-orange-800",
  dessert: "bg-violet-100 text-violet-800"
};
const badgeColors = {
  bio: "bg-lime-100 text-lime-800",
  vegetarien: "bg-teal-100 text-teal-800",
  classique: "bg-stone-100 text-stone-700"
};

// Sauvegarde : écrit la liste dans le navigateur (elle reste après un rafraîchissement)
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// Chargement : relit la liste sauvegardée
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return;
  }
  try {
    const list = JSON.parse(saved);
    if (Array.isArray(list)) {
      for (const recipe of list) {
        recipes.push(recipe);
      }
    }
  } catch (error) {
    console.log("Données sauvegardées illisibles");
  }
}

// Petites fonctions utiles
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);       // "lundi" devient "Lundi"
}

function escapeHtml(text) {                                   // protège contre du HTML tapé dans un nom
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML.replace(/"/g, "&quot;");
}

function findRecipeById(id) {
  for (const recipe of recipes) {
    if (String(recipe.id) === String(id)) {
      return recipe;
    }
  }
  return null;
}


/*
   2. Element de la page
*/
// Réserve
const reserveList = document.getElementById("reserve-list");
const reserveCount = document.getElementById("reserve-count");
const filters = document.getElementById("filters");
const btnAdd = document.getElementById("btn-add");

// Planning
const planningList = document.getElementById("planning-list");

// Fenêtre modale et formulaire
const modal = document.getElementById("modal");
const modalBox = document.getElementById("modal-box");
const modalTitle = document.getElementById("modal-title");
const btnModalClose = document.getElementById("btn-modal-close");
const btnCancel = document.getElementById("btn-cancel");
const btnSubmit = document.getElementById("btn-submit");
const form = document.getElementById("recipe-form");
const inputName = document.getElementById("recipe-name");
const inputPrice = document.getElementById("recipe-price");
const selectCategory = document.getElementById("recipe-category");
const selectBadge = document.getElementById("recipe-badge");


/*
   3. MESSAGES (TOAST) avec un bouton × pour les fermer
*/
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (container === null) {
    return;
  }

  const toast = document.createElement("div");
  const color = type === "error" ? "bg-red-700" : "bg-emerald-700";
  toast.className = color + " flex items-center gap-4 rounded-xl p-4 text-white shadow-lg";

  const text = document.createElement("span");
  text.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "x";
  closeButton.setAttribute("aria-label", "Fermer le message");
  closeButton.className = "text-xl font-bold";
  closeButton.addEventListener("click", function () {
    toast.remove();
  });

  toast.append(text, closeButton);
  container.appendChild(toast);

  // le message disparaît tout seul après 4 secondes
  setTimeout(function () {
    toast.remove();
  }, 4000);
}


/*
   4. VALIDATION DU FORMULAIRE (Regex, en temps réel)
*/

// Pour chaque champ : son élément, l'endroit du message d'erreur, le message et la règle
const rules = {
  name: {
    input: inputName,
    errorId: "error-name",
    message: "Le nom doit contenir entre 3 et 30 caractères.",
    isValid: function (value) {
      return /^.{3,30}$/.test(value.trim());                       // 3 à 30 caractères
    }
  },
  price: {
    input: inputPrice,
    errorId: "error-price",
    message: "Saisissez un prix positif valide (ex. 25 ou 7,5).",
    isValid: function (value) {
      const text = value.trim();
      return /^\d+([.,]\d{1,2})?$/.test(text) && Number(text.replace(",", ".")) > 0;   // nombre positif
    }
  },
  category: {
    input: selectCategory,
    errorId: "error-category",
    message: "Sélectionnez une catégorie.",
    isValid: function (value) {
      return /^(entree|plat|dessert)$/.test(value);
    }
  },
  badge: {
    input: selectBadge,
    errorId: "error-badge",
    message: "Sélectionnez un badge qualitatif.",
    isValid: function (value) {
      return /^(bio|vegetarien|classique)$/.test(value);
    }
  }
};

const fieldKeys = ["name", "price", "category", "badge"];

// Un champ n'affiche son message d'erreur qu'après avoir été modifié par l'utilisateur.
// (On n'écoute pas le simple fait de quitter un champ : le message apparaîtrait d'un coup
//  et ferait descendre le bouton Annuler juste avant le clic, qui serait alors perdu.)
const touched = { name: false, price: false, category: false, badge: false };

// Affiche ou cache le message d'erreur d'UN champ
function showError(key) {
  const rule = rules[key];
  const errorElement = document.getElementById(rule.errorId);
  const hasError = touched[key] && !rule.isValid(rule.input.value);

  errorElement.textContent = hasError ? rule.message : "";
  errorElement.classList.toggle("hidden", !hasError);
  rule.input.setAttribute("aria-invalid", hasError);       // met la bordure en rouge
}

// Vrai si les 4 champs sont corrects
function formIsValid() {
  for (const key of fieldKeys) {
    if (!rules[key].isValid(rules[key].input.value)) {
      return false;
    }
  }
  return true;
}

// Met à jour les messages d'erreur ET le bouton Valider
function checkForm() {
  for (const key of fieldKeys) {
    showError(key);
  }
  btnSubmit.disabled = !formIsValid();
}

// Remet la validation à zéro (aucune erreur affichée, bouton Valider selon les champs)
function resetValidation() {
  for (const key of fieldKeys) {
    touched[key] = false;
  }
  checkForm();
}

// Un seul écouteur sur le formulaire : il surveille tous les champs
function onFieldEvent(event) {
  const key = event.target.dataset.field;                  // "name", "price", "category" ou "badge"
  if (key === undefined) {
    return;
  }
  touched[key] = true;
  checkForm();
}
form.addEventListener("input", onFieldEvent);              // à chaque lettre tapée
form.addEventListener("change", onFieldEvent);             // quand on choisit dans une liste


/*
   5.MODALE (ouvrir, fermer)
*/
function openModal() {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  inputName.focus();
}

function openModalForAdd() {
  editingId = null;
  form.reset();
  resetValidation();
  modalTitle.textContent = "Nouvelle recette";
  openModal();
}

function openModalForEdit(recipe) {
  editingId = recipe.id;
  form.reset();
  inputName.value = recipe.name;                           // on remplit le formulaire
  inputPrice.value = recipe.price;
  selectCategory.value = recipe.category;
  selectBadge.value = recipe.badge;
  resetValidation();
  modalTitle.textContent = "Modifier la recette";
  openModal();
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  form.reset();
  resetValidation();
  editingId = null;
}

btnAdd.addEventListener("click", openModalForAdd);
btnModalClose.addEventListener("click", closeModal);       // bouton ×
btnCancel.addEventListener("click", closeModal);           // bouton Annuler
modal.addEventListener("click", closeModal);               // clic sur le fond sombre

modalBox.addEventListener("click", function (event) {
  event.stopPropagation();                                 // un clic DANS la fenêtre ne la ferme pas
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();                                          // la touche Échap ferme aussi
  }
});


/*
   6. ENVOI DU FORMULAIRE (ajouter ou modifier une recette)
*/
form.addEventListener("submit", function (event) {
  event.preventDefault();                                  // empêche le rechargement de la page

  // on affiche toutes les erreurs éventuelles, puis on s'arrête si le formulaire est incorrect
  for (const key of fieldKeys) {
    touched[key] = true;
  }
  checkForm();
  if (!formIsValid()) {
    return;
  }

  const name = inputName.value.trim();
  const price = Number(inputPrice.value.trim().replace(",", "."));
  const category = selectCategory.value;
  const badge = selectBadge.value;

  if (editingId === null) {
    // AJOUT : on crée une nouvelle recette dans la réserve
    recipes.push({
      id: Date.now(),
      name: name,
      price: price,
      category: category,
      badge: badge,
      day: null,
      slot: null
    });
    showToast("Recette ajoutée avec succès !");
  } else {
    // MODIFICATION : on met à jour la recette (seulement si elle est dans la réserve)
    for (const recipe of recipes) {
      if (recipe.id === editingId && recipe.day === null) {
        recipe.name = name;
        recipe.price = price;
        recipe.category = category;
        recipe.badge = badge;
      }
    }
    showToast("Recette modifiée avec succès !");
  }

  saveData();
  closeModal();
  refreshAll();
});


/* 
   7. RÉSERVE : AFFICHAGE ET FILTRES
*/
const ICON_EDIT = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L10 16l-4 1 1-4Z"/>
  </svg>`;

const ICON_DELETE = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 6h18"/>
    <path d="M8 6V4h8v2"/>
    <path d="m19 6-1 14H6L5 6"/>
    <path d="M10 11v5"/>
    <path d="M14 11v5"/>
  </svg>`;

// Fabrique le HTML d'UNE carte de recette
function cardHTML(recipe) {
  const locked = recipe.day !== null;                      // true si la recette est déjà dans le menu
  const name = escapeHtml(recipe.name);

  let opacity = "";
  let disabled = "";
  let assignedText = "";
  if (locked) {
    opacity = "opacity-60";                                // la carte devient transparente
    disabled = "disabled";                                 // les boutons sont bloqués
    assignedText = `<p class="mt-2 rounded-lg border border-stone-200 px-2 py-1 text-sm text-stone-700">
        ✓ [Assigné : ${capitalize(recipe.day)} - ${slotNames[recipe.slot]}]</p>`;
  }

  return `
    <li data-id="${recipe.id}" data-category="${recipe.category}"
        class="rounded-2xl border border-stone-200 bg-white p-4 ${opacity}">
      <div class="flex items-start justify-between gap-2">
        <p class="flex flex-wrap gap-2">
          <span class="rounded-full px-2 py-0.5 text-xs font-bold ${categoryColors[recipe.category]}">${categoryNames[recipe.category]}</span>
          <span class="rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColors[recipe.badge]}">${badgeNames[recipe.badge]}</span>
        </p>
        <p class="flex gap-1">
          <button type="button" data-action="edit" aria-label="Modifier ${name}" ${disabled}
                  class="px-1 text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40">
            ${ICON_EDIT}
          </button>
          <button type="button" data-action="delete" aria-label="Supprimer ${name}" ${disabled}
                  class="px-1 text-gray-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40">
            ${ICON_DELETE}
          </button>
        </p>
      </div>
      <h3 class="mt-2 text-lg font-bold">${name}</h3>
      <p class="font-bold text-emerald-700">${recipe.price} DH</p>
      ${assignedText}
    </li>`;
}

// Redessine toute la réserve à partir de la liste "recipes"
function showReserve() {
  let html = "";
  let available = 0;

  for (const recipe of recipes) {
    html += cardHTML(recipe);
    if (recipe.day === null) {
      available = available + 1;
    }
  }

  if (recipes.length === 0) {
    html = '<li class="py-6 text-center text-sm text-stone-600">Aucune recette dans la réserve</li>';
  }

  reserveList.innerHTML = html;
  reserveCount.textContent = available;
  applyFilter();                                           // on garde le filtre choisi (Entrées, Plats...)
}

// Cache les cartes qui ne correspondent pas au filtre actif
function applyFilter() {
  const activeButton = filters.querySelector('button[aria-pressed="true"]');
  const chosen = activeButton === null ? "all" : activeButton.dataset.filter;

  const cards = reserveList.querySelectorAll("li[data-id]");
  for (const card of cards) {
    const visible = chosen === "all" || card.dataset.category === chosen;
    card.classList.toggle("hidden", !visible);
  }
}

filters.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-filter]");
  if (button === null) {
    return;
  }
  const allButtons = filters.querySelectorAll("button[data-filter]");
  for (const other of allButtons) {
    other.setAttribute("aria-pressed", other === button ? "true" : "false");
  }
  applyFilter();
});


/* 
   8. RÉSERVE : BOUTONS MODIFIER ET SUPPRIMER
   (un seul écouteur sur la liste : délégation d'événements)
*/
reserveList.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");
  if (button === null) {
    return;
  }

  const card = button.closest("li[data-id]");
  const recipe = findRecipeById(card.dataset.id);

  // une recette placée dans le menu ne se modifie pas et ne se supprime pas
  if (recipe === null || recipe.day !== null) {
    return;
  }

  if (button.dataset.action === "edit") {
    openModalForEdit(recipe);
  }

  if (button.dataset.action === "delete") {
    const ok = confirm("Voulez-vous vraiment supprimer « " + recipe.name + " » ?");
    if (ok) {
      recipes.splice(recipes.indexOf(recipe), 1);          // retire la recette de la liste
      saveData();
      refreshAll();
      showToast("Recette supprimée avec succès !");
    }
  }
});


/* 
   9. PLANNING : LISTES, TOTAUX, BUDGET DE 50 DH, BOUTON VIDER
  */

// Remplit chaque liste déroulante du planning avec les recettes de la bonne catégorie
function fillSelects() {
  const selects = planningList.querySelectorAll("select[data-slot]");

  for (const select of selects) {
    const day = select.closest("[data-day]").dataset.day;   // "lundi", "mardi"...
    const slot = select.dataset.slot;                       // "entree", "plat" ou "dessert"

    select.innerHTML = '<option value="">En réserve</option>';
    let chosen = null;                                      // la recette choisie dans ce créneau

    for (const recipe of recipes) {
      const isHere = recipe.day === day && recipe.slot === slot;

      // on propose la recette si : bonne catégorie ET (libre OU déjà dans ce créneau)
      if (recipe.category === slot && (recipe.day === null || isHere)) {
        const option = document.createElement("option");
        option.value = recipe.id;
        option.textContent = recipe.name + " (+" + recipe.price + " DH)";
        if (isHere) {
          option.selected = true;
          chosen = recipe;
        }
        select.appendChild(option);
      }
    }

    // case pleine : fond gris / case vide : bordure en pointillés
    const box = select.parentElement;
    box.classList.toggle("bg-stone-50", chosen !== null);
    box.classList.toggle("border", chosen === null);
    box.classList.toggle("border-dashed", chosen === null);
    box.classList.toggle("border-stone-300", chosen === null);
  }
}

// Calcule le total de chaque jour, remplit la barre de progression, active ou non "Vider"
function updateDays() {
  const articles = planningList.querySelectorAll("[data-day]");

  for (const article of articles) {
    const day = article.dataset.day;

    let total = 0;
    let count = 0;
    for (const recipe of recipes) {
      if (recipe.day === day) {
        total = total + recipe.price;
        count = count + 1;
      }
    }
    total = Math.round(total * 100) / 100;

    let percent = total / MAX_PER_DAY * 100;
    if (percent > 100) {
      percent = 100;
    }

    const progressbar = article.querySelector('[role="progressbar"]');
    const bar = progressbar.querySelector("div");
    bar.style.width = percent + "%";
    progressbar.setAttribute("aria-valuenow", total);
    bar.classList.toggle("bg-emerald-500", total <= MAX_PER_DAY);
    bar.classList.toggle("bg-red-600", total > MAX_PER_DAY);

    article.querySelector(".day-total").textContent = total + " DH";
    article.querySelector('[data-action="clear-day"]').disabled = (count === 0);
  }
}

// Quand on choisit une recette dans une liste du planning
planningList.addEventListener("change", function (event) {
  const select = event.target;
  if (!select.matches("select[data-slot]")) {
    return;
  }

  const day = select.closest("[data-day]").dataset.day;
  const slot = select.dataset.slot;

  // 1. l'ancienne recette de ce créneau et la nouvelle recette choisie
  let oldRecipe = null;
  let newRecipe = null;
  for (const recipe of recipes) {
    if (recipe.day === day && recipe.slot === slot) {
      oldRecipe = recipe;
    }
    if (select.value !== "" && String(recipe.id) === select.value) {
      newRecipe = recipe;
    }
  }

  // 2. contrôle du budget : total du jour SANS l'ancienne recette + la nouvelle
  if (newRecipe !== null) {
    let dayTotal = 0;
    for (const recipe of recipes) {
      if (recipe.day === day && recipe !== oldRecipe) {
        dayTotal = dayTotal + recipe.price;
      }
    }
    dayTotal = Math.round((dayTotal + newRecipe.price) * 100) / 100;

    if (dayTotal > MAX_PER_DAY) {
      showToast(capitalize(day) + " ferait " + dayTotal + " DH : le budget maximum de "
                + MAX_PER_DAY + " DH est dépassé.", "error");
      fillSelects();                                       // la liste revient comme avant : rien n'a changé
      return;
    }
  }

  // 3. on libère l'ancienne recette, puis on place la nouvelle
  if (oldRecipe !== null) {
    oldRecipe.day = null;
    oldRecipe.slot = null;
  }
  if (newRecipe !== null) {
    newRecipe.day = day;
    newRecipe.slot = slot;
  }

  saveData();
  refreshAll();
});

// Bouton "Vider" d'un jour (avec confirmation)
planningList.addEventListener("click", function (event) {
  const button = event.target.closest('button[data-action="clear-day"]');
  if (button === null) {
    return;
  }

  const day = button.closest("[data-day]").dataset.day;
  const ok = confirm("Voulez-vous vraiment vider le menu de " + day + " ?");
  if (!ok) {
    return;
  }

  for (const recipe of recipes) {
    if (recipe.day === day) {
      recipe.day = null;
      recipe.slot = null;
    }
  }
  saveData();
  refreshAll();
  showToast("Le menu de " + day + " a été vidé.");
});


/* 
   10. INDICATEURS DU HAUT DE LA PAGE
*/
function statistics() {
  let inReserve = 0;           // recettes encore dans la réserve
  let weekTotal = 0;           // coût de la semaine par apprenant
  let hasVegetarian = false;   // y a-t-il un plat végétarien dans le menu ?

  for (const recipe of recipes) {
    if (recipe.day === null) {
      inReserve = inReserve + 1;
    } else {
      weekTotal = weekTotal + recipe.price;
      if (recipe.badge === "vegetarien") {
        hasVegetarian = true;
      }
    }
  }
  weekTotal = Math.round(weekTotal * 100) / 100;

  // un jour est "prêt" quand ses 3 créneaux sont remplis (entrée + plat + dessert)
  let readyDays = 0;
  for (const day of DAYS) {
    let count = 0;
    for (const recipe of recipes) {
      if (recipe.day === day) {
        count = count + 1;
      }
    }
    if (count === 3) {
      readyDays = readyDays + 1;
    }
  }

  document.getElementById("compteur-reserve").textContent = inReserve;
  document.getElementById("compteur-jours").textContent = readyDays + "/" + DAYS.length;
  document.getElementById("compteur-semaine").textContent = weekTotal + " DH";

  const balance = document.getElementById("compteur-equilibre");
  if (hasVegetarian) {
    balance.textContent = "Équilibré ✓";
    balance.className = "font-bold text-green-700";
  } else {
    balance.textContent = "Non équilibré";
    balance.className = "font-bold text-red-700";
  }
}


/* 
   11. DÉMARRAGE
*/

// Réaffiche tout ce qui dépend des recettes
function refreshAll() {
  showReserve();
  fillSelects();
  updateDays();
  statistics();
}

loadData();           // on relit les recettes sauvegardées
resetValidation();    // le bouton Valider est désactivé au départ
refreshAll();