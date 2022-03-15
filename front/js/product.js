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
        //création objet JSON qui contient le canape, la qty et la couleur
        let JSONObject = '{"canape":'+JSON.stringify(canape)+',"qty":'+quantityValue+', "couleur":"'+colorValue+'"}';
        //ajout du JSON dans le localStorage avec comme clef canapeCouleur
        localStorage.setItem(canape.name+colorValue,JSONObject);
        alert("L'article a bien été ajouté au panier !");
    }

    /*
    3. Si OK, on ajoute la ligne du panier produit + la quantité + l'option (couleur) dans le localStorage au format JSON
    4. Un utilisateur doit pouvoir modifier une quantité pour un produit donné, donc la ligne du panier doit pouvoir etre identifié par le produit + sa couleur
    5. afficher un message alrtant l'utilisateur que son produit est bien dans son panier
     */

}
