function photographerFactory(data) {
    
    const { name, portrait, city, country, tagline, price, id} = data;
    
    const picture = `assets/photographers/${portrait}`;
    const descriptifPhotographer =  document.createElement('div');
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    const pTagline = document.createElement('p');
    const pPrice = document.createElement('p');
    const h2 = document.createElement( 'h2' );
    const h3 = document.createElement( 'h3' );
    const URL = "photographer.html";
    const a = document.createElement('a');
    const textPrice = "£/jours";
    const commaSpace = ", ";
    const idNumbers = id;
    p =pTagline;
    
    
    //liens homepage vers page photographe
    const links = () =>{
        a.href = URL;
    }
    links();
    
    
    function getUserCardDOM() {
        
        const idUrl = a.href += "?id=" + idNumbers;
        h2.textContent = name;       
        h3.textContent = (city + commaSpace + country); 
        pTagline.className = 'p-tagline-homepage';
        pTagline.textContent = tagline;  
        pPrice.className = 'p-price-homepage'; 
        descriptifPhotographer.className = 'descriptif-photographer';
        pPrice.textContent = price + textPrice;
        img.setAttribute("src", picture)
        a.setAttribute("href", a)
        a.appendChild(article); 
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        article.appendChild(descriptifPhotographer);
        descriptifPhotographer.append(h2, h3, p);
        return (a);
    }

    return { name, picture, getUserCardDOM}
}





