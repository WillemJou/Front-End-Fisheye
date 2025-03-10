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
    
    //homepage links to photographer page
    const links = () =>{
        a.href = URL;
    };
    links();
    
    function getUserCardDOM() {
        a.href += "?id=" + idPhotographers;
        h2.textContent = name;       
        h3.textContent = (city + commaSpace + country); 
        pTagline.className = 'p-tagline__homepage';
        pTagline.textContent = tagline;  
        pPrice.className = 'p-price__homepage'; 
        descriptifPhotographer.className = 'descriptif__photographer';
        descriptifPhotographer.setAttribute("id", "description_photographer");
        pPrice.textContent = price + textPrice;
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        a.setAttribute("href", a)
        article.appendChild(a); 
        a.appendChild(img);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        a.appendChild(descriptifPhotographer);
        const sticky = () => {
            const stickyCard =  document.getElementById('sticky_card');
            const blackHeartPng = `assets/images/heart-black.png`;
            const blackHeart = document.createElement("img");
            blackHeart.setAttribute("src", blackHeartPng);
            blackHeart.className = 'heart__black';
            blackHeart.setAttribute("alt", "nombre total de likes");
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
    const picture = `assets/SamplePhotos/${image}`;
    const short = `assets/SamplePhotos/${video}`;
    const heartPng = `assets/images/heart-solid.png`;
    const titlePhoto = document.createElement("h3");
    titlePhoto.classList.add("title__media");
    const layoutPhoto = document.createElement("article");
    layoutPhoto.className = 'layout__photo';
    const layoutVideo = document.createElement("article");
    layoutVideo.className = 'layout__video';
    const img = document.createElement("img");
    img.className = 'medias';
    img.setAttribute("alt", title);
    img.tabIndex = 0;
    const videos = document.createElement("video");
    videos.classList.add("videos", "medias");
    videos.tabIndex = 0;
    const layoutCard = document.createElement("div");
    const heart = document.createElement("img");
    heart.setAttribute("alt", "liker si vous aimez");
    const like = document.createElement("div");
    like.className ="like";
    like.append(likes);
    const likeContainer = document.createElement("div");
    likeContainer.append(like, heart);
    likeContainer.className ='like__container';
    likeContainer.tabIndex = 0;
    const dates = date;
    titlePhoto.textContent = title;
    heart.className = 'heart';
    heart.setAttribute("src", heartPng);
    layoutCard.className = 'layout__card';
    layoutCard.append(titlePhoto, likeContainer);

   function generateMediaElement() {
        
        const getPictureCardDom =() => {
            img.setAttribute("src", picture);
            layoutPhoto.append(img, layoutCard);
            return layoutPhoto;
        };
        
        const getVideoCardDom = () => {
            videos.setAttribute("src", short);
            layoutVideo.append(videos, layoutCard);
            return layoutVideo;
        };
        
        return data.video ? getVideoCardDom() : getPictureCardDom() ;
    };
return { id, picture, generateMediaElement};
};