import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    const res = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();

    const botMessage = { text: data.reply, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app">
      <div className="chat-header">My AI Chat 🤖</div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export default App;