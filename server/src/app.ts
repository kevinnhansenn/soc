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

io.on("connection", (socket) => {
    console.log("Damn, someone is connected");

    socket.emit("connected");

    socket.on("disconnect", () => {
        socket.emit("disconnected");
        console.log("Socket is disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("Welcome to my world");
});

httpServer.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
