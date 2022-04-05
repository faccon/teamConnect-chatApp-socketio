import { socket } from "../Model";

export function signInUser(name, room, callback) {
  socket.emit("join", { name, room }, (res) => {
    return callback(res)
  });
}
