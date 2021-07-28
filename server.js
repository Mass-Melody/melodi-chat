const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const users = {

}

io.on("connection", socket => {
  console.log(`Socket ${socket.id} has connected!`)
    socket.emit("your id", socket.id);

    // Adds User
    socket.on("register user", body => {
      users[body.username] = body.id
      console.log(users)
    })
    socket.on("send message", body => {
        io.to(users[body.profile]).emit('message', body)
        io.to(users[body.friend]).emit("message", body)
    })
})


server.listen(process.env.PORT, () => console.log("server is running on port 8000"));