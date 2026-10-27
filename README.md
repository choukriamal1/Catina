# README : Documentation HTML, CSS Tailwind, JavaScript, Git et Scrum

Cette documentation regroupe les questions-réponses essentielles pour réviser les bases du développement web, de Git et de la méthode Scrum.

## Sommaire

1. [Tailwind CSS](#1-tailwind-css)
2. [Sélecteurs JavaScript](#2-sélecteurs-javascript)
3. [Événements JavaScript](#3-événements-javascript)
4. [CSS : unités relatives et Grid](#4-css-unités-relatives-et-grid)
5. [Git : Merge, Rebase et Pull Request](#5-git-merge-rebase-et-pull-request)
6. [Scrum : Backlog et Sprint](#6-scrum-backlog-et-sprint)
7. [Pseudo-code](#7-pseudo-code)
8. [Bonnes pratiques et débogage](#8-bonnes-pratiques-et-débogage)
9. [Propagation des événements](#9-propagation-des-événements)
10. [LocalStorage](#10-localstorage)
11. [Modules ES6](#11-modules-es6)

---

## 1. Tailwind CSS

**Q1. C'est quoi Tailwind CSS ?**

**R :** Un framework CSS qui utilise des classes utilitaires directement dans le HTML.

**Q2. Tailwind remplace-t-il complètement CSS ?**

**R :** Non, on peut aussi écrire du CSS personnalisé.

**Q3. Que signifient `p-4`, `mt-4`, `px-4` et `py-4` ?**

**R :** `p-4` : padding sur tous les côtés ; `mt-4` : marge supérieure ; `px-4` : padding horizontal ; `py-4` : padding vertical.

**Q4. Que signifient `rounded-lg` et `shadow-md` ?**

**R :** `rounded-lg` arrondit les coins ; `shadow-md` ajoute une ombre moyenne.

**Q5. Que signifient `w-full` et `h-screen` ?**

**R :** `w-full` définit une largeur de 100 % ; `h-screen` définit une hauteur correspondant à la hauteur de la fenêtre.

## 2. Sélecteurs JavaScript

**Q1. À quoi servent les sélecteurs ?**

**R :** À sélectionner des éléments HTML pour les manipuler avec JavaScript.

**Q2. Quelle est la différence entre `querySelector()` et `getElementById()` ?**

**R :** `querySelector()` accepte un sélecteur CSS ; `getElementById()` sélectionne un élément par son ID.

**Q3. Quelle est la différence entre `querySelector()` et `querySelectorAll()` ?**

**R :** Le premier retourne le premier élément correspondant ; le second retourne tous les éléments correspondants dans une liste statique.

**Q4. Quelle est la différence entre `getElementsByClassName()` et `querySelectorAll()` ?**

**R :** `getElementsByClassName()` retourne une collection dynamique ; `querySelectorAll()` retourne une liste statique.

**Q5. Comment sélectionner une classe ?**

**R :** Avec `document.querySelector(".description")` ou `document.getElementsByClassName("description")`. Le point est utilisé uniquement dans le sélecteur CSS.

## 3. Événements JavaScript

**Q1. C'est quoi un événement ?**

**R :** Une action détectée par le navigateur, comme un clic, une saisie ou l'envoi d'un formulaire.

**Q2. Quelle est la différence entre `onclick` et `addEventListener()` ?**

**R :** `onclick` permet d'affecter un gestionnaire de clic ; `addEventListener()` permet d'ajouter plusieurs gestionnaires.

**Q3. Quelle est la différence entre `click` et `submit` ?**

**R :** `click` détecte un clic ; `submit` détecte la soumission d'un formulaire, y compris par certaines actions au clavier.

**Q4. À quoi sert `event.preventDefault()` ?**

**R :** À empêcher le comportement par défaut du navigateur, par exemple l'envoi automatique d'un formulaire.

**Q5. Quelle est la différence entre `input` et `change` ?**

**R :** `input` détecte les modifications pendant la saisie ; `change` détecte une modification validée selon le type de champ.

**Q6. À quoi servent `keydown` et `keyup` ?**

**R :** `keydown` se déclenche lorsqu'une touche est pressée ; `keyup` lorsqu'elle est relâchée.

**Q7. À quoi servent `focus` et `blur` ?**

**R :** `focus` indique qu'un élément reçoit le focus ; `blur` indique qu'il le perd.

**Q8. À quoi sert `event.target` ?**

**R :** À identifier l'élément à l'origine de l'événement.

## 4. CSS : unités relatives et Grid

**Q1. Que sont les unités relatives ?**

**R :** Des unités dont la valeur dépend d'une référence, comme la taille de police ou la fenêtre.

**Q2. Que signifient `rem`, `em`, `%`, `vw` et `vh` ?**

**R :** `rem` dépend de la taille de police de la racine ; `em` dépend de la taille de police de référence ; `%` dépend d'une dimension de référence ; `vw` représente 1 % de la largeur de la fenêtre ; `vh` représente 1 % de sa hauteur.

**Q3. C'est quoi CSS Grid ?**

**R :** Un système de mise en page qui organise les éléments en lignes et en colonnes.

**Q4. Comment activer Grid ?**

**R :** Avec `display: grid;`.

**Q5. À quoi servent `grid-template-columns`, `gap` et `1fr` ?**

**R :** `grid-template-columns` définit les colonnes ; `gap` définit les espaces ; `1fr` représente une fraction de l'espace disponible.

**Q6. Quelle est la différence entre Grid et Flexbox ?**

**R :** Grid organise principalement les éléments en deux dimensions ; Flexbox les organise principalement sur un axe.

## 5. Git : Merge, Rebase et Pull Request

**Q1. C'est quoi `git merge` ?**

**R :** Une commande qui fusionne les modifications d'une branche dans une autre.

**Q2. C'est quoi `git rebase` ?**

**R :** Une commande qui replace les commits d'une branche sur une nouvelle base et réécrit leur historique.

**Q3. Quelle est la différence entre Merge et Rebase ?**

**R :** Merge conserve l'historique des branches ; Rebase réorganise l'historique des commits concernés.

**Q4. C'est quoi une Pull Request ?**

**R :** Une demande de révision et d'intégration des modifications d'une branche dans une autre.

**Q5. Quelle est la différence entre `git pull` et Pull Request ?**

**R :** `git pull` récupère et intègre les modifications distantes ; une Pull Request permet de proposer des modifications pour révision et fusion.

**Q6. C'est quoi un conflit Git ?**

**R :** Un conflit apparaît lorsque Git ne peut pas fusionner automatiquement certaines modifications incompatibles.

## 6. Scrum : Backlog et Sprint

**Q1. C'est quoi le Product Backlog ?**

**R :** La liste priorisée des fonctionnalités, améliorations et tâches du produit.

**Q2. C'est quoi le Sprint Backlog ?**

**R :** L'objectif du Sprint, les éléments sélectionnés et le plan de travail pour les réaliser.

**Q3. Quelle est la différence entre les deux ?**

**R :** Le Product Backlog concerne l'ensemble du produit ; le Sprint Backlog concerne le Sprint en cours.

**Q4. C'est quoi un Sprint ?**

**R :** Une période de travail limitée pendant laquelle l'équipe vise un objectif précis.

## 7. Pseudo-code

**Q1. C'est quoi le pseudo-code ?**

**R :** Une description simplifiée des étapes d'un algorithme, sans syntaxe stricte d'un langage.

**Q2. Pourquoi utiliser le pseudo-code ?**

**R :** Pour organiser la logique avant de programmer.

**Q3. Quels sont ses éléments principaux ?**

**R :** Les variables, les conditions, les boucles et les instructions.

## 8. Bonnes pratiques et débogage

**Q1. C'est quoi le débogage ?**

**R :** Le processus qui consiste à identifier et corriger les erreurs d'un programme.

**Q2. À quoi sert `console.log()` ?**

**R :** À afficher des valeurs dans la console pour vérifier le comportement du code.

**Q3. Quelles sont les bonnes pratiques en programmation ?**

**R :** Utiliser des noms clairs, éviter les répétitions, organiser le code et tester régulièrement.

**Q4. Pourquoi valider les données d'un formulaire ?**

**R :** Pour vérifier que les données saisies respectent les règles attendues.

## 9. Propagation des événements

**Q1. C'est quoi la propagation d'un événement ?**

**R :** Le parcours d'un événement à travers les éléments du DOM.

**Q2. C'est quoi le bubbling ?**

**R :** La remontée de l'événement de l'élément cible vers ses parents.

**Q3. À quoi sert `event.stopPropagation()` ?**

**R :** À empêcher l'événement de continuer sa propagation.

**Q4. C'est quoi la délégation d'événements ?**

**R :** Le fait de placer un gestionnaire sur un parent pour gérer les événements de ses enfants.

## 10. LocalStorage

**Q1. C'est quoi `localStorage` ?**

**R :** Un stockage du navigateur qui conserve des données sous forme de chaînes de caractères.

**Q2. Comment enregistrer, récupérer et supprimer une donnée ?**

**R :** Avec `setItem()`, `getItem()` et `removeItem()`.

**Q3. Comment conserver un tableau ou un objet ?**

**R :** Utiliser `JSON.stringify()` pour l'enregistrer et `JSON.parse()` pour le récupérer.

```javascript
localStorage.setItem("recettes", JSON.stringify(recettes));

const recettesSauvegardees =
  JSON.parse(localStorage.getItem("recettes")) || [];
```

**Q4. Les données persistent-elles après la fermeture du navigateur ?**

**R :** Généralement oui, jusqu'à leur suppression ou celle des données du site.

## 11. Modules ES6

**Q1. C'est quoi un module JavaScript ?**

**R :** Un fichier qui permet d'organiser et de partager du code.

**Q2. À quoi servent `export` et `import` ?**

**R :** `export` expose une fonctionnalité ; `import` permet de la récupérer dans un autre module.

**Q3. Quelle est la différence entre `export default` et un export nommé ?**

**R :** `export default` définit un export par défaut ; les exports nommés permettent d'exporter plusieurs éléments par leur nom.

**Q4. Comment activer les modules dans HTML ?**

**R :** Avec `<script type="module" src="main.js"></script>`.

**Q5. Pourquoi utiliser les modules ?**

**R :** Pour séparer les responsabilités, réutiliser le code et faciliter la maintenance.
