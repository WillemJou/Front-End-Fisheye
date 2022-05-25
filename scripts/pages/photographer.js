const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json()
    return datas; 
}

function displayDataPhoto(photographers, medias) {
    const photographersHeader = document.querySelector(".photographer_header");
    const photographiesSection = document.querySelector(".photographies");

    // récupération parametre id de l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlIdParams = urlParams.get ('id');

    // Récupère les datas du photographe selon son ID 
    const findPhotographer = () => {
        const findPhotographer = photographers.find( item => item.id === Number(urlIdParams));
        return findPhotographer;
    }
    const photographerModel = photographerFactory(findPhotographer());
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);

    
    const findMedias = () => {
        const findMedia = medias.filter( medias => medias.id === Number(urlIdParams));
        return findMedia;
    }
    medias.forEach(() => {
        const photographyModel = mediaFactory(findMedias()); 
        const userPhotoCardDOM = photographyModel.getPhotoCardDOM();
        photographiesSection.appendChild(userPhotoCardDOM);
    });
};
async function init() {
    // Récupère les datas  
    const datas = await getPhotographers();
    const photographers = datas.photographers;
    const medias = datas.medias;
    displayDataPhoto(photographers, medias); 
};
init();


