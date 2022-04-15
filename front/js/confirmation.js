//récupérer l'orderId de commande depuis l'url
const url = window.location.search;
const urlParams = new URLSearchParams (url);
const id = urlParams.get('orderId');

//recuperer l'élément html
let spanOrderId = document.getElementById("orderId");
//on met le numéro de commande dans l'html
spanOrderId.innerText=id;

//vider le localStorage
window.localStorage.clear();
