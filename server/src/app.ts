import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3001;
const httpServer = http.createServer(app);
const options = {
    cors: {
        origin: "http://localhost:3000",
    },
};
const io = new Server(httpServer, options);

const id = () => Math.floor(Math.random() * 1000000)

const connections = {}

io.of('/neutral').on("connection", (socket) => {
    const _id = id()
    connections[socket.id] = _id
    const greeting = `You are connected to [NEUTRAL] as ${_id}`

    // Greetings from server
    socket.emit("greeting", greeting);

    // request to join a room
    socket.on("join", room => {
        const joinGreeting = `ID ${_id} has join this room [BROADCAST]`
        socket.join(room)
        socket.emit('event', joinGreeting)
        socket.to(room).emit('event', joinGreeting)
    });

    // If socket is diconnected =
    socket.on('disconnect', reason => {
        delete connections[socket.id]
    })
});

io.of('/slave').on("connection", (socket) => {
    const greeting = "You are connected to [SLAVE]"

    socket.emit("greeting", greeting);
});

io.of('/master').on("connection", (socket) => {
    const greeting = "You are connected to [MASTER]"

    socket.emit("greeting", greeting);
});

app.get("/", (req, res) => {
    res.send("Welcome to my world");
});

httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
