const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json()
    return datas; 
};
const biggestToLowest = (a, b) =>{
    return b - a
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
    
    // tableau like du + au -
    const biggestToLowestLikesArray = () =>{ 
        const filterLikes = likes.sort(biggestToLowest);
        return filterLikes;
    }    
    // filtre selon like (plus pop)
    const popFilter = () => {
        const pop = document.querySelector(".pop");
        const popEvent = () =>{
            pop.addEventListener("click", biggestToLowestLikesArray);
            return popEvent();
        };   
    return popFilter();
    };

    // incrémenter like +1
    const likeDiv = document.getElementsByClassName("like");

    const incrementLikes = () =>{
        let likes = findMedias.map(item => (item.likes));
        console.log(likes);
         likes.forEach(like => {
             likesPlus1 = like+1;
            console.log(likesPlus1);
        });
        
        // likeDiv.addEventListener("click", () => {
          //  });
        
       // });
        
        //const likeContainer = document.querySelectorAll(".like-container");
        
    }
    incrementLikes();
   
   findMedias.forEach((media) => {
       const mediaModel = mediaFactory(media); 
       const userMediaCardDOM = mediaModel.generateMediaElement(media);
       photographiesSection.append(userMediaCardDOM);
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




