
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

    let findTmpLikes = medias.map(item => (item.likes));
    const stickyCard = document.getElementById('sticky_card');
    
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
        }); 
        likeContainer.addEventListener("keydown", (e) => {
            increment();
        });
    });
    
    //likes sum 
    const reducer = (acc, curr) => acc + curr;
    let sum = findTmpLikes.reduce(reducer);
    const totalPriceContainer = document.createElement("div");
    totalPriceContainer.setAttribute("classe", "total-price__container");
    totalPriceContainer.append(sum)
    stickyCard.append(totalPriceContainer);
    
    // LIGHTBOX
    // DOM lightbox
    const lightBox = document.getElementById("lb_container");
    const closeLightboxButton = document.querySelector(".lightbox__close");
    const imgsAndVids = document.querySelectorAll(".medias");
    const next = document.querySelector(".lightbox__next");
    const prev = document.querySelector(".lightbox__previous");
    
    const displayLightbox = () => {
        const open = lightBox.style.display = "flex";
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
            const imgAndVidLightbox = imgAndVid.cloneNode(true);
            imgAndVidLightbox.setAttribute("controls", true);
            imgAndVidLightbox.setAttribute("autoplay", true);
            const contentLightbox = lightBox.append(imgAndVidLightbox); 

            const removeLightBoxContent = () =>{
                imgsAndVids.forEach((imgAndVid) => {
                imgAndVidLightbox.remove();
                });  
            };
    
            // tableau des images 
            const arrayMedias = Array.from(imgsAndVids);
            console.log(arrayMedias);
            // indexer le tableau d'image à l'ouverture de la lightbox 
            const imgAndVidsIndex = arrayMedias.findIndex(i => i === imgAndVid);
            console.log(imgAndVidsIndex);
            
            //incrémentation tableau avec la flèche next
            next.addEventListener("click", (e) => {
            console.log(arrayMedias[imgsAndVids + 1]);
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
            next.focus();  
            lightboxContent();  
        });

        imgAndVid.addEventListener("keydown", (e) => {
            if (e.key === 'Enter'){
                displayLightbox();
                next.focus();  
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




