async function ajoutListenersAvis() {

    const gallery = document.querySelector(".gallery");
    const reponse = await fetch("http://localhost:5678/api/works/");
    const works = await reponse.json();
    for (let i = 0; i < works.length; i++) {
        const figure = document.createElement('figure');
        const imageElement = document.createElement('img');
        const textImage = document.createElement('figcaption');
        imageElement.src = works[i].imageUrl;
        textImage.innerText = works[i].title; 
        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(textImage);
        console.log(imageElement.src);
    }
}

ajoutListenersAvis()