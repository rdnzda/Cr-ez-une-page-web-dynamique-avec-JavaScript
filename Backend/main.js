// Récupération des données depuis l'API.
const works = await fetch("http://localhost:5678/api/works/").then(works => works.json());
const gallery = document.querySelector(".gallery");

// Affichage different des boutons actives
const boutons = document.querySelectorAll('.filter button');

boutons.forEach(bouton => {
  bouton.addEventListener('click', function() {
    boutons.forEach(b => b.classList.remove('active'));
    bouton.classList.add('active');
  });
});

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
};


// Première affichage principal de la page.
try {
    generateWorks(works);
} catch (error) {
    console.error("Une erreur s'est produite lors de la génération des œuvres :", error);
};


// Affichage filtrer par catégorie.
const boutonTous = document.querySelector('.btn-tous');
boutonTous.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    generateWorks(works);
});

const boutonObjets = document.querySelector('.btn-objets');
boutonObjets.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    let worksObjets = works.filter(work => work.category.name === "Objets");
    generateWorks(worksObjets);
});

const boutonAppartements = document.querySelector('.btn-appartements');
boutonAppartements.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    let worksAppartements = works.filter(work => work.category.name === "Appartements");
    generateWorks(worksAppartements);
});

const boutonHotelsRestaurants = document.querySelector('.btn-hotels-restaurants');
boutonHotelsRestaurants.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = '';
    let worksHotelsRestaurants = works.filter(work => work.category.name === "Hotels & restaurants");
    generateWorks(worksHotelsRestaurants);
});