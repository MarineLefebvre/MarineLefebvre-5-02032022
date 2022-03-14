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
        console.log(value);
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
}
