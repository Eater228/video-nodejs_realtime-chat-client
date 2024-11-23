import React, { useEffect, useState } from "react";
import { MessageForm } from '../components/MessageForm.jsx';
import { MessageList } from '../components/MessageList.jsx';
import { useParams } from "react-router-dom";
import axios from "axios";

const DataLoader = ({ onData }) => {
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/chat/${id}/messages/all`);
        console.log(response)
        onData(response.data);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    loadData();

    const socket = new EventSource(`http://localhost:3005/chat/${id}/messages`)

    // socket.addEventListener('open', (event) => {
    //   socket.send('Hello Server from Client!')
    // })

    // socket.addEventListener('message', (event) => {
    //   const text = JSON.parse(event.data);

    //   onData(text);
    // })

    
    socket.onmessage = (e) => {
      console.log('Check', e)
      onData(JSON.parse(e.data))
    }
  }, [])

  return (
    <h1 className="title">
      Chat application
    </h1>
  );
};

export const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  function saveData(message) {
    // setMessages(messages => [message, ...messages]);
    setMessages((prevMessages) => {
      // Якщо це нове повідомлення, додаємо його в кінець списку
      if (Array.isArray(message)) {
        return [...message, ...prevMessages];
      } else {
        return [message, ...prevMessages];
      }
    });
  }
// {console.log(messages)}
  return (
    <>
      <title>Home Page</title>

      <DataLoader onData={saveData} />

      <MessageForm />
      <MessageList messages={messages} />
    </>
  )
}
