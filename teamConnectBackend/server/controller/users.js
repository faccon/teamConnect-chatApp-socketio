const users = [];
let currentUser = {};
const onlineUsers = new Set();

function addUser({ id, name, room }) {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  let error;
  let user;

  const existingUser = users.find(
    (user) => user.room === room && user.name == name
  );

  if (existingUser) {
    error = "Username already taken";
    return { error, user: null };
  } else {
    user = { id, name, room };
    users.push(user);

    users.forEach((element) => {
      onlineUsers.add(element.name);
    });
    return { error: null, user, onlineUsers };
  }
}

function getUser(id) {
  return users.find((user) => user.id == id);
}

function removeUser({ id }) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1)[0];
  } else null;
}

function getUserInRoom(room) {
  users.filter((user) => {
    if (user.room == room) {
      onlineUsers.add(user.name);
    }
  });

  return onlineUsers;
}

module.exports = { addUser, removeUser, getUserInRoom, getUser };
