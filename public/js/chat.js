const socket = io()

// elements
const $messageForm = document.querySelector("#chat-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messageFormButton = $messageForm.querySelector("button")

const $geolocationButton = document.querySelector("#send-location")

socket.on("message", data => {
  console.log(data)
});

$messageForm.addEventListener("submit", e => {
  e.preventDefault()

  // disable button
  $messageFormButton.setAttribute("disabled", "disabled")



  // message is text area name property
  const data = e.target.elements.message.value
  // third argument is a callback (event acknowledgement)
  socket.emit("chat-message", data, callbackArg => {

    // clear input
    $messageFormInput.value = ""

    // focus
    $messageFormInput.focus()

    // enable button
    $messageFormButton.removeAttribute("disabled");

    // if there are bad words it will return callback from server
    if (callbackArg) {
      return console.log(callbackArg);
    }

    console.log("The message was dilivered");
  });
});

$geolocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert("Geolocation is not suported by your browser.");
    }

    //   disable button before we fetch geolocation
    $geolocationButton.setAttribute("disabled", "disabled")



  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // callback is acknowlegement (client sends to server function)
    // server sends back acknowlegement when its done
    // callbackReturnData is argument you put in func on server when you call it
    socket.emit("sendLocation", { latitude, longitude }, callbackReturnData => {
        console.log(callbackReturnData)

        //   enable it agein after its fetched
        $geolocationButton.removeAttribute("disabled")
    });
  });
});
