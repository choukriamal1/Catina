# README: Documentation HTML, CSS Tailwind et JavaScript

Les questions-réponses pour les bases de **Tailwind CSS**, les **sélecteurs JavaScript** et les **événements JavaScript**.

## Sommaire

1. [Tailwind CSS](#1-tailwind-css)
2. [Les sélecteurs JavaScript](#2-les-sélecteurs-javascript)
3. [Les événements JavaScript](#3-les-événements-javascript)

---

## 1. Tailwind CSS

### Q1. C'est quoi Tailwind CSS ?

**R :** Tailwind CSS est un framework CSS qui permet de styliser une page HTML en utilisant des classes prédéfinies directement dans le HTML.

### Q2. Est-ce que Tailwind remplace complètement CSS ?

**R :** Non. Tailwind génère des styles CSS, et on peut toujours écrire du CSS personnalisé si nécessaire.

### Q3. Que signifie `p-4` ?

**R :** Ajoute un espacement intérieur (*padding*) sur les quatre côtés.

### Q4. Que signifie `mt-4` ?

**R :** Ajoute une marge extérieure en haut (*margin-top*).

### Q5. Que signifie `px-4` ?

**R :** Ajoute un espacement intérieur à gauche et à droite.

### Q6. Que signifie `py-4` ?

**R :** Ajoute un espacement intérieur en haut et en bas.

### Q7. Que signifie `rounded-lg` ?

**R :** Arrondit les coins d'un élément.

### Q8. Que signifie `shadow-md` ?

**R :** Ajoute une ombre de taille moyenne.

### Q9. Que signifie `w-full` ?

**R :** Définit une largeur de 100 % de l'espace disponible.

### Q10. Que signifie `h-screen` ?

**R :** Définit une hauteur correspondant à la hauteur de la fenêtre du navigateur.

---

## 2. Les sélecteurs JavaScript

### Q1. À quoi servent les sélecteurs en JavaScript ?

**R :** Ils permettent de sélectionner des éléments HTML pour les modifier avec JavaScript.

### Q2. Quelle est la différence entre `querySelector()` et `getElementById()` ?

**R :**
- `querySelector()` utilise un sélecteur CSS.
- `getElementById()` sélectionne un élément grâce à son ID.

**Exemples :**

```javascript
document.querySelector("#titre");
document.getElementById("titre");
```

### Q3. Quelle est la différence entre `querySelector()` et `querySelectorAll()` ?

**R :**
- `querySelector()` retourne le premier élément correspondant.
- `querySelectorAll()` retourne tous les éléments correspondants sous forme de liste statique.

### Q4. Quelle est la différence entre `getElementById()` et `getElementsByClassName()` ?

**R :**
- `getElementById()` sélectionne un élément par son ID.
- `getElementsByClassName()` sélectionne les éléments qui possèdent une classe donnée.

### Q5. Faut-il utiliser `.` avec `getElementsByClassName()` ?

**R :** Non. On écrit directement le nom de la classe, sans point.

```javascript
document.getElementsByClassName("description");
```

### Q6. Quelle est la différence entre `querySelectorAll()` et `getElementsByClassName()` ?

**R :**
- `querySelectorAll()` retourne une liste statique qui ne se met pas automatiquement à jour.
- `getElementsByClassName()` retourne une collection dynamique qui se met à jour lorsque les éléments correspondants changent.

### Q7. Quelle méthode choisir pour sélectionner facilement un élément avec un sélecteur CSS ?

**R :** `querySelector()`, car il accepte les ID, les classes, les balises et les sélecteurs CSS plus complexes.

---

## 3. Les événements JavaScript

### Q1. C'est quoi un événement en JavaScript ?

**R :** Un événement est une action qui se produit sur une page web, comme un clic, une saisie au clavier ou l'envoi d'un formulaire.

### Q2. À quoi sert `onclick` ?

**R :** `onclick` permet d'exécuter une action lorsqu'un élément est cliqué.

```javascript
bouton.onclick = function () {
    alert("Bonjour !");
};
```

### Q3. À quoi sert `addEventListener()` ?

**R :** Cette méthode permet d'écouter un événement et d'exécuter une fonction lorsque cet événement se produit.

```javascript
bouton.addEventListener("click", function () {
    alert("Bonjour !");
});
```

### Q4. Quelle est la différence entre `onclick` et `addEventListener()` ?

**R :**
- `onclick` : une nouvelle affectation remplace la fonction précédente.
- `addEventListener()` : permet d'ajouter plusieurs fonctions au même événement.

### Q5. À quoi sert l'événement `submit` ?

**R :** Il permet de détecter la soumission d'un formulaire HTML.

### Q6. Quelle est la différence entre `click` et `submit` ?

**R :**
- `click` détecte le clic sur un élément.
- `submit` détecte l'envoi du formulaire.

### Q7. Sur quel élément utilise-t-on généralement `submit` ?

**R :** Sur la balise `<form>`.

### Q8. Que signifie `event.preventDefault()` ?

**R :** Cette méthode empêche le comportement par défaut du navigateur, par exemple le rechargement de la page lors de la soumission d'un formulaire.

```javascript
form.addEventListener("submit", function (event) {
    event.preventDefault();
});
```

### Q9. Pourquoi utiliser `submit` plutôt que `click` pour un formulaire ?

**R :** Parce que `submit` détecte aussi la soumission au clavier, par exemple avec la touche Entrée, et pas uniquement le clic sur le bouton.

### Q10. À quoi sert l'événement `input` ?

**R :** Il détecte les modifications de la valeur d'un champ pendant la saisie.

### Q11. Quelle est la différence entre `input` et `change` ?

**R :**
- `input` : se déclenche au fur et à mesure de la saisie.
- `change` : se déclenche lorsque la modification est validée, selon le type de champ.

### Q12. Quelle est la différence entre `keydown` et `keyup` ?

**R :**
- `keydown` : se déclenche lorsqu'une touche est pressée.
- `keyup` : se déclenche lorsqu'une touche est relâchée.

### Q13. À quoi sert `mouseover` ?

**R :** Il se déclenche lorsque la souris entre sur un élément.

### Q14. À quoi sert `mouseout` ?

**R :** Il se déclenche lorsque la souris quitte un élément.

### Q15. À quoi sert `focus` ?

**R :** Il se déclenche lorsqu'un champ reçoit le focus, par exemple quand on clique dessus pour écrire.

### Q16. À quoi sert `blur` ?

**R :** Il se déclenche lorsqu'un élément perd le focus, par exemple lorsqu'on quitte un champ de saisie.

### Q17. À quoi sert `event.target` ?

**R :** Il désigne l'élément à l'origine de l'événement.

**Exemple :**

```javascript
document.addEventListener("click", function (event) {
    console.log(event.target);
});
```
