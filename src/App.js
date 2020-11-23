import "./App.css";
import React, { useEffect } from "react";
import io from "socket.io-client";

const App = () => {
  const socket = io.connect("http://localhost:3333");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      author: "Renato",
      message: "Olá mundo",
    };

    socket.emit("send", data);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      socket.on("received", (data) => {
        console.log(data);
      });
    });
  }, [socket]);

  return (
    <div className="App">
      <form id="chat">
        <select id="username">
          <option value="renato">Renato</option>
          <option value="adriana">Adriana</option>
        </select>
        <div className="messages"></div>
        <input type="text" name="message" placeholder="Digite sua mensagem" />
        <button onClick={(e) => handleSubmit(e)}>Enviar</button>
      </form>
    </div>
  );
};

export default App;
