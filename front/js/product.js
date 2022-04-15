//récupérer l'id de produit depuis l'url
const url = window.location.search;
const urlParams = new URLSearchParams (url);
const id = urlParams.get('id');
let canape;

fetch("http://localhost:3000/api/products/"+id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        canape = value;
        generateInfosCanape();

    })
    .catch(function(err) {
        //alert("Une erreur est survenue ....")
        alert(err)
    });

function generateInfosCanape() {
    //img
    let divImg = document.getElementById("item_img");
    let img = document.createElement("img");
    img.src = canape.imageUrl;
    img.alt = canape.altTxt;
    divImg.appendChild(img);

    //title
    let titre = document.getElementById("title");
    let text = document.createTextNode(canape.name);
    titre.appendChild(text);

    //prix
    let prix = document.getElementById("price");
    let textPrix = document.createTextNode(canape.price);
    prix.appendChild(textPrix);

    //description
    let description = document.getElementById("description");
    let textDescription = document.createTextNode(canape.description);
    description.appendChild(textDescription);

    //couleur
    let couleurs = document.getElementById("colors");
    for (let couleur of canape.colors){
        let option = document.createElement("option");
        option.value = couleur;
        let couleurText = document.createTextNode(couleur);
        option.appendChild(couleurText);
        couleurs.appendChild(option);
    }

    document.getElementById('quantity').value = 1;

    let btnAjoutPanier = document.getElementById("addToCart");
    //ajout du listener d'event sur le click sur le bouton > si click je fais la fonction ajouterAuPanier
    btnAjoutPanier.addEventListener("click", ajouterAuPanier, false);
}

function ajouterAuPanier() {
    //Récupération couleur choisi
    let couleurs = document.getElementById("colors");
    let colorValue = couleurs.value;
    //Récupération qty choisi
    let qty = document.getElementById("quantity");
    let quantityValue = qty.value;

    //si pas de couleur > alert d'erreur
    if(colorValue === "") {
        alert("Veuillez choisir une couleur !");
    }

    //Sinon traitement
    else{
        //Mise à jour de la quantité si élément déja dans le panier
        if (localStorage.getItem(canape._id+colorValue)){
            //récupérer objet du localstorage et le mettre sous forme d'objet pour le modifier
            let objectParse=JSON.parse(localStorage.getItem(canape._id+colorValue));
            //Parseint pour transformer la chaine de caractère en chiffre
            objectParse.qty=parseInt(objectParse.qty)+parseInt(quantityValue);
            let JSONObject = JSON.stringify(objectParse);
            localStorage.setItem(canape._id+colorValue,JSONObject);
            alert("Le nombre d'article a été mis à jour");
        }
        //Sinon ajout dans le panier
        else{
            //création objet JSON qui contient le canape, la qty et la couleur
            let object={
                canape:canape._id,
                qty:quantityValue,
                couleur:colorValue
            };

            //mise sous forme de chaine de caractere pour stocker
            let JSONObject = JSON.stringify(object);
            //ajout du JSON dans le localStorage avec comme clef canapeCouleur
            localStorage.setItem(canape._id+colorValue,JSONObject);
            alert("L'article a bien été ajouté au panier");
        }

    }

}
