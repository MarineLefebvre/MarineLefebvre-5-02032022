let sectionCart = document.getElementById("cart__items");
let qtyTotal = 0;
let prixTotal = 0;


//parcours du local storage
for( let i = 0; i < localStorage.length; i++){
    //Récupération de chaque item grâce à sa clef unique
    let ligne_de_panier = localStorage.getItem(localStorage.key(i));
    //utilisation de JSON.parse pour accèder aux valeurs des attributs de l'objet JSON
    if (typeof ligne_de_panier === "string") {

        let ligne_de_pannier_Parse = JSON.parse(ligne_de_panier);
        let qty = ligne_de_pannier_Parse['qty'];
        let color = ligne_de_pannier_Parse['couleur'];
        let id = ligne_de_pannier_Parse['canape'];

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


async function getPrice(id) {

    const response = await fetch("http://localhost:3000/api/products/"+id);
    const canape = await response.json();
    return canape.price;
}

function generatePanier(canape,qty,color){
    //article
    let canapeArticle = document.createElement("article");
    canapeArticle.className="cart__item";
    canapeArticle.dataset.id = canape._id;
    canapeArticle.dataset.color=color;

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
    let canapeQtyText=document.createTextNode("Qté : ");
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
    canapeInputQty.price = canape.price;

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
    deleteCanape._id = canape._id;
    deleteCanape.color = color;
    deleteCanape.appendChild(deleteCanapeText);
    canapeDivDel.appendChild(deleteCanape);
    canapeDivQty.appendChild(canapeDivDel);

    canapeDivDesc.appendChild(canapeDivQty);


    //Ajout de l'article dans la section
    sectionCart.appendChild(canapeArticle);
}


//supprimer article panier et on passe en param l'event donc le click sur le texte supprimer
async function suppression(evt) {
    //evt fait référence à l'evenement qui a déclenché la fonction donc ici un click
    //evt.currentTarget.clef permet de récupérer la clef qu'on a affecté à l'élément sur lequel on a cliqué
    localStorage.removeItem(evt.currentTarget.clef);
    alert("Le produit a été supprimé du panier.");
    //on sélectionne l'article html lié au canapé et on le retire de l'html
    document.querySelector('article[data-id="' + evt.currentTarget._id + '"][data-color="' + evt.currentTarget.color + '"]').remove();
    await calculerPrixQty()
}

//mise à jour qty article
async function updateQty(evt) {
    //récupérer objet du localstorage et le mettre sous forme d'objet pour le modifier
    let objectParse = JSON.parse(localStorage.getItem(evt.currentTarget.clef));
    //Parseint pour transformer la chaine de caractère en chiffre
    objectParse.qty = parseInt(evt.currentTarget.value);
    let JSONObject = JSON.stringify(objectParse);
    localStorage.setItem(evt.currentTarget.clef, JSONObject);
    //await permet d'attendre la fin du traitement de la fonction asynchrone calculerPrix avant de passer à la suite
    await calculerPrixQty()
}

async function calculerPrixQty() {
    qtyTotal = 0;
    prixTotal = 0;
    for (let i = 0; i < localStorage.length; i++) {
        //Récupération de chaque item grâce à sa clef unique
        let ligne_de_panier = localStorage.getItem(localStorage.key(i));
        //utilisation de JSON.parse pour accèder aux valeurs des attributs de l'objet JSON
        if (typeof ligne_de_panier === "string") {

            let ligne_de_pannier_Parse = JSON.parse(ligne_de_panier);
            let qty = ligne_de_pannier_Parse['qty'];
            let id = ligne_de_pannier_Parse['canape']._id;


            qtyTotal = qtyTotal + parseInt(qty);
            //console.log('ajout prix ' + evt.currentTarget.price + '*' + parseInt(qty))
            prixTotal = prixTotal + (await getPrice(id) * parseInt(qty));

        }
    }

    let spanQtyTot = document.getElementById("totalQuantity");
    //innerText permet de modifier directement le texte affiché
    spanQtyTot.innerText = qtyTotal;

    let spanPrixTot = document.getElementById("totalPrice");
    //innerText permet de modifier directement le texte affiché
    spanPrixTot.innerText = prixTotal;
}

//Ajout du listener d'action sur le bouton
let btnValidation = document.getElementById("order");
//ajout de l'evenement de type click => si click la fonction validationFormulaire() est exécuté
btnValidation.addEventListener("click", validationFormualaire, false);

function validationFormualaire(event) {

    event.preventDefault();
    //Prenom
    let firstNameOK = false;
    let firstName = document.getElementById("firstName").value;
    let firsNameError = document.getElementById("firstNameErrorMsg");
    if(firstName.length < 1){
        firsNameError.innerText="Veuillez renseigner votre Prénom svp";
    }
    //On vérifie que le prénom ne contient que des lettres avec une regex
    else if(/^[A-Za-z]+$/.test(firstName)){
        firsNameError.innerText="";
        firstNameOK = true;
    }
    else firsNameError.innerText="Un prénom ne peut pas contenir de chiffres";

    //Nom
    let lastNameOK = false;
    let lastName = document.getElementById("lastName").value;
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if(lastName.length < 1){
        lastNameErrorMsg.innerText="Veuillez renseigner votre Nom svp";
    }
    //On vérifie que le nom ne contient que des lettres
    else if(/^[A-Za-z]+$/.test(lastName)){
        lastNameErrorMsg.innerText="";
        lastNameOK = true;
    }
    else lastNameErrorMsg.innerText="Un nom ne peut pas contenir de chiffres";

    //Adresse
    let adresseOK = false;
    let address = document.getElementById("address").value;
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    if(address.length < 1){
        addressErrorMsg.innerText="Veuillez renseigner votre Adresse svp";
    }
    else {
        addressErrorMsg.innerText="";
        adresseOK = true;
    }

    //Ville
    let cityOk = false;
    let city = document.getElementById("city").value;
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    if(city.length < 1){
        cityErrorMsg.innerText="Veuillez renseigner votre Ville svp";
    }
    //On vérifie que la ville ne contient que des lettres
    else if(/^[A-Za-z]+$/.test(city)){
        cityErrorMsg.innerText="";
        cityOk = true;
    }
    else cityErrorMsg.innerText="Une ville ne peut pas contenir de chiffres";

    //mail
    let mailOK = false;
    let email = document.getElementById("email").value;
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    if(email.length < 1){
        emailErrorMsg.innerText="Veuillez renseigner votre Mail svp";
    }
    //On vérifie que le mail contient @
    else if(/\S+@\S+\.\S+/.test(email)){
        emailErrorMsg.innerText="";
        mailOK = true;
    }
    else emailErrorMsg.innerText="Adresse mail non valide";


    if(firstNameOK && lastNameOK && adresseOK && mailOK && cityOk){
        requeteValidation(firstName,lastName,address,city,email);
    }
}

function requeteValidation(firstName,lastName,address,city,email){
    let contact={
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };

    let products = [];

    //On parcours le localStorage pour ajouter les Id de canapé au tableau des produits
    for( let i = 0; i < localStorage.length; i++){
        //Récupération de chaque item grâce à sa clef unique
        let ligne_de_panier = localStorage.getItem(localStorage.key(i)); //si getItem trouve pas il retourne null
        //utilisation de JSON.parse pour accèder aux valeurs des attributs de l'objet JSON
        if (typeof ligne_de_panier === "string") {  // if(ligne_de_panier != null)
            let ligne_de_pannier_Parse = JSON.parse(ligne_de_panier)
            let id = ligne_de_pannier_Parse['canape'];
            products.push(id);
        }
    }

    //Création objet à envoyer dans le body de la requête avec un objet contact et la liste des id dans un tableau
    let jsonBody={
        contact:contact,
        products:products
    };

    //Envoi de la requête API de type POST pour envoyer les infos de commande
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    })
        .then(function(res) {
            if (res.ok) {

                return res.json();
            }
        })
        .then(function(value) {
            //On récupère l'order ID
            let orderId = value.orderId;
            //On redirige vers la page confirmation en passant en param l'orderId
            document.location.href="./confirmation.html?orderId="+orderId;
            /**
             * Recupérer le orderId dans la reponse
             * redirigé l'utilisation vers confirmation.html?orderId=.....
             * afficher le orderId dans la page
             */
        });
}
