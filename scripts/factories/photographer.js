function photographerFactory(data) {
    
    const { name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/${portrait}`;
    const descriptifPhotographer =  document.createElement('div');
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    const pTagline = document.createElement('p');
    const h2 = document.createElement( 'h2' );
    const h3 = document.createElement( 'h3' );
    const URL = "photographer.html";
    const a = document.createElement('a');
    const pPrice = document.createElement('p');
    const textPrice = "£/jour";
    const commaSpace = ", ";
    const idPhotographers = id;

    const blackHeartPng = `assets/images/heart-black.png`;
    const stickyCard =  document.getElementById('sticky_card');
    const blackHeart = document.createElement("img");
    
    
    //liens homepage vers page photographe
    const links = () =>{
        a.href = URL;
    }
    links();
    
    function getUserCardDOM() {
        
        a.href += "?id=" + idPhotographers;
        h2.textContent = name;       
        h3.textContent = (city + commaSpace + country); 
        pTagline.className = 'p-tagline-homepage';
        pTagline.textContent = tagline;  
        pPrice.className = 'p-price-homepage'; 
        descriptifPhotographer.className = 'descriptif-photographer';
        pPrice.textContent = price + textPrice;
        img.setAttribute("src", picture)
        a.setAttribute("href", a)
        article.appendChild(a); 
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h3);
        a.appendChild(pTagline);
        a.appendChild(pPrice);
        a.appendChild(descriptifPhotographer);
        descriptifPhotographer.append(h2, h3, pTagline, pPrice);
        blackHeart.setAttribute("src", blackHeartPng);
        blackHeart.className = 'heart-black';
        stickyCard.append(blackHeart, pPrice );
        return article;
    }
    return { name, picture, getUserCardDOM}
}

function mediaFactory(data) {
    
    const { id, photographerId, title, image, video, likes, date, price} = data;
    const picture = `assets/Sample Photos/${image}`;
    const short = `assets/Sample Photos/${video}`;
    const heartPng = `assets/images/heart-solid.png`;
    const divFilter = document.getElementById("filter_categories");
    const popFilter = document.getElementsByClassName("pop");
    const dateFilter = document.getElementsByClassName("date");
    const titleFilter = document.getElementsByClassName("title");
    const chevron = document.getElementsByClassName("chevron");
    const titlePhoto = document.createElement("h3");
    const layoutPhoto = document.createElement("article");
    const img = document.createElement("img");
    const videos = document.createElement("video");
    const layoutCard = document.createElement("div");
    const heart = document.createElement("img");
    const idPhotographer = photographerId;
    const like = likes;
    const dates = date;
    const prices = price;

    // rendre objet en tableau
    const value = Object.values(like);
    console.log(data.price);

    
    // Calcul de la somme des likes (retourne Nan ou 0)
    const getSumByKey = (value, likes) => {
        return value.reduce((acc, curr) => acc + Number(curr[likes]), 0);
    }
    const total = getSumByKey(value, "likes");
    console.log(total);
    
    
    function getPhotoCardDOM() {
        titlePhoto.textContent = title;
        heart.className = 'heart';
        layoutCard.className = 'layout_card';

        const changeChevronEvent = () => {
            const changeChevron = () => { chevron.setAttribute("src", "assets/images/chevron-up-solid.png");
            filter.addEventListener("mouseover", changeChevron());
        }
    }
    console.log(changeChevronEvent());
    
    //popFilter.addEventListener("click", );
    


        img.setAttribute("src", picture);
        heart.setAttribute("src", heartPng);
        videos.setAttribute("src", short);
        layoutPhoto.append(layoutCard, img || videos);
        layoutCard.append(titlePhoto, like, heart);
      

        
        // afficher vidéos si pas d'image
        //const videoOrImg = (img) => {
            //  img == undefined ? document.createElement("video") : false ;
            //console.log(videoOrImg());
            //}
            
            return (layoutPhoto);
        }
        return { id, picture, getPhotoCardDOM }
    }
    
    

    