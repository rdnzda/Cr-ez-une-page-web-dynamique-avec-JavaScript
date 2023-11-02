// Récupération des données depuis l'API.
const works = await fetch("http://localhost:5678/api/works/").then(works => works.json());
const gallery = document.querySelector(".gallery");


// Fonction qui envoie vers une section de page en attendant que la page soit completement charger
window.onload = function() {
    // Attend que la page soit entièrement chargée
    // Redirige ensuite vers la section cible sur la page cible
    window.location.href = "index.html#contact";
  }


// Fonction qui génére l'affichage des projets.
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const frame = works[i];
        const figure = document.createElement('figure');
        const imageElement = document.createElement('img');
        const textImage = document.createElement('figcaption');
        imageElement.src = frame.imageUrl;
        textImage.innerText = frame.title; 
        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(textImage);
        console.log(imageElement.src);
    }
}


// Première affichage principal de la page.
generateWorks(works);


// Affichage filtrer par catégorie.
const boutonTous = document.querySelector('.btn-tous');
boutonTous.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    generateWorks(works);
})

const boutonObjets = document.querySelector('.btn-objets');
boutonObjets.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    let worksObjets = works.filter(work => work.category.name === "Objets");
    generateWorks(worksObjets);
})

const boutonAppartements = document.querySelector('.btn-appartements');
boutonAppartements.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    let worksAppartements = works.filter(work => work.category.name === "Appartements");
    generateWorks(worksAppartements);
})

const boutonHotelsRestaurants = document.querySelector('.btn-hotels-restaurants');
boutonHotelsRestaurants.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    let worksHotelsRestaurants = works.filter(work => work.category.name === "Hotels & restaurants");
    generateWorks(worksHotelsRestaurants);
})
