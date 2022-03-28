let sectionCart = document.getElementById("cart__items");
let qtyTotal = 0;
let prixTotal = 0;

//TODO changer qty
//TODO supprimer article

//parcours du local storage
for( let i = 0; i < localStorage.length; i++){
    //Récupération de chaque item grâce à sa clef unique
    let ligne_de_panier = localStorage.getItem(localStorage.key(i));
    //utilisation de JSON.parse pour accèder aux valeurs des attributs de l'objet JSON
    if (typeof ligne_de_panier === "string") {

        let ligne_de_pannier_Parse = JSON.parse(ligne_de_panier);
        let qty = ligne_de_pannier_Parse['qty'];
        let color = ligne_de_pannier_Parse['couleur'];
        let id = ligne_de_pannier_Parse['canape']._id;

        qtyTotal = qtyTotal+parseInt(qty);

        getInfosOfCanape(id,qty,color);
    }
}

//Ajout de la qty Totale
let spanQtyTot = document.getElementById("totalQuantity");
let spanQtyTotText=document.createTextNode(qtyTotal);
spanQtyTot.appendChild(spanQtyTotText);


//FONCTIONS
function getInfosOfCanape(id,qty,color){
    fetch("http://localhost:3000/api/products/"+id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            generatePanier(value,qty,color);
        })
        .catch(function(err) {
            //alert("Une erreur est survenue ....")
            alert(err)
        });

}

function generatePanier(canape,qty,color){
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
    canapeDivDesc.className = "cart__item__content";
    let canapeDivDescContent= document.createElement("div");
    canapeDivDescContent.className = "cart__item__content__description";

    //nom du canapé
    let canapeH2Desc= document.createElement("h2");
    let canapeH2DescText=document.createTextNode(canape.name);
    canapeH2Desc.appendChild(canapeH2DescText);
    canapeDivDescContent.appendChild(canapeH2Desc);

    //description du canapé
    let canapePDesc= document.createElement("p");
    let canapePDescText=document.createTextNode(color);
    canapePDesc.appendChild(canapePDescText);
    canapeDivDescContent.appendChild(canapePDesc);

    //prix du canapé
    let canapePPrice=document.createElement("p");
    let canapePText=document.createTextNode(canape.price + " €");
    canapeDivDescContent.appendChild(canapePPrice);
    canapePPrice.appendChild(canapePText);
    prixTotal = prixTotal+(canape.price*qty);
    //Ajout du prix total
    let spanPrixTot = document.getElementById("totalPrice");
    spanPrixTot.innerText = prixTotal;


    canapeDivDesc.appendChild(canapeDivDescContent);
    canapeArticle.appendChild(canapeDivDesc);

    //GESTION qty
    let canapeDivQty= document.createElement("div");
    canapeDivQty.className = "cart__item__content__settings";
    let canapeDivQtyContent= document.createElement("div");
    canapeDivQtyContent.className = "cart__item__content__settings__quantity";

    //qty
    let canapeQty= document.createElement("p");
    let canapeQtyText=document.createTextNode(qty);
    canapeQty.appendChild(canapeQtyText);
    canapeDivQtyContent.appendChild(canapeQty);

    //Mise à jour de la qty
    let canapeInputQty= document.createElement("input");
    canapeInputQty.className="itemQuantity";
    canapeInputQty.type="number";
    canapeInputQty.name="itemQuantity";
    canapeInputQty.min="1";
    canapeInputQty.max="100";
    canapeInputQty.value=qty;
    canapeDivQtyContent.appendChild(canapeInputQty);
    canapeDivQty.appendChild(canapeDivQtyContent);
    //Gestion du changement de la qty
    canapeInputQty.addEventListener("change", updateQty);
    //ajout de paramètre => ici la clef du localStorage
    canapeInputQty.clef = canape._id+color;

    //supprimer article
    let canapeDivDel= document.createElement("div");
    canapeDivDel.className = "cart__item__content__settings__delete";

    //btn delete
    let deleteCanape= document.createElement("p");
    let deleteCanapeText=document.createTextNode("Supprimer");
    deleteCanape.className="deleteItem";
    //Gestion du click sur le texte supprimer
    deleteCanape.addEventListener("click", suppression, true);
    //ajout de paramètre => ici la clef du localStorage
    deleteCanape.clef = canape._id+color;
    deleteCanape.appendChild(deleteCanapeText);
    canapeDivDel.appendChild(deleteCanape);
    canapeDivQty.appendChild(canapeDivDel);

    canapeDivDesc.appendChild(canapeDivQty);


    //Ajout de l'article dans la section
    sectionCart.appendChild(canapeArticle);
}


//supprimer article panier et on passe en param l'event donc le click sur le texte supprimer
function suppression(evt){
    //evt fait référence à l'evenement qui a déclenché la fonction donc ici un click
    //evt.currentTarget.clef permet de récupérer la clef qu'on a affecté à l'élément sur lequel on a cliqué
    localStorage.removeItem(evt.currentTarget.clef);
    alert("Le produit a été supprimé du panier.");
    //rechargement de la page
    location.reload();
}

//mise à jour qty article
function updateQty(evt){
    //récupérer objet du localstorage et le mettre sous forme d'objet pour le modifier
    let objectParse=JSON.parse(localStorage.getItem(evt.currentTarget.clef));
    //Parseint pour transformer la chaine de caractère en chiffre
    objectParse.qty=parseInt(evt.currentTarget.value);
    let JSONObject = JSON.stringify(objectParse);
    localStorage.setItem(evt.currentTarget.clef, JSONObject);
    location.reload();
}
