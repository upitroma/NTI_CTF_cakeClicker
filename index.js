var express = require("express")
var socket = require("socket.io")

const PORT=":4000"

var app = express();
var server = app.listen(4000,function(){
    console.log("Server is up on http://"+getIp()+PORT)
});

app.use(express.static("public"))
var io = socket(server)


class Player{
    constructor(socket){
        this.socket=socket
        this.isActive=true

        this.cakes=0
        this.cakesPerSec=0
    }
}
var playerLookup=[]
var clientId=0

//networking in
io.on("connection",function(socket){
    socket.id=clientId++
    playerLookup[socket.id]=new Player(socket)

    console.log("client connected on socket: ",socket.id +" Current active sockets: "+getTotalActiveSockets())

    //listen for data
    socket.on('disconnect', function(){
        console.info('user disconnected from socket: ' + socket.id+" Current active sockets: "+getTotalActiveSockets());
        playerLookup[socket.id].isActive=false
    });

    socket.on("clickCake",function(){
        playerLookup[socket.id].cakes++;
    })
    socket.on("upgrade",function(data){
        if(playerLookup[socket.id].cakes>=10 && Number.isInteger(data)){
            playerLookup[socket.id].cakes-=10;
            playerLookup[socket.id].cakesPerSec+=data;
            socket.emit("upgrade",playerLookup[socket.id].cakesPerSec)
        }
    })
});


//game logic
setInterval(function(){ 
    playerLookup.forEach(function(p){
        if(p.isActive){
            p.cakes+=(p.cakesPerSec)/10
            p.socket.emit("cakeCountUpdate",Math.floor(p.cakes))
            if(p.cakes>99999999999){
                dest="http://"+getIp()+PORT+"/SSByZWFsbHkgaG9wZSBub2JvZHkgZmluZHMgdGhpcywgdGhhdCB3b3VsZCBiZSBlbWJhcnJhc3Npbmcu/"
                p.socket.emit("redirect", dest);
                console.log("redirected")
                p.isActive=false;
            }
        }
    })
}, 100);



function getIp(){
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses
}
function getTotalActiveSockets(){
    var total=0
    for(var i=0;i<playerLookup.length;i++){
        if(playerLookup[i].isActive){
            total++
        }
    }
    return total
}