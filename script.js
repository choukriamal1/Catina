const produits = [
  {nom: "Huile pure", prix: 120, id: 1},
  {nom: "Huile bio", prix: 150, id: 2},
  {nom: "Savon a l'argan", prix: 80, id: 3},
  {nom: "Cosmetiques", prix: 200, id: 4},
  {nom: "Coffret decouverte", prix: 350, id: 5}
];

let compteur = 0;
const catalogueE1 = document.querySelector('#catalogue');
const compteurE1 = document.querySelector('#compteur');

function afficherProuduit (p){
    const div = document.createElement('div');
    div.className = 'produit';
    div.innerHTML =  `<h2>${p.nom}</h2><p>Prix: ${p.prix} DH</p><button data-id="${p.id}">Ajouter au panier</button>`;
    catalogueE1.appendChild(div);
  }

function init (){
  for(let pro of produits){
    afficherProuduit(pro);
  }
  catalogueE1.addEventListener('click' , function(event){
    if ( event.target.tagName === 'BUTTON'){
      event.preventDefault();
      compteur++;
      compteurE1.textContent = compteur ;
  }
  })
}
init();


