const path = require('path')
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDirectoryPath))

let count = 0


io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++

        // emits event to every connection
        io.emit('countUpdated', count)
    })

    socket.on('resert', () => {
        count = 0

        io.emit('countUpdated', count)
    })

    socket.on('decrement', () => {
        count <= 0 ? console.log('Count can not be less then 0') : count--

        io.emit('countUpdated', count)
    })


})


server.listen(port, () => console.log(`Server is running on http://localhost:${port}`))