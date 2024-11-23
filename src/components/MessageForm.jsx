import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const MessageForm = () => {
  const [text, setText] = useState('');
  const { id } = useParams();

  const messagesSend = axios.create({
    baseURL: `http://localhost:3005/chat/`,
    withCredentials: true,
  });
  
  messagesSend.interceptors.request.use((request) => {
    const accessToken = localStorage.getItem('accessToken');
  
    // Додати заголовок Authorization для всіх запитів, якщо токен існує
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return request;
  });

  function sendMessage(text) {
    return messagesSend.post(`${id}/messages`, { text });
  }

  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();
        await sendMessage(text);
        
        setText('');
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter a message"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button className="button">Send</button>
    </form>
  );
};
