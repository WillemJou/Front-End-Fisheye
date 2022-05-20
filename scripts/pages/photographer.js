const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const data = await res.json()
    return ({data})    
}

function displayDataPhoto(photographers) {
    const photographersHeader = document.querySelector(".photographer_header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer); 
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersHeader.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes  
    const { data } = await getPhotographers();
    displayDataPhoto(data.photographers);
};

init();
