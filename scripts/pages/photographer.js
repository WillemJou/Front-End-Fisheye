
const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json()
    return datas; 
};


function displayData(photographers, allMedias) {
    const photographersHeader = document.querySelector(".photographer__header");
    const photographiesSection = document.querySelector(".photographies");
    
    // retrieve id parameter from URL

    const queryString = window.location.search;                             
    const urlParams = new URLSearchParams(queryString);
    const urlIdParams = urlParams.get ('id');
    
    // Retrieves the photographer's data according to his ID
 
    const findPhotographer = () => {
        const findPhotographer = photographers.find( item => item.id === Number(urlIdParams));
        return findPhotographer;
    };
    
    const medias =  allMedias.filter( media => media.photographerId === Number(urlIdParams));
    const photographerModel = photographerFactory(findPhotographer());
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersHeader.appendChild(userCardDOM);
    
    // show name in modal

    const titleModal = document.getElementById("title_modal");
    const findName =  findPhotographer().name;
    titleModal.append(findName);

     // media display

    let mediasDisplay = () => {
        photographiesSection.innerHTML =``;
        medias.forEach((media) => {
        const mediaModel = mediaFactory(media); 
        const userMediaCardDOM = mediaModel.generateMediaElement(media);
        photographiesSection.append(userMediaCardDOM);  
        });
    };
    mediasDisplay();
    
    // DOM likes
    const stickyCard = document.getElementById('sticky_card');
    const totalPriceContainer = document.createElement("div");
    totalPriceContainer.setAttribute("classe", "total-price__container");
    stickyCard.append(totalPriceContainer);
    const likeContainers = document.querySelectorAll(".like__container");
    
    // incrementation likes 
    
    const incrementationLikes = () => {
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
    };
    incrementationLikes();

    //likes sum 
    const likesArray = document.querySelectorAll(".like");
    const firstTotalValues = [...likesArray].map(item => Number(item.innerHTML)).reduce((acc, cur) => cur + acc, 0);
    totalPriceContainer.append(firstTotalValues);
    
    const totalSum = () => {
        const values = [...likesArray].map(item => Number(item.innerHTML)).reduce((acc, cur) => cur + acc, 0);
        totalPriceContainer.innerHTML="";
        totalPriceContainer.append(values);
        };
        
        // LIGHTBOX
        // DOM lightbox
        const imgsAndVids = document.querySelectorAll(".medias");
        const lightBox = document.getElementById("lb_display");
        const next = document.querySelector(".lightbox__next");
        const prev = document.querySelector(".lightbox__previous");
        prev.tabIndex = 0; 
        next.tabIndex = 0;
        const closeLightboxButton = document.querySelector(".lightbox__close");
        const mediaContainer = document.querySelector(".media__container");
        let srcArray = Array.from(
            imgsAndVids,
            img => img.getAttribute('src')
            );
            let url = window.location.protocol + "//" + window.location.host + "/" ;
            const addUrlToSrc = srcArray.map(src => url + src);
        
            const displayLightbox = () => {
                lightBox.style.display = "flex";
                lightBox.removeAttribute('aria-hidden');
                lightBox.setAttribute('aria-modal', true);
                main.setAttribute('aria-hidden', true);
                document.body.style.overflow = "hidden"; 
            };
            
            const closeLightbox =  () => {
                lightBox.style.display = "none";
                main.setAttribute('aria-hidden', false);
                lightBox.removeAttribute('aria-modal');
                lightBox.setAttribute('aria-hidden', true);
                mediaContainer.innerHTML=``;
                document.body.style.overflow = "visible";
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
            
            const loadData = (media) => {
                media.includes("jpg") ? mediaContainer.innerHTML += `<img id="media_photo" src=${media}>`: mediaContainer.innerHTML += `<video id="media_video" src=${media}>`;
                const mediaVideo = document.getElementById("media_video");
                const mediaPhoto = document.getElementById("media_photo");
                if (mediaVideo) {
                    mediaVideo.setAttribute("controls", true);
                    mediaVideo.setAttribute("autoplay", true);
                    mediaVideo.tabIndex = 0;
                    mediaVideo.focus();
                };
                if (mediaPhoto) {
                    mediaPhoto.tabIndex = 0;
            mediaPhoto.focus();
        }     

        const nextFunction = () => {
            let nextImg = addUrlToSrc.findIndex(item => item === media) + 1; 
            if (nextImg === addUrlToSrc.length) {
                nextImg = 0;
            };
            next.removeEventListener('click', nextFunction);
            mediaContainer.innerHTML = ``;
            loadData(addUrlToSrc[nextImg]);
        };    
        const prevFunction = () => {
            let prevImg = addUrlToSrc.findIndex(item => item === media) - 1; 
            if (prevImg < 0) {
                prevImg = 10;
            };
            prev.removeEventListener('click', prevFunction);
            mediaContainer.innerHTML = ``;
            loadData(addUrlToSrc[prevImg]);
        };    
        next.addEventListener('click', nextFunction); 
        prev.addEventListener('click', prevFunction); 
        closeEvent();
    };
    
    let displayLightBoxEvents = (e) => {
        [...imgsAndVids].forEach(imgAndVid => {
            const media = imgAndVid.src;
            imgAndVid.addEventListener('click', () => {
                displayLightbox();
                loadData(media);
            });
            imgAndVid.addEventListener('keydown', () => {
                if (e.key === "Enter"){
                    displayLightbox(); 
                    loadData(media);  
                };
            });
        });
    };
    displayLightBoxEvents();
    
    // chevron filter
    const selectFilterContainer = document.querySelector(".filter__categories");
    const chevronUp = document.querySelector(".chevron-up");
    const chevronDown = document.querySelector(".chevron-down");
    let open = false;
    const isOpen = () => {
        open ? (chevronUp.style.visibility ="visible") (chevronDown.style.visibility ="hidden") : (chevronDown.style.visibility ="visible") (chevronUp.style.visibility ="hidden");        
    };
    selectFilterContainer.addEventListener("click", (e) => {
        open = !open;
        isOpen();
    });
    
    // sort by pop, date, title

    
        selectFilterContainer.addEventListener('change', (e) => {
        
            const choice = e.target.value;
    
            switch (choice) {
                case 'popularité':
                medias.sort((a, b) => {
                    if (a.likes < b.likes) return 1;
                    if (a.likes > b.likes) return -1;
                    return 0;
                });
                break;
                case 'date':
                    medias.sort((a, b) => {
                        if (a.date < b.date) return 1;
                        if (a.date > b.date) return -1;
                        return 0;
                    });
                    break;
                    case 'titre':
                        medias.sort((a, b) => {
                            if (a.title < b.title) return -1;
                            if (a.title > b.title) return 1;
                            return 0;
                        });				
                        break;
                    };
                    mediasDisplay(e);
                    displayLightBoxEvents();
                    incrementationLikes();
        });
        
    };
            

async function init() {
    // retrieve DATA
    const datas = await getPhotographers();
    const photographers = datas.photographers;
    const allmedias = datas.medias;
    displayData(photographers, allmedias); 
};
init();



    
