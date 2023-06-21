const socket = new WebSocket('ws://localhost:8081');
socket.addEventListener('open', (event) => {
    socket.send('Hello Server! My name localhost:3000');
});

socket.addEventListener('message', (event) => {
    if (event.data instanceof Blob) {
        let reader = new FileReader();

        reader.onload = () => {
            console.log("ResultBlob: " + reader.result);
        };

        reader.readAsText(event.data);
    } else {
        console.log("Result: " + event.data);
    }
});

socket.addEventListener('close', (event) => {
    console.log('The connection has been closed');
});

// выводим новые сообщения в консоль
socket.onmessage = (event) => {
    if (event.data instanceof Blob) {
        let reader = new FileReader();

        reader.onload = () => {
            console.log("ResultBlobSend: " + reader.result);
        };

        reader.readAsText(event.data);
    } else {
        console.log("Result: " + event.data);
    }
}
// отправляем сообщение
socket.onopen = () => socket.send('Textw');