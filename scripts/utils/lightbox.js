const lightBox = document.getElementById("lb_container");
const closeLightboxButton = document.querySelector(".lightbox__close");
const layoutPhoto = document.querySelector(".layout-photo");
const layoutVideo = document.querySelector(".layout-video");
const img = document.querySelector(".photos");



const displayLightbox = (e) => {
    e.preventDefault();
    lightBox.style.display = "flex";
    lightBox.removeAttribute('aria-hidden');
    lightBox.setAttribute('aria-modal', true);
    img.addEventListener('click', displayLightbox());
}

const closeLightbox =  () => {
    lightBox.style.display = "none";
    lightBox.removeAttribute('aria-modal');
    lightBox.setAttribute('aria-hidden', true);
    closeLightboxButton.addEventListener('click', closeLightbox());
}
