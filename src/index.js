const path = require("path")
const http = require("http")
const express = require("express")
const socketIo = require("socket.io")

const app = express()

// need to configure server like this so we can connect it to socket io
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))

// built in event "connection" (when user connects)
io.on("connection", socket => {
    console.log("New WebSocket connection!")

    socket.emit("message", "Welcome!")

    // send it to everybody except this socket
    socket.broadcast.emit("message", "A new user has joined")

    socket.on("sendLocation", ({latitude, longitude}) => {
        io.emit("message", `https://google.com/maps?q=${latitude},${longitude}`)
    })

    socket.on("chat-message", chatMsg => {
        // send it to everyone
        io.emit("message", chatMsg)
    })

    // custom event "disconnect"
    socket.on('disconnect', () => {
        io.emit("message", "User has left")
    })
})

server.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
)
