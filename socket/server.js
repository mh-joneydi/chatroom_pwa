const express = require("express");
const io = require("socket.io");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("salam . I am alive");
});
app.get("/salam", (req, res) => {
  res.send("salam . I am alive");
});

const server = app.listen(3010, (err) => {
  console.log("App Listen to port 3010");
});

const socket = io(server);
const mySocket = socket.of("/socket");

mySocket.on("connection", (socket) => {
  console.log("new User Connected");
  
  socket.on("newMessage", async(newMessage) => {
    // console.log(newMessage);
    const date = new Date().getTime(), message = {...newMessage, time: date};
    mySocket.emit("newMessage", message);
    console.log(message)
    const submitedMessage = await axios.post('https://603fda2af3abf00017785352.mockapi.io/api/messages', message)
    .then( res=> res.data)
    .catch( err => console.log(err));
    
    if(submitedMessage)
      mySocket.emit("newMessage", submitedMessage );
  });
  socket.on("deleteMsg", (id) => {
    console.log(id);
    mySocket.emit("deleteMsg",id);
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected");
  })
});




