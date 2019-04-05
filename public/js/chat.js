const socket = io()

// name must match to one that server emmited
socket.on('countUpdated', (count) => {
    console.log('The count has been updated! ', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment')
})

document.querySelector('#reset').addEventListener('click', () => {
    socket.emit('resert')
})

document.querySelector('#decrement').addEventListener('click', () => {
    socket.emit('decrement')
})