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
const PORT = process.env.PORT || 5000;

app.use(router);
app.use(cors());

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let id = socket.id;

  socket.on("join", ({ name, room }, callback) => {
    const { error, user, onlineUsers } = addUser({ id, name, room });
    const inr = getUserInRoom(user.room);

    if (error) {
      callback({ error, user: null });
    } else {
      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to the room ${user.room}`,
        onlineUsers: [...getUserInRoom(user.room)],
      });

      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has joined`,
        onlineUsers: [...getUserInRoom(user.room)],
      });
      socket.join(user.room);

      socket.broadcast.to(user.room).emit("roomInfo", {
        room: user.room,
        onlineUsers: [...getUserInRoom(user.room)],
      });

      callback({ error, user, onlineUsers: [...onlineUsers] });
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

  socket.on("disconnect", () => {
    const user = removeUser(id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} just left the room.`,
        onlineUsers: [...getUserInRoom(user.room)],
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("====================================");
  console.log(`Servr has started on port: ${PORT}`);
  console.log("====================================");
});
