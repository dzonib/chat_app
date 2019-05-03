const path = require("path")
const http = require("http")
const express = require("express")
const socketIo = require("socket.io")
const Filter = require("bad-words")

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


    // use callback to send acknowlegement
    socket.on("sendLocation", ({ latitude, longitude }, callback) => {
        
        io.emit("message", `https://google.com/maps?q=${latitude},${longitude}`)

        callback("Location Shared yo")
    })

    socket.on("chat-message", (chatMsg, callback) => {
        // filtering bad words
        const filter = new Filter()

        // check if there are bad words and return callback if there are
        if (filter.isProfane(chatMsg)) {
            return callback("Profanity is not allowed!")
        }

        // send it to everyone
        io.emit("message", chatMsg)

        callback()
    })

    // custom event "disconnect"
    socket.on("disconnect", () => {
        io.emit("message", "User has left")
    })
})

server.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
)
