//connect to server
var socket = io.connect(window.location.href);

//get html elements
var clickBtn = document.getElementById("clickCake"),
    cakeCountDisplay = document.getElementById("cakes"),
    upgradeBtn = document.getElementById("upgrade"),
    cakesPerSecond = document.getElementById("cps")


//used to buy upgrades
//FIXME: server only subtracts 10 cakes no matter the ammount
function buyUpgrade(ammount){
    socket.emit("upgrade",ammount)
}


//networking out
clickBtn.addEventListener("click", function(){
    socket.emit("clickCake")
}); 
upgradeBtn.addEventListener("click", function(){
    socket.emit("upgrade",1)
}); 
//networking in
socket.on("cakeCountUpdate",function(data){
    document.getElementById("cakes").innerHTML=data+" cakes";
})
socket.on("upgrade",function(data){
    document.getElementById("cps").innerHTML=data+" cakes/second";
})
socket.on("redirect", function(data) {
    window.location.href = data;
});