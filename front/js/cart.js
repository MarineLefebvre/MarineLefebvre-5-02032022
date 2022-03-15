let sectionCart = document.getElementById("cart__items");


//parcours du local storage
for( let i = 0; i < localStorage.length; i++){
    //Récupération de chaque item grâce à sa clef unique
    let ligne_de_panier = localStorage.getItem(localStorage.key(i));
    //utilisation de JSON.parse pour accèder aux valeurs des attributs de l'objet JSON
    if (typeof ligne_de_panier === "string") {
        let ligne_de_pannier_Parse = JSON.parse(ligne_de_panier);
        let canape = ligne_de_pannier_Parse['canape'];
        let qty = ligne_de_pannier_Parse['qty'];
        let color = ligne_de_pannier_Parse['couleur'];

        //article
        let canapeArticle = document.createElement("article");
        canapeArticle.className="cart__item";
        canapeArticle.id = canape._id;
        canapeArticle.color=color;

        //div-img
        let canapeDiv = document.createElement("div");
        canapeDiv.className="cart__item__img";

        let canapeImg = document.createElement("img");
        canapeImg.src=canape.imageUrl;
        canapeImg.alt= canape.altTxt;


        canapeDiv.appendChild(canapeImg);
        canapeArticle.appendChild(canapeDiv);

        let canapeDivDesc= document.createElement("div");
        canapeDivDesc.id = "cart__item__content";
        let canapeDivDescContent= document.createElement("div");
        canapeDivDescContent.id = "cart__item__content__description";

        let canapeH2Desc= document.createElement("h2");
        let canapeH2DescText=document.createTextNode(canape.name);
        canapeH2Desc.appendChild(canapeH2DescText);
        canapeDivDescContent.appendChild(canapeH2Desc);

        let canapePDesc= document.createElement("p");
        let canapePDescText=document.createTextNode(color);
        canapePDesc.appendChild(canapePDescText);
        canapeDivDescContent.appendChild(canapePDesc);

        let canapePPrice=document.createElement("p");
        let canapePText=document.createTextNode(canape.price);
        canapePPrice.appendChild(canapePText);
        canapeDivDescContent.appendChild(canapePPrice);

        canapeDivDesc.appendChild(canapeDivDescContent);
        canapeArticle.appendChild(canapeDivDesc);





        //Ajout de l'article dans la section
        sectionCart.appendChild(canapeArticle);

    }
}
