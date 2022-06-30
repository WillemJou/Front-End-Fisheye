
const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json()
    return datas; 
};


function displayDataPhoto(photographers, allMedias) {
    const photographersHeader = document.querySelector(".photographer__header");
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
    
    const medias =  allMedias.filter( media => media.photographerId === Number(urlIdParams));
    const photographerModel = photographerFactory(findPhotographer());
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);
    
    // afficher nom dans modal
    const titleModal = document.getElementById("title_modal");
    const findName =  findPhotographer().name;
    titleModal.append(findName);
    
    // chevron filter
    const selectFilterContainer = document.querySelector(".filter__categories");
    const chevronUp = document.querySelector(".chevron-up");
    const chevronDown = document.querySelector(".chevron-down");
    let open = false;
    const isOpen = () => {
        open ? (chevronUp.style.visibility ="visible") (chevronDown.style.visibility ="hidden")
        : (chevronDown.style.visibility ="visible") (chevronUp.style.visibility ="hidden");        
    };
    selectFilterContainer.addEventListener("click", (e) => {
        open = !open;
        isOpen();
    });
    

    const biggestToLowest = (a, b) =>{
        return b - a
    };
    const biggestToLowestLikesArray = (media) =>{ 
        const likes = allMedias.map(item => (item.likes));        
        const filterLikes = likes.sort(biggestToLowest);
        return filterLikes;
    };
    

    // trie selon pop, date, titre
    const option = document.querySelectorAll(".options");
    const pop = document.querySelector(".pop");
    const date = document.querySelector(".date");
    const title = document.querySelector(".title");

    selectFilterContainer.addEventListener('click', (e) => {
        const choice = e.target.value;
        
        switch (choice) {
                
            case pop:
                medias.sort((a, b) => {
                    if (a.likes < b.likes) return 1;
                    if (a.likes > b.likes) return -1;
                    return 0;
                    });
                    break;
                
            case date:
                medias.sort((a, b) => {
                    if (a.date < b.date) return 1;
                    if (a.date > b.date) return -1;
                    return 0;
                    });
                break;
                
            case title:
                medias.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                    });					
                break;
                }});
        
    
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media); 
        const userMediaCardDOM = mediaModel.generateMediaElement(media);
        photographiesSection.append(userMediaCardDOM);
        
    });

    // DOM likes
    const stickyCard = document.getElementById('sticky_card');
    const totalPriceContainer = document.createElement("div");
    totalPriceContainer.setAttribute("classe", "total-price__container");
    stickyCard.append(totalPriceContainer);
    
    // incrementation likes 
    const likeContainers = document.querySelectorAll(".like__container");
    
    likeContainers.forEach((likeContainer) => {
        let tmpLike = Number(likeContainer.childNodes[0].innerHTML);
        const increment = () => {
            const g = likeContainer.childNodes[0].innerHTML;
            const like = Number(g);
            const incrementLikePhoto  =
            like === tmpLike ? like + 1 : tmpLike;
            likeContainer.childNodes[0].innerHTML = incrementLikePhoto; 
        };
        
        likeContainer.addEventListener("click", (e) => {
            increment();
            totalSum();
        }); 
        
        likeContainer.addEventListener("keydown", (e) => {
            increment();
            totalSum();
        });
    });
    
    //likes sum 
    const likesArray = document.querySelectorAll(".like");
    const firstTotalValues = [...likesArray].map(item => Number(item.innerHTML)).reduce((acc, cur) => cur + acc, 0);
    totalPriceContainer.append(firstTotalValues);
    
    const totalSum = () => {
        const values = [...likesArray].map(item => Number(item.innerHTML)).reduce((acc, cur) => cur + acc, 0);
        totalPriceContainer.innerHTML="";
        totalPriceContainer.append(values);
    }














    
    // LIGHTBOX
    // DOM lightbox

    // imgs
    const imgsAndVids = document.querySelectorAll(".medias");
    // MODAL img & container
    const lightBox = document.getElementById("lb_display");
    const next = document.querySelector(".lightbox__next");
    const prev = document.querySelector(".lightbox__previous");
    const closeLightboxButton = document.querySelector(".lightbox__close");
    const mediaContainer = document.querySelector(".media__container");
    const mediasArray = [...medias];
    // TABLEAU DES TITRES
    const linksArray = mediasArray.map(item => item.image || item.video);
    console.log(linksArray.length);
    
    const displayLightbox = () => {
        lightBox.style.display = "flex";
        lightBox.removeAttribute('aria-hidden');
        lightBox.setAttribute('aria-modal', true); 
    };
    
    const closeLightbox =  () => {
        lightBox.style.display = "none";
        lightBox.removeAttribute('aria-modal');
        lightBox.setAttribute('aria-hidden', true);
        mediaContainer.innerHTML=``;
    };
    
    const closeEvent = () => {
         closeLightboxButton.addEventListener('click', () => {
        closeLightbox();  
        });
        closeLightboxButton.addEventListener('keydown', (e) => {
            if (e.key === "Enter"){
                closeLightbox();   
            };
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape"){
                    closeLightbox();
                };
            });
    
        });
    };
    
    
    const loadData = (img) => {
        img.includes("mp4") ? mediaContainer.innerHTML += `<video id="media_video" src=${img}>` : mediaContainer.innerHTML += `<img id="media_photo" src=${img}>`;
        const mediaVideo = document.getElementById("media_video");
        if (mediaVideo) {
            mediaVideo.setAttribute("controls", true);
            mediaVideo.setAttribute("autoplay", true);
        };

        let nextImg = linksArray.findIndex(item => item.includes(img)) + 1; 
        console.log(nextImg);
        if (nextImg === linksArray.length) {
            nextImg = 0;
        };
        next.addEventListener('click', () => {
            loadData(linksArray[nextImg]);
        });
        closeEvent();
    };
    
    [...imgsAndVids].forEach(imgAndVid => {
        const media = imgAndVid.src;
        imgAndVid.addEventListener('click', () => {
            displayLightbox();
            loadData(media);
        });
    });

};





















async function init() {
    // Récupère les datas  
    const datas = await getPhotographers();
    const photographers = datas.photographers;
    const allmedias = datas.medias;
    displayDataPhoto(photographers, allmedias); 
};
init();



    
