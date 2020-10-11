var socket = io.connect(window.location.href);

var plz = document.getElementById("plz"),
    cakeCountDisplay = document.getElementById("cakes")

cakeCount=0

plz.addEventListener("click", function(){
    document.getElementById("cakes").innerHTML=cakeCount
}); 