const express = require("express");
const app = express();
const http = require ("http");
const cors = require("cors");

const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io =new Server(server,{
    cors:{
        origin:"http://localhost:3000",  //ISko change krna hoga because of react native
        method:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
console.log(`User connected : ${socket.id}`);
socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`User with ID:${socket.id} joined Room : ${data}`)

})

socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data)
    console.log(data)
});
socket.on("disconnect" , ()=>{
    console.log("User disconnected",socket.id)
});


socket.on("leave_room",(data)=> {  
    try{
      console.log('[socket]','leave room :', data.room);
      socket.leave(data.room);
      socket.to(data.room).emit("user_left", data.room);
      console.log(data)
     
    }catch(e){
      console.log('[error]','leave room :', e);
      socket.emit('error','couldnt perform requested action');
    }
  })





});





server.listen(3001,()=>{
    console.log("Server Running")
});


