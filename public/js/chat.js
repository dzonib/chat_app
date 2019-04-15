const socket = io()

socket.on('message', (data) => {
    console.log(data)
})

document.querySelector("#chat-form")
    .addEventListener('submit', (e) => {
    e.preventDefault()
    const data = e.target.elements.message.value
    socket.emit('chat-message', data)
})


