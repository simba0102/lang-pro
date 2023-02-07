import React, { useEffect, useRef } from 'react';
import Message from './Message';
import Landing from './Landing';

export default function Messages({ messages }) {

  if (messages.length === 0) {
    return <Landing />
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // <div className="flex-1 overflow-hidden">
  // <div className="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800">
  // </div>
  // <div className="flex h-full text-sm dark:bg-gray-800"></div>;
  return (
    <div className="flex-1 overflow-y-auto ">
      {messages.map((message, i) => (
        <Message
          key={i}
          sender={message.sender}
          text={message.text}
          last={i === messages.length - 1}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
