import React from 'react';
import './Module.css'; // Імпортуємо стилі

export const MessageList = ({ messages }) => (
  <ul className="message-list">
    {messages.length === 0 ? (
      <li>No messages yet</li>
    ) : (
      messages.map((message, index) => (
        <li key={index} className="message-item">
          <span className="message-text">
            <strong className="message-author">{message.author}</strong>: {message.text}
          </span>
          <span className="message-time">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </li>
      ))
    )}
  </ul>
);
