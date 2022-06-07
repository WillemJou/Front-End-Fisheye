const lightBox = document.getElementById("lb_container");
const closeLightboxButton = document.querySelector(".lightbox__close");
const layoutPhoto = document.querySelector(".layout-photo");
const layoutVideo = document.querySelector(".layout-video");
const img = document.querySelector(".photos");



const displayLightbox = (e) => {
    lightBox.style.display = "flex";
}

const closeLightbox =  () => {
    lightBox.style.display = "none";
}

const openLightboxEvent = () =>{ 
    img.addEventListener('click', displayLightbox());
}

const closeLightboxEvent = () => {
    closeLightboxButton.addEventListener('click', closeLightbox());
}