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
        
        // Récupère les datas du photographe selon son ID (probleme scoping)
        const chooseSpecificPhotographer = () =>{
            photographers.find((photographer) => photographer.id === idNumbers);
        }
        console.log(chooseSpecificPhotographer());
    });
};

function displayDataPhotography(photographies) {
    const photographiesSection = document.querySelector(".photographies");
    
    photographies.forEach((photography) => {
        
        const photographyModel = mediaFactory(photography); 
        const userPhotoCardDOM = photographyModel.getPhotoCardDOM();
        photographiesSection.appendChild(userPhotoCardDOM);
        
    });
};

    async function init() {
        // Récupère les datas des photographes  
        const { data } = await getPhotographers();
        displayDataPhoto(data.photographers); 
        
    };
    init();

    async function initPhoto() {
        // Récupère les datas des photographies  
        const { dataMedia } = await getPhotographers();
        displayDataPhotography(dataMedia.photographies); 
        
    };
    initPhoto();



