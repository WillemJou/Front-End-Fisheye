const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json()
    return datas; 
}
const biggestToLowest = (a, b) =>{
    return b - a
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
    const findMedias =  medias.filter( media => media.photographerId === Number(urlIdParams));
    const photographerModel = photographerFactory(findPhotographer());
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);
    
    const changeChevronEvent = () => {
        const chevron = document.getElementsByClassName("chevron");
        const changeChevron = () => { chevron.setAttribute("src", "assets/images/chevron-up-solid.png");
        filter_categories.addEventListener("mouseover", changeChevron());
        }
    }   



    //fonction somme des likes 
    const likeSum = () => {
    const likes = findMedias.map(item => (item.likes));
    const reducer = (acc, curr) => acc + curr;
    const sum = likes.reduce(reducer);
    const stickyCard = document.getElementById('sticky_card');
    stickyCard.append(sum);
   
    // tableau like du + au -
    const biggestToLowestLikesArray = () =>{ 
        const filterLikes = likes.sort(biggestToLowest);
        return filterLikes;
    }    

    // event filtre pop
    const popFilter = () => {
        const pop = document.getElementsByClassName("pop");
        const popEvent = () =>{
            pop.addEventListener("click", biggestToLowestLikesArray());
            return popEvent();
            }   
        }
    return sum;
    }
    likeSum();



    
   

   
    findMedias.forEach((medias) => {
    const photographyModel = mediaFactory(medias); 
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


