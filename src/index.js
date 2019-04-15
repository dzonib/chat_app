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

io.on("connection", socket => {
    console.log("New WebSocket connection!")

    socket.emit("message", "Welcome!")

    socket.on("chat-message", chatMsg => {
        io.emit("message", chatMsg)
    })
})

server.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
)
