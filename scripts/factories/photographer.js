function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    const pTagline = document.createElement('p');
    const pPrice = document.createElement('p');
    const h2 = document.createElement( 'h2' );
    const h3 = document.createElement( 'h3' );

    function getUserCardDOM() {
        h2.textContent = name;       
        h3.textContent = city, country; 
        pTagline.className = 'p-tagline-homepage';
        pTagline.textContent = tagline;  
        pPrice.className = 'p-price-homepage'; 
        pPrice.textContent = price;
        pPrice.innerHTML = "/jours";
        img.setAttribute("src", picture)
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}