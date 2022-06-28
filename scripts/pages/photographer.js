
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
    
    const biggestToLowest = (a, b) =>{
        return b - a
    };

    const biggestToLowestLikesArray = (media) =>{ 
        const likes = allMedias.map(item => (item.likes));        
        const filterLikes = likes.sort(biggestToLowest);
        return filterLikes;
    }
    
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

    // filtre selon like (plus pop)
    const pop = document.querySelectorAll(".pop");
    const popFilter = () => {
        pop.addEventListener("click", biggestToLowestLikesArray);
    };
    
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
    const imgsAndVids = document.querySelectorAll(".medias");
    const lightBox = document.getElementById("lb_display");
    let imgLightbox = new Image();
    const videoLightbox = document.createElement('video');
    
    const displayLightbox = () => {
        lightBox.style.display = "flex";
        lightBox.removeAttribute('aria-hidden');
        lightBox.setAttribute('aria-modal', true); 
    };
    
    const closeLightbox =  () => {
        lightBox.style.display = "none";
        lightBox.removeAttribute('aria-modal');
        lightBox.setAttribute('aria-hidden', true);
    };
    
    imgsAndVids.forEach((imgAndVid) => {
        
        const lightboxContent = () => {
            
            // DOM lightbox
            const closeLightboxButton = document.querySelector(".lightbox__close");
            const nodeMediasToArray = [...imgsAndVids];
            const srcArray = nodeMediasToArray.map(item => item.src);
            console.log(srcArray); 
            const next = document.querySelector(".lightbox__next");
            const prev = document.querySelector(".lightbox__previous");
            imgLightbox.className = 'img__lightbox';
            videoLightbox.className = 'video__lightbox';
            imgLightbox.tabIndex = 0;
            videoLightbox.tabIndex = 0;
            videoLightbox.setAttribute("controls", true);
            videoLightbox.setAttribute("autoplay", true);
            imgLightbox.setAttribute('alt', imgAndVid.alt);
            videoLightbox.setAttribute ("alt", imgAndVid.alt);
            imgLightbox.src = imgAndVid.src;
            videoLightbox.src = imgAndVid.src; 
            srcImg = imgLightbox.src; 
            
            
            if ((imgAndVid.src).includes('jpg')){
                lightBox.append(imgLightbox); 
            } 
            else if ((imgAndVid.src).includes('mp4')){
                lightBox.append(videoLightbox);
            }; 
            
            const removeLightBoxContent = () =>{ 
                imgLightbox.remove();   
                videoLightbox.remove();              
            };
            
            //incrémentation tableau avec la flèche next
            next.addEventListener("click", (event) => {
                // source de l'img cliquée
                srcImg = imgLightbox.src; 
                console.log(srcImg);
                // index d'img
                let srcIndex = srcArray.findIndex(image => image === srcImg);
                console.log(srcIndex);
                const b = imgLightbox.src = srcArray[ srcIndex + 1];  
                console.log(b);  
            });
            prev.addEventListener("click", (event) => {
                // source de l'img cliquée
                srcImg = imgLightbox.src; 
                // index d'img
                let srcIndex = srcArray.findIndex(image => image === srcImg);
                const b = imgLightbox.src = srcArray[ srcIndex - 1];  
            });

            closeLightboxButton.addEventListener('click', (e) => {
                closeLightbox();
                removeLightBoxContent(); 
            });
            closeLightboxButton.addEventListener('keydown', (e) => {
                if (e.key === "Enter"){
                    closeLightbox();
                    removeLightBoxContent();
                };
            });
            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape"){
                    closeLightbox();
                    removeLightBoxContent();
                };
            });
        }; 
     
        imgAndVid.addEventListener("click", (e) => {
            displayLightbox();
            imgLightbox.focus();  
            videoLightbox.focus();  
            lightboxContent();  
        });

        imgAndVid.addEventListener("keydown", (e) => {
            if (e.key === 'Enter'){
                displayLightbox();
                imgLightbox.focus();  
                videoLightbox.focus();    
                lightboxContent(); 
            };
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




