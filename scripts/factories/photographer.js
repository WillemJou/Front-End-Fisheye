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
    
    
    const sticky = () => {
    const blackHeartPng = `assets/images/heart-black.png`;
    const stickyCard =  document.getElementById('sticky_card');
    const blackHeart = document.createElement("img");
    blackHeart.setAttribute("src", blackHeartPng);
    blackHeart.className = 'heart-black';
    stickyCard.append(pPrice, blackHeart);
    }
    
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
        
        sticky();
        
        return article;
    }
    return { name, picture, getUserCardDOM}
}

function mediaFactory(data) {
    
    const { id, photographerId, title, image, video, likes, date, price} = data;
    const picture = `assets/Sample Photos/${image}`;
    const short = `assets/Sample Photos/${video}`;
    const heartPng = `assets/images/heart-solid.png`;
    const titlePhoto = document.createElement("h3");
    const layoutPhoto = document.createElement("article");
    const layoutVideo = document.createElement("article");
    const img = document.createElement("img");
    const videos = document.createElement("video");
    const layoutCard = document.createElement("div");
    const heart = document.createElement("img");
    const like = likes;
    const dates = date;

    
    function getPhotoCardDOM() {
        titlePhoto.textContent = title;
        heart.className = 'heart';
        layoutCard.className = 'layout_card';
        img.setAttribute("src", picture);
        heart.setAttribute("src", heartPng);
        videos.setAttribute("src", short);
        layoutCard.append(titlePhoto, like, heart);
        layoutPhoto.append(layoutCard, img);
        layoutVideo.append(videos);
      

        
        // afficher vidéos si pas d'image
        const videoOrImg = (img) => {
            img == undefined ? layoutPhoto.style.display ="none" && (layoutVideo.style.display ="block"): false ;
            console.log(videoOrImg());
            }
            
            return (layoutPhoto);
        }
        return { id, picture, getPhotoCardDOM }
    }
    
    

    