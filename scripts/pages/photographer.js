
const localUrl = '../../data/photographers.json';

async function getPhotographers() {
    const res = await fetch(localUrl);
    const datas = await res.json();
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
    
    // DOM likes
    const totalPriceContainer = document.createElement("div");
    const stickyCard = document.getElementById('sticky_card');
    totalPriceContainer.setAttribute("classe", "total-price__container");
    stickyCard.append(totalPriceContainer);
    
    
    
    const generalFunction = () => {
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
                    if (e.key === "Enter"){
                    increment();
                    totalSum();
                    };
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
            
            
            const loadData = (media, title) => {
                mediaContainer.innerHTML = ``;
                media.includes("jpg") ? mediaContainer.innerHTML += `<img id="media_photo" src=${media}>`: mediaContainer.innerHTML += `<video id="media_video" src=${media}>`;
                const mediaVideo = document.getElementById("media_video");
                const mediaPhoto = document.getElementById("media_photo");
                if (mediaVideo) {
                    mediaVideo.setAttribute("controls", true);
                    mediaVideo.setAttribute("autoplay", true);
                    mediaVideo.setAttribute("alt", title);
                    mediaVideo.tabIndex = 0;
                    mediaVideo.focus();
                };
                if (mediaPhoto) {
                    mediaPhoto.tabIndex = 0;
                    mediaPhoto.setAttribute("alt", title);
                    mediaPhoto.focus();
                };     
                
                const closeLightbox =  (e) => {
                    lightBox.style.display = "none";
                    main.setAttribute('aria-hidden', false);
                    lightBox.removeAttribute('aria-modal');
                    lightBox.setAttribute('aria-hidden', true);
                    mediaContainer.innerHTML=``;
                    document.body.style.overflow = "visible";
                    document.removeEventListener('click', closeEventOnClick);
                    document.removeEventListener('click', closeEventOnKey);
                    prev.removeEventListener('click', prevFunction, true);
                    next.removeEventListener('click', nextFunction, true);
                    window.removeEventListener('keydown', arrowEvent);
                };
                
                const closeEventOnClick = (e) => {
                    closeLightboxButton.addEventListener('click', (e) => {
                        closeLightbox(e);  
                    });
                };
                const closeEventOnKey = () => {
                    closeLightboxButton.addEventListener('keydown', (e) => {
                        if (e.key === "Enter"){
                            closeLightbox(e);  
                        };
                    });
                    window.addEventListener("keydown", (e) => {
                        if (e.key === "Escape"){
                            closeLightbox(e);
                        };
                    });    
                };

                const nextFunction = () => {
                    let nextImg = addUrlToSrc.findIndex(item => item === media); 
                    if (nextImg === addUrlToSrc.length - 1) {
                        nextImg = - 1;
                    };
                    loadData(addUrlToSrc[nextImg + 1]);
                    next.removeEventListener('click', nextFunction, true);
                    prev.removeEventListener('click', prevFunction, true);
                    window.removeEventListener('keydown', arrowEvent);
                };   
                
                const prevFunction = () => {
                    let prevImg = addUrlToSrc.findIndex(item => item === media); 
                    if (prevImg === 0) {
                        prevImg = addUrlToSrc.length ;
                    };
                    loadData(addUrlToSrc[prevImg - 1]);
                    prev.removeEventListener('click', prevFunction, true);
                    next.removeEventListener('click', nextFunction, true);
                    window.removeEventListener('keydown', arrowEvent);  
                };    
                
                // switch case for arrow prev and next functions
                const arrowEvent = (e) => {
                    
                    switch (e.key) {
                        case "ArrowLeft" :
                            prevFunction();
                            break;
                            case "ArrowRight" :
                                nextFunction();
                                break;
                                default : 
                                return;
                            }
                        };
                        
                // navigate and close lightbox event
                next.addEventListener('click', nextFunction, true); 
                prev.addEventListener('click', prevFunction, true);
                window.addEventListener("keydown", arrowEvent);
                closeEventOnClick();
                closeEventOnKey();
            };
    
        let displayLightBoxEvents = (e) => {
            [...imgsAndVids].forEach(imgAndVid => {
                const media = imgAndVid.src;
                const title = imgAndVid.alt;

                imgAndVid.addEventListener('click', () => {
                    displayLightbox();
                    loadData(media, title);
                });
                imgAndVid.addEventListener('keydown', (e) => {
                    if (e.key === "Enter"){
                        displayLightbox(); 
                        loadData(media, title);  
                    };
                });
            });
        };
        displayLightBoxEvents();
    
        // chevron filter
        const selectFilterContainer = document.querySelector("#filter");
        const chevronUp = document.querySelector(".chevron-up");
        const chevronDown = document.querySelector(".chevron-down");
        let open = false;
    
        const isOpen = () => {
            if (open === true){
                chevronUp.style.visibility ="visible";
                chevronDown.style.visibility ="hidden";
            }
            else {
                chevronDown.style.visibility ="visible";
                chevronUp.style.visibility ="hidden";        
            };
        };    
        selectFilterContainer.addEventListener("click", () => {
            open = !open;
            isOpen();
        });
    };

    popSort = () => {
        medias.sort((a, b) => {
            if (a.likes < b.likes) return 1;
            if (a.likes > b.likes) return -1;
            return 0;
        });
    };
    mediasDisplay(popSort());
    generalFunction();
    
    // sort by pop, date, title
    const selectFilterContainer = document.querySelector("#filter");
    selectFilterContainer.addEventListener('change', (e) => {
        
        const choice = e.target.value;
        
        switch (choice) {
            case 'popularité':
                    generalFunction(); 
                    popSort();
                    break;
                    
                    case 'date':
                        medias.sort((a, b) => {
                            if (a.date < b.date) return 1;
                            if (a.date > b.date) return -1;
                            return 0;
                        });            
                        break;
                        case 'titre':
                            const titleSort = medias.sort((a, b) => {
                                if (a.title < b.title) return -1;
                                if (a.title > b.title) return 1;
                                return 0;
                            });		
                            break;
                        };

                        totalPriceContainer.innerHTML = ``;
                        mediasDisplay();
                        generalFunction();
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



    
