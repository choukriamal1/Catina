const btnAjouter = document.getElementById('Ajouter');
const modal = document.getElementById('modal');

  btnAjouter.addEventListener('click', function(){
  modal.classList.remove('hidden');
  modal.classList.add('flex');
});

//annuler
const button_ReciptCancel = document.getElementById("btn-recipt-cancel");
button_ReciptCancel.addEventListener("click", function(){
  modal.classList.toggle("hidden");
  modal.classList.remove("flex");

});

//submit 
const button_ReciptSubmet = document.getElementById("btn-recipt-submit");
button_ReciptSubmet.addEventListener("click", function(event){

  event.preventDefault();

  let input_recipt_name = document.getElementById("input-recipt-name");
  if (input_recipt_name.value.length < 3 || input_recipt_name.value.length > 30) {
    console.log("Nom invalide");
    return;
  };

  let input_recipt_price = document.getElementById("input-recipt-price");
  let price = Number(input_recipt_price.value.replace(",","."));
  if(isNaN(price)|| price <= 0)
  { console.log("Prix invalide");
    return;
  }
  
  let option_recipt_category = document.getElementById("recipt-option-category");
  if (option_recipt_category.value === "") {
    console.log("Catégorie manquante");
    return;
  }
  
  let option_recipt_badge = document.getElementById("recipt-option-qalific");
  if (option_recipt_badge.value === "") {
    console.log("Badge manquante");
    return;²
  }
  
  console.log("Recette valide :", input_recipt_name.value, price, option_recipt_category.value, option_recipt_badge.value);
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});