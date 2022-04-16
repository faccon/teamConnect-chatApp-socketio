const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");

const router = require("./router/index");
const {
  addUser,
  getUser,
  removeUser,
  getUserInRoom,
} = require("./controller/users");

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = process.env.PORT || 5000;

app.use(router);
app.use(cors());

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  let id = socket.id;

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id, name, room });

    if (error) {
      callback({ error, user: null });
    } else {
      const adminMsg = {
        user: "admin",
        text: `${user.name}, welcome to the room.`,
        onlineUsers: [...getUserInRoom(user.room)],
      };

      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has joined the room.`,
        onlineUsers: [...getUserInRoom(user.room)],
      })

      socket.broadcast.to(user.room).emit("roomInfo", {
        room: user.room,
        onlineUsers: [...getUserInRoom(user.room)],
      });
      socket.join(user.room);

      callback({ user, error, adminMsg });
    }
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      onlineUsers: [...getUserInRoom(user.room)],
    });
    callback();
  });

  socket.on("signout", () => {
    const removedUser = removeUser(id);

    if (removedUser) {
      socket.broadcast.to(removedUser.room).emit("message", {
        user: "admin",
        text: `${removedUser.name} just left the room.`,
        onlineUsers: [...getUserInRoom(removedUser.room)],
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
