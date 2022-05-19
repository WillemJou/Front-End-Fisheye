
async function getPhotographers() {
       const res = await fetch(localUrl);
       const data = await res.json()
       return ({data})    
}

    
    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_header");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer); 
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes  
        const { data } = await getPhotographers();
        displayData(data.photographers);
    };

    init();