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


document.querySelector("#send-location")
    .addEventListener("click", () => {
        if (!navigator.geolocation) {
            return alert("Geolocation is not suported by your browser.")
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            socket.emit("sendLocation", {latitude, longitude})
        })
    })

