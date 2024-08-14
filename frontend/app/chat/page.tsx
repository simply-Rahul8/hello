'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatPage() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [chatRooms, setChatRooms] = useState<string[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket('ws://127.0.0.1:8080/api/ws');

    // Connection opened
    socket.addEventListener('open', () => {
      console.log('Connected to WebSocket');
      setWs(socket);
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const data = event.data as string;
      setMessages((prevMessages) => [...prevMessages, data]);

      if (data.startsWith('Rooms:')) {
        const rooms = data.replace('Rooms:', '').trim().split(',');
        setChatRooms(rooms);
      }
    });

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input && ws) {
      ws.send(input);
      setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
      setInput('');
    }
  };

  const handleSetName = () => {
    if (ws) {
      const command = `/name ${name}`;
      ws.send(command);
      setMessages((prevMessages) => [...prevMessages, `You: ${command}`]);
    }
  };

  const handleListRooms = () => {
    if (ws) {
      const command = '/list';
      ws.send(command);
      setMessages((prevMessages) => [...prevMessages, `You: ${command}`]);
    }
  };

  const handleJoinRoom = (room: string) => {
    if (ws) {
      const command = `/join ${room}`;
      ws.send(command);
      setMessages((prevMessages) => [...prevMessages, `You: ${command}`]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">WebSocket Chat</h1>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Set your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleSetName}
          >
            Set Name
          </button>
        </div>

        <div className="mb-4">
          <button
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            onClick={handleListRooms}
          >
            List Rooms
          </button>
        </div>

        {chatRooms.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Chat Rooms</h2>
            <ul>
              {chatRooms.map((room, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
                    onClick={() => handleJoinRoom(room)}
                  >
                    Join {room}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-4 h-64 overflow-y-scroll bg-gray-700 p-2 rounded">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="ml-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
