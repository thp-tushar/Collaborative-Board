const express = require("express"); // access
const socket = require("socket.io");

const app = express(); // initialize and server ready


app.use(express.static("public"));


let port = process.env.PORT||3000;
let server = app.listen(port, ()=>{
    console.log("listening to port " + port);
})

let io = socket(server);
// front end to server data transfer
io.on("connection", (socket)=>{
    console.log("made connection");

    socket.on("beginPath", (data)=>{
        // data from front end
        // transfer
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data)=>{
        io.sockets.emit("redoUndo", data);
    })
})