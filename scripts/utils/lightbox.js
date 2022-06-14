

    const lightBox = document.getElementById("lb_container");
    const closeLightboxButton = document.querySelector(".lightbox__close");
    const layoutPhoto = document.querySelector(".layout-photo");
    const layoutVideo = document.querySelector(".layout-video");
    const img = document.querySelectorAll(".photos");
    const imgLink = document.querySelectorAll("#link_img");
    const videoLink = document.querySelectorAll("#link_video");
    
    // création Dom de LightBox
    




    const displayLightbox = (e) => {
        const open = lightBox.style.display = "flex";
        lightBox.removeAttribute('aria-hidden');
        lightBox.setAttribute('aria-modal', true);
        
    };
    
    
    
    const closeLightbox =  () => {
        closeLightboxButton.addEventListener('click', closeLightbox());
        lightBox.style.display = "none";
        lightBox.removeAttribute('aria-modal');
        lightBox.setAttribute('aria-hidden', true);
    };


