// Récupération des données depuis l'API.
const works = await fetch("http://localhost:5678/api/works/").then(works => works.json());
const categories = await fetch("http://localhost:5678/api/categories/").then(categories => categories.json());
const gallery = document.querySelector(".gallery");
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token')

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

    // Fermeture de la Modale.
    function closeModal() {
        document.querySelector('.overlay').classList.remove('overlay--open');
        document.querySelector('.modal').classList.remove('modal--open');
        document.querySelector("body").style.overflowY = "visible";
        }
    
    // Fonction qui génere les travaux dans la modale.  
    function openModal() {
        document.querySelector('.overlay').classList.add('overlay--open');
        document.querySelector('.modal').classList.add('modal--open');
        document.querySelector('.return-modal').classList.add('none');
        document.querySelector('.valider').classList.add('none');
        document.querySelector('.ajouter-photo').classList.remove('none');
        document.querySelector("body").style.overflowY = "hidden";
        fetch("http://localhost:5678/api/works/")
            .then(response => response.json())
            .then(works => {
                document.querySelector(".modal-main").innerHTML = '';
                const titre = document.createElement('h3');
                titre.innerText = "Gallery photo";
                document.querySelector('.modal-main').appendChild(titre);
                generateModalWorks(works);
                generateWorks(works); // Réafficher les travaux mis à jour
            })
            .catch(error => console.error('Erreur lors de la récupération des travaux:', error));
    };

    function generateModalWorks(works) {
        const modalMain = document.querySelector('.modal-main');
        for (let i = 0; i < works.length; i++) {
            const frame = works[i];
            const figure = document.createElement('figure');
            const imageElement = document.createElement('img');
            const boutonIcone = document.createElement('button');
            const icone = document.createElement('i');
            icone.classList.add("fa-solid");
            icone.classList.add("fa-trash-can");
            icone.classList.add("fa-xs");
            boutonIcone.classList.add("delete-button");
            boutonIcone.dataset.id = frame.id;
            boutonIcone.type = "button";
            imageElement.src = frame.imageUrl;
            modalMain.appendChild(figure);
            figure.appendChild(imageElement);
            boutonIcone.appendChild(icone);
            figure.appendChild(boutonIcone);
            // Fonction qui permets de supprimer les travaux.
            boutonIcone.addEventListener("click", function(event) {
                const workId = event.currentTarget.dataset.id;

                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json', "accept": "application/json", 'Authorization': `Bearer ${token}`
                    },
                })
                .then(response => {
                    if (response.ok) {
                        console.log(`Le travail avec l'ID ${workId} a été supprimé.`);
                        fetch("http://localhost:5678/api/works/")
                            .then(response => response.json())
                            .then(works => {
                                document.querySelector(".gallery").innerHTML = '';
                                document.querySelector(".modal-main").innerHTML = '';
                                const titre = document.createElement('h3');
                                titre.innerText = "Gallery photo";
                                document.querySelector('.modal-main').appendChild(titre);
                                generateModalWorks(works);
                                generateWorks(works); // Réafficher les travaux mis à jour
                            })
                            .catch(error => console.error('Erreur lors de la récupération des travaux:', error));
                    } else {
                        console.error(`Échec de la suppression du travail avec l'ID ${workId}.`);
                    }
                })
                .catch(error => {
                console.error('Erreur lors de la demande DELETE:', error);
                });
            });
            console.log(imageElement.src);
        }
    }

    // Fonction qui génère la méthode d'envoi
    function generateModalSendingMethod() {
        const modalMain = document.querySelector('.modal-main');
        const form = document.createElement('form');
        const titre = document.createElement('h3');
        const cadreAjouter = document.createElement('div');
        const divInputTitle = document.createElement('div');
        const labelInputTile = document.createElement('label');
        const labelSelectCategorie = document.createElement('label');
        const inputTitle = document.createElement('input');
        const selectCategorie = document.createElement('select');
        const icone = document.createElement('i');
        const boutonAjouterPhoto = document.createElement('button');
        const cadreCaption = document.createElement('p');
        const inputFiles = document.createElement('input');
        form.classList.add('form');
        inputFiles.type = "file";
        inputFiles.id = "image-input";
        inputFiles.style.display = "none";
        inputFiles.required = true;
        labelInputTile.innerText = "Titre";
        inputTitle.id = "input-title";
        inputTitle.required = true;
        labelInputTile.htmlFor = "input-title";
        labelSelectCategorie.innerText = "Catégorie";
        labelSelectCategorie.htmlFor = "input-select";
        selectCategorie.id = "input-select";
        selectCategorie.required = true;
        titre.innerText = "Ajout photo";
        boutonAjouterPhoto.innerText = "+ Ajouter photo";
        boutonAjouterPhoto.id = "bouton-ajouter-photo"
        cadreCaption.innerText = "jpg, png : 4mo max";
        divInputTitle.classList.add('input-picture-desciption');
        cadreAjouter.classList.add('cadre-ajouter');
        icone.classList.add("fa-regular");
        icone.classList.add("fa-image");
        fetch('http://localhost:5678/api/categories/')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id; 
            option.text = category.name; 
            selectCategorie.add(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories :', error);
        });
        modalMain.appendChild(form);
        form.appendChild(titre);
        form.appendChild(cadreAjouter);
        cadreAjouter.appendChild(icone);
        cadreAjouter.appendChild(boutonAjouterPhoto);
        cadreAjouter.appendChild(inputFiles);
        cadreAjouter.appendChild(cadreCaption);
        divInputTitle.appendChild(labelInputTile);
        divInputTitle.appendChild(inputTitle);
        divInputTitle.appendChild(labelSelectCategorie);
        divInputTitle.appendChild(selectCategorie);
        form.appendChild(divInputTitle);
    }

    // Changement du login en logout
    const logout = document.querySelector(".login-logout");
    logout.innerText = "logout";
    logout.href = "/index.html"
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

    // Ouverture du modal si clique sur modifier.
    div.addEventListener("click", function() {
        openModal();
        
        const boutonCloseModal = document.querySelector('.close-modal');
            boutonCloseModal.addEventListener("click", function() {
                closeModal();
            })
        // Si bouton ajouter photo cliquer.
        document.querySelector('.ajouter-photo').addEventListener('click', function(event){
            event.preventDefault();
            const modalMain = document.querySelector('.modal-main');
            const modalFooter = document.querySelector('.ajouter-photo');
            const boutonRetour = document.querySelector('.return-modal');
            const boutonValider = document.querySelector('.valider');
            modalMain.innerHTML = '';
            boutonRetour.classList.remove('none');
            modalFooter.classList.add('none');
            generateModalSendingMethod();
            boutonValider.classList.remove('none');

            const inputTitle = document.getElementById('input-title');
            const imageInput = document.getElementById('image-input');
            const inputSelect = document.getElementById('input-select');

            inputTitle.addEventListener('input', checkForm);
            imageInput.addEventListener('change', checkForm);
            inputSelect.addEventListener('input', checkForm);

            function checkForm() {
                const isFormFilled = inputTitle.value.trim() !== '' && imageInput.files.length > 0 && inputSelect.value.trim() !== '';

                boutonValider.disabled = !isFormFilled;

                if (isFormFilled) {
                    boutonValider.classList.remove('disabled-button');
                } else {
                    boutonValider.classList.add('disabled-button');
                }
            }

            checkForm();

            boutonRetour.addEventListener("click", function(event) {
                event.preventDefault();
                openModal();
            })

            document.getElementById('bouton-ajouter-photo').addEventListener('click', function () {
                document.getElementById('image-input').click();
            });

            document.getElementById('image-input').addEventListener('change', function (event) {
                event.preventDefault();
                const cadreAjouter = document.querySelector('.cadre-ajouter');
                document.getElementById('bouton-ajouter-photo').classList.add('none');
                const file = event.target.files[0];
    
                if (file) {
                    const img = document.createElement('img');

                    img.src = URL.createObjectURL(file);
                    img.alt = file.name;
                    img.id = "img-preview"
                    cadreAjouter.appendChild(img);
                }
                });
            
        })
    })

    document.querySelector('.valider').addEventListener("click", function (event) {
        const title = document.getElementById('input-title').value;
        const imageInput = document.getElementById('image-input');
        const categoryId = document.getElementById('input-select').value;

        console.log(categoryId)
    
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        formData.append('title', title);
        formData.append('category', parseInt(categoryId));
    
        fetch('http://localhost:5678/api/works/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur :', data);
            closeModal();
            fetch("http://localhost:5678/api/works/")
                .then(response => response.json())
                .then(works => {
                    document.querySelector(".gallery").innerHTML = '';
                    generateWorks(works); // Réafficher les travaux mis à jour
                })
                .catch(error => console.error('Erreur lors de la récupération des travaux:', error));
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        });
    });


}

else { 
    // Affichage mode édition
    const modeEdition = document.querySelector(".mode-edition");
    modeEdition.classList.add('none');

    // Activation des filtres
    const filter = document.querySelector(".filter");
    filter.classList.remove('none');

    // Première affichage principal de la page.
    try {
        generateWorks(works);
        filterBoutons();
    } catch (error) {
        console.error("Une erreur s'est produite lors de la génération des œuvres :", error);
    };

    // Génération dynamique des boutons de filtres
    function filterBoutons() {
        fetch("http://localhost:5678/api/categories/")
            .then(response => response.json())
            .then(categories => {
                const boutonObjets = document.querySelector(".filter");
                categories.forEach(category => {
                    const bouton = document.createElement("button");
                    bouton.textContent = category.name;
                    bouton.classList.add("btn-" + category.name.toLowerCase().replace(/\s+/g, '-'));
                    bouton.addEventListener("click", function() {
                        filterWorksByCategory(category.name);
                        // Mettre à jour les classes actives
                        boutons.forEach(b => b.classList.remove('active'));
                        bouton.classList.add('active');
                    });
                    boutonObjets.appendChild(bouton);
                });
    
                // Sélectionner tous les boutons après leur création
                const boutons = document.querySelectorAll('.filter button');
    
                // Ajouter la logique pour le bouton "Tous"
                const boutonTous = document.querySelector(".btn-tous");
                boutonTous.addEventListener("click", function() {
                    filterWorksByCategory("Tous");
                    // Mettre à jour les classes actives
                    boutons.forEach(b => b.classList.remove('active'));
                    boutonTous.classList.add('active');
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des categories:', error));
    }
    
    function filterWorksByCategory(categoryName) {
        document.querySelector(".gallery").innerHTML = '';
        if (categoryName === "Tous") {
            generateWorks(works); 
        } else {
            let worksObjets = works.filter(work => work.category.name === categoryName);
            generateWorks(worksObjets);
        }
    }
}