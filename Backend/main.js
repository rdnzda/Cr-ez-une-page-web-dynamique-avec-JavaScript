// Récupération des données depuis l'API.
const works = await fetch("http://localhost:5678/api/works/").then(works => works.json());
const gallery = document.querySelector(".gallery");
const userId = localStorage.getItem('userId');

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

if (userId) {
    // Changement du login en logout
    const logout = document.querySelector(".login-logout");
    logout.innerText = "logout";
    logout.href = "/FrontEnd/index.html"
    logout.addEventListener("click", function() {
        localStorage.removeItem('userId');
        localStorage.removeItem('token')
    })

    // Affichage utilisateur
    const titre = document.querySelector(".portfolio h2");
    const div = document.createElement("div");
    const modifyDiv = document.createElement("div");
    const portfolio = document.querySelector(".portfolio");
    const i = document.createElement("i");
    const modifyText = document.createElement("p");
    const header = document.querySelector("header");
    header.style.marginTop = "110px";
    portfolio.appendChild(div);
    div.appendChild(titre);
    div.classList.add('titre-projets');
    div.style.marginBottom = "30px";
    document.querySelector('.titre-projets').appendChild(modifyDiv);
    modifyDiv.classList.add('modify-div');
    portfolio.appendChild(gallery);
    i.classList.add('fa-regular');
    i.classList.add('fa-pen-to-square');
    modifyText.innerText = "modifier";
    modifyDiv.appendChild(i);
    modifyDiv.appendChild(modifyText);

    // Première affichage principal de la page.
    try {
        generateWorks(works);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la génération des œuvres :", error);
    };

    // Modale
    div.addEventListener("click", function(event) {
        event.preventDefault();
        
    })
}

else { 
    // 
    const modeEdition = document.querySelector(".mode-edition");
    modeEdition.classList.add('none');

    // Activation des filtres
    const filter = document.querySelector(".filter");
    filter.classList.remove('none');

    // Affichage different des boutons actives.
    const boutons = document.querySelectorAll('.filter button');

    boutons.forEach(bouton => {
    bouton.addEventListener('click', function() {
        boutons.forEach(b => b.classList.remove('active'));
        bouton.classList.add('active');
    });
    });

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
}