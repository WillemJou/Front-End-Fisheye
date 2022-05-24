const localUrl = '../../data/photographers.json';



async function getPhotographers() {
    const res = await fetch(localUrl);
    const data = await res.json()
    return ({data}) 
}
async function getPhotographies() {
    const res = await fetch(localUrl);
    const dataMedia = await res.json()
    return ({dataMedia}) 
}

function displayDataPhoto(photographers) {
    const photographersHeader = document.querySelector(".photographer_header");

    // récupération parametre id de l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const UrlIdParams = urlParams.get ('id');
    console.log(UrlIdParams);

    // Récupère les datas du photographe selon son ID 
    const findId = () =>{
        photographers.find( id => id === UrlIdParams);
    }
    console.log(findId());

    // afficher contenu en fonction de l'Id de l'url 
   UrlIdParams === photographers.id ? true : photographers.style.display = "none"; 

    
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

function displayDataPhotography(media) {
    const photographiesSection = document.querySelector(".photographies");
    
    media.forEach((media) => {
        
        const photographyModel = mediaFactory(media); 
        const userPhotoCardDOM = photographyModel.getPhotoCardDOM();
        photographiesSection.appendChild(userPhotoCardDOM);

    });
};
    async function initPhoto() {
        // Récupère les datas des photographies  
        const { dataMedia } = await getPhotographies();
        displayDataPhotography(dataMedia.media);  
    };
    initPhoto();



