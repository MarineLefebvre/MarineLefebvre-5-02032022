//récupérer l'orderId de commande depuis l'url
const url = window.location.search;
const urlParams = new URLSearchParams (url);
const id = urlParams.get('orderId');

//recuperer la span
let spanOrderId = document.getElementById("orderId");
//on met le numéro de commande dans la span
spanOrderId.innerText=id;
