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
    
    
    
    //liens homepage vers page photographe
    const links = () =>{
        a.href = URL;
    };
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
        img.setAttribute("alt", name);
        a.setAttribute("href", a)
        article.appendChild(a); 
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h3);
        a.appendChild(pTagline);
        a.appendChild(pPrice);
        a.appendChild(descriptifPhotographer);
        const sticky = () => {
            const blackHeartPng = `assets/images/heart-black.png`;
            const stickyCard =  document.getElementById('sticky_card');
            const blackHeart = document.createElement("img");
            blackHeart.setAttribute("src", blackHeartPng);
            blackHeart.className = 'heart-black';
            stickyCard.append(price, textPrice, blackHeart);
        };
        descriptifPhotographer.append(h2, h3, pTagline, pPrice);
        sticky();
        return article;
    };
    return { name, picture, getUserCardDOM}
};

function mediaFactory(data) {
    
    const { id, photographerId, title, image, video, likes, date, price} = data;
    const picture = `assets/Sample Photos/${image}`;
    const short = `assets/Sample Photos/${video}`;
    const heartPng = `assets/images/heart-solid.png`;
    const titlePhoto = document.createElement("h3");
    const layoutPhoto = document.createElement("article");
    layoutPhoto.className = 'layout-photo';
    const layoutVideo = document.createElement("article");
    layoutVideo.className = 'layout-video';
    const img = document.createElement("img");
    img.className = 'photos';
    img.setAttribute("alt", title);
    const videos = document.createElement("video");
    const layoutCard = document.createElement("div");
    const heart = document.createElement("img");
    const likeContainer = document.createElement("div");
    likeContainer.append(likes, heart);
    likeContainer.className ='like-container';
    const dates = date;
    titlePhoto.textContent = title;
    heart.className = 'heart';
    heart.setAttribute("src", heartPng);
    layoutCard.className = 'layout_card';
    layoutCard.append(titlePhoto, likeContainer);

    function generateMediaElement() {
        
        const getPictureCardDom =() => {
            img.setAttribute("src", picture);
            layoutPhoto.append(layoutCard, img);
            return layoutPhoto;
        };
        
        const getVideoCardDom = () => {
            videos.setAttribute("src", short);
            layoutVideo.append(layoutCard, videos);
            return layoutVideo;
        };
        
        return getPictureCardDom();
    };
return { id, picture, generateMediaElement};
};