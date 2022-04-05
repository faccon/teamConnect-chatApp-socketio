import io from "socket.io-client";

export const ENDPOINT = "teamconnect-s.eu-gb.mybluemix.net";
export const socket = io(ENDPOINT);

export let socketID = "";
socket.on("connect", () => {
  socketID = socket.id;
});
