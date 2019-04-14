const path = require('path')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()

// need to configure server like this so we can connect it to socket io
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New WebSocket connection!')

    // create event and emit it to client
    socket.emit('countUpdated', count)

    // listen for increment event from client
    socket.on('increment', () => {
        // increment count and send current count fo client
        count++
        // socket.emit('countUpdated', count) this emits only to single user

        io.emit('countUpdated', count) // this one emits to all connected users
    })
})


server.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
