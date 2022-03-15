//parcours du local storage
for( let i = 0; i < localStorage.length; i++){
    //Récupération de chaque item grâce à sa clef unique
    let ligne_de_panier = localStorage.getItem(localStorage.key(i));
    //utilisation de JSON.parse pour accèder aux valeurs des attributs de l'objet JSON
    if (typeof ligne_de_panier === "string") {
        let ligne_de_pannier_Parse = JSON.parse(ligne_de_panier);
        console.log(i);
        console.log(ligne_de_pannier_Parse['canape']);
        console.log(ligne_de_pannier_Parse['qty']);
        console.log(ligne_de_pannier_Parse['couleur']);
    }
}
