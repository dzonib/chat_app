const socket = io()

socket.on("message", data => {
    console.log(data)
})

document.querySelector("#chat-form").addEventListener("submit", e => {
    e.preventDefault()
    // message is text area name property
    const data = e.target.elements.message.value
    // third argument is a callback (event acknowledgement)
    socket.emit("chat-message", data, callbackArg => {
        if (callbackArg) {
            return console.log(callbackArg)
        }

        console.log("The message was dilivered")
    })
})

document.querySelector("#send-location").addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not suported by your browser.")
    }

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords
        socket.emit("sendLocation", { latitude, longitude }, callback => {
            console.log(callback)
        })
    })
})
