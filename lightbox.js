const lightBox = document.getElementsByClassName("lightbox__container");
const closeLightboxButton = document.getElementsByClassName("lightbox__close");


function displayLightbox() {
    lightBox.style.display ="flex";
}

function closeLightbox () {
    lightBox.style.display ="none";
}

const layoutPhoto = document.getElementsByClassName("layout-photo");
const layoutVideo = document.getElementsByClassName("layout-video");

const openLightboxEvent = () =>{ 
    layoutPhoto.addEventListener('click', displayLightbox());
}

const closeLightboxEvent = () => {
    closeLightboxButton.addEventListener('click', closeLightbox());
}