const socket = io()

// with socket.on you recive event. There are two arguments:
// 1. event name wich must match one you put in server on socket.emmit(),
// and callback func wich gives you data you have put in socket.emmit , names dont have to match,
// but order does)

socket.on("countUpdated", countFromBackend => {
    console.log("the count has been updated ", countFromBackend)
})

document.querySelector("#increment-btn").addEventListener("click", () => {
    console.log("I have incremented the count")
    // on click emit event from client
    socket.emit("increment")
})
