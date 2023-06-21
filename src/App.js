import Style from './App.module.css';
import {useRef, useState} from "react";
import {v4} from "uuid";

// Создает сокет
const socket = new WebSocket('ws://localhost:8081');

// Открываем событие на открытие соединения
socket.addEventListener('open', () => {
    console.log('open')
});

// Создаем собитые на закрытие соединеня
socket.addEventListener('close', () => {
    console.log('The connection has been closed');
});


function App() {
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])
    let refInput = useRef()


    // Отправляем сообщение на сервер
    function SendMessage(e) {
        e.preventDefault()
        let obj = {
            name,
            message: 'joined the chat',
            [refInput.current.id]: refInput.current.value
        }
        if(refInput.current.id === 'name') setName(refInput.current.value)
        socket.send(JSON.stringify(obj))
    }

    // Создаем событие на получение сообщения
    socket.addEventListener('message', (event) => {
        let res = JSON.parse(event.data)
        if (res.messages) setMessages([...res.messages])
    });

    return (
        <div className={Style.App}>
            <header className={Style.App_header}>
                <div id={'chat'}>
                    {messages.map((mes) =>
                        <p className={mes.name === name
                            ? Style.myMess
                            : Style.anyMess}
                           key={v4()}>[<i>{mes.name}</i>]: {mes.message}</p>)}
                </div>
                <form onSubmit={SendMessage}>
                    {name === ''
                        ? <input ref={refInput} id='name' placeholder='name'/>
                        : <input ref={refInput} id='message' placeholder='message'/>}
                    <button type={"submit"}>Send</button>
                </form>
            </header>
        </div>
    );
}

export default App;
