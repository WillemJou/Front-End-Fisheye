const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json()
    return datas; 
};


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
    };
    
    const findMedias =  medias.filter( media => media.photographerId === Number(urlIdParams));
    const photographerModel = photographerFactory(findPhotographer());
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);
    
    // afficher nom dans modal
    const titleModal = document.getElementById("title_modal");
    const findName =  findPhotographer().name;
    titleModal.append(findName);
    
    //fonction somme des likes 
    const likeSum = () => {
        const likes = findMedias.map(item => (item.likes));
        const reducer = (acc, curr) => acc + curr;
        const sum = likes.reduce(reducer);
        const stickyCard = document.getElementById('sticky_card');
        stickyCard.append(sum);
        return (sum);
    };
    likeSum();
    

    const biggestToLowest = (a, b) =>{
        return b - a
    };
    const biggestToLowestLikesArray = (media) =>{ 
        const likes = findMedias.map(item => (item.likes));        
        console.log(likes);
        const filterLikes = likes.sort(biggestToLowest);
        return filterLikes;
    }    
    
    
    findMedias.forEach((media) => {
        const mediaModel = mediaFactory(media); 
        const userMediaCardDOM = mediaModel.generateMediaElement(media);
        photographiesSection.append(userMediaCardDOM);
        // tableau like du + au -
    
        // filtre selon like (plus pop)
        const pop = document.querySelectorAll(".pop");
        const popFilter = () => {
                pop.addEventListener("click", biggestToLowestLikesArray);
        };
    }); 
    
    const likeDivs = document.querySelectorAll(".like");
    const likeContainers = document.querySelectorAll(".like-container");
    
    const incrementLikes = (media) =>{
        const res = media.likes +1;
        likeDivs.innerText = res;
        console.log(likeDivs);
        console.log(res);
    };
    
    findMedias.forEach(media => {
        const updatedLikesCount = incrementLikes(media);
    });
    likeContainers.forEach(likeContainer => {
        likeContainer.addEventListener('click', incrementLikes);
        
    });
    
    
    //focus photos
    const focusArticle = () => {
        const article = document.getElementsByTagName('article').focus();
        article.tabIndex = 0;
        return focusArticle;
    };
    

};

async function init() {
    // Récupère les datas  
    const datas = await getPhotographers();
    const photographers = datas.photographers;
    const medias = datas.medias;
    displayDataPhoto(photographers, medias); 
};
init();




