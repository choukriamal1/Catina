const btnAjouter = document.getElementById('Ajouter');
const modal = document.getElementById('modal');

btnAjouter.addEventListener('click', function(){
  modal.classList.remove('hidden');
  modal.classList.add('flex');
});

const button_ReciptCancel = document.getElementById("btn-recipt-cancel");
button_ReciptCancel.addEventListener("click", function(){
  modal.classList.toggle("hidden")
});

const button_ReciptSubmet = document.getElementById("btn-recipt-submit");
button_ReciptSubmet.addEventListener("click", function(event){

  event.preventDefault()

  let input_recipt_name = document.getElementById("input-recipt-name");
  if (input_recipt_name.value.length < 3 || input_recipt_name.value.length > 30) {
    return
  }

  // input price

  let option_recipt_category = document.getElementById("recipt-option-category");


});