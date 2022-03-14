let blockOfCanape= document.getElementById("items");
let listCanape;

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        listCanape = value;
        generateCardCanape();
    })
    .catch(function(err) {
        //alert("Une erreur est survenue ....")
        alert(err)
    });

function generateCardCanape() {
    for (let canape of listCanape){
        let canapeCard = document.createElement("a");
        canapeCard.href = "./product.html?id="+canape._id;
        let canapeArticle = document.createElement("article");
        let text = document.createTextNode(canape.name);
        let img = document.createElement("img");
        img.src = canape.imageUrl;
        img.alt = canape.altTxt;
        let canapeTitre = document.createElement("h3");
        canapeTitre.className = "productName";
        canapeTitre.appendChild(text);
        let canapeDescription = document.createElement("p");
        canapeDescription.className = "productDescription";
        let description = document.createTextNode(canape.description);
        canapeDescription.appendChild(description);
        canapeArticle.appendChild(img);
        canapeArticle.appendChild(canapeTitre);
        canapeArticle.appendChild(canapeDescription);
        canapeCard.appendChild(canapeArticle);
        blockOfCanape.appendChild(canapeCard);
    }
}

